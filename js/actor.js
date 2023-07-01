//https://api.themoviedb.org/3/person/${ID_PEOPLE}?api_key=${API_KEY}
const url = new URL(window.location.href);
let actorID = url.searchParams.get("actorID");

async function showActorDetail(ID_PEOPLE) {
    const dataActoreDetail = await getData(`https://api.themoviedb.org/3/person/${ID_PEOPLE}?api_key=${API_KEY}`);
    const detailImg = document.querySelector(".actor-img");
    const detailInfo = document.querySelector(".actor-detail");

    detailImg.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w300${dataActoreDetail.profile_path}" alt="" />
                    <div class="actor-info">
                        <h3>Personal Info</h3>
                        <h6>Known for:</h6>
                        <p class="info-known">- <span>${dataActoreDetail.known_for_department}</span></p>
                        <h6>Popularity:</h6>
                        <p class="info-popularity">- <span>${dataActoreDetail.popularity}</span></p>
                        <h6>Gender:</h6>
                        <p class="info-gender">- <span>${dataActoreDetail.gender == 1 ? "Female" : "Male"}</span></p>
                        <h6>Birthday:</h6>
                        <p class="info-birth">- <span>${dataActoreDetail.birthday}</span></p>
                        <h6>Place of Birth:</h6>
                        <p class="info-placeBirth">- <span>${dataActoreDetail.place_of_birth}</span></p>
                        <h6>Also Know As:</h6>
                        <p class="info-alsoKnown">- <span>${dataActoreDetail.also_known_as[0]}</span></p>
                </div>
    `;

    detailInfo.innerHTML = `
        <h2 class="actor-name">${dataActoreDetail.name}</h2>
                    <h4 class="actor-bio">Biography</h4>
                    <p class="actor-bio-text">${dataActoreDetail.biography}</p>
                    <h4 class="actor-film">Know for:</h4>
                    <ul class="listFilm">

                    </ul>
    `;
    const dataShowActorFilm = await getData(`https://api.themoviedb.org/3/person/${ID_PEOPLE}/movie_credits?api_key=${API_KEY}`);
    const listFilm = document.querySelector(".listFilm");

    dataShowActorFilm.cast.forEach((element) => {
        listFilm.innerHTML += `
    <li class="card" >
                            <a href="/html/film.html?filmID=${element.id}">
                            <div class="card-filmThumb">
                                <img src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="" />
                            </div>
                            <h5 class="card-filmName">${element.original_title}</h5>
                            <div class="card-filmDetail">
                                <h6 class="card-filmDate">${element.release_date}</h6>
                                <p class="card-filmRate"><i class="fa-solid fa-star"></i>${element.vote_average}</p>
                            </div></a>
                        </li>
    `;
    });
}
showActorDetail(actorID);
