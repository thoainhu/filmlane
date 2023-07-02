let url = new URL(window.location.href);
let filmID = url.searchParams.get("filmID");
let type = url.searchParams.get("type");
let bgrBanner = document.querySelector(".film-banner");
const modal = document.querySelector(".modal");
const trailer = document.querySelector(".play-trailer");
const closeTrailer = document.querySelector(".close-modal");
const btnPlay = document.querySelector(".trailer");

function showMore(event) {
    let parent = event.target.parentElement;
    parent.querySelector(".review-content").classList.toggle("active");
    event.target.innerHTML = event.target.innerHTML == "Show more" ? "Hide" : "Show more";
}
async function renderTrailer(numberfilmID) {
    const API_TRAILER = `https://api.themoviedb.org/3/movie/${numberfilmID}/videos?api_key=${API_KEY}`;
    let dataTrailer = await getData(API_TRAILER);
    let findTrailer = dataTrailer.results.find((element) => element.type === "Trailer");
    return findTrailer;
}

async function openTrailer(numberfilmID) {
    let findTrailer = await renderTrailer(numberfilmID);
    modal.classList.add("active");
    trailer.innerHTML += `
                    <iframe
                        width="100%"
                        height="800px"
                        src="https://www.youtube.com/embed/${findTrailer.key}?autoplay=1"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
`;
}

function closeModal() {
    modal.classList.remove("active");
    trailer.innerHTML -= "";
}

closeTrailer.addEventListener("click", function () {
    closeModal();
});
modal.addEventListener("click", function (e) {
    if (e.target == e.currentTarget) {
        closeModal();
    }
});
window.addEventListener("keydown", function (e) {
    if ((e.keyCode = 27)) {
        closeModal();
    }
});

async function showDetailFilm(filmID, type) {
    const dataDetailFilm = await getData(`https://api.themoviedb.org/3/${type}/${filmID}?api_key=${API_KEY}`);
    const filmInfo = document.querySelector(".film-banner .container");
    let typeFilm = "";
    for (let key in dataDetailFilm.genres) {
        typeFilm += dataDetailFilm.genres[key].name + ",";
    }
    filmInfo.innerHTML = `
    <div class="film-thumb">
                    <img src="https://image.tmdb.org/t/p/w300${dataDetailFilm.poster_path}" alt="" />
                </div>
                <div class="film-info">
                    <h2 class="film-title">${dataDetailFilm.original_title ? dataDetailFilm.original_title : dataDetailFilm.original_name}</h2>
                    <div class="film-info1">
                        <p class="year">${dataDetailFilm.release_date ? dataDetailFilm.release_date : dataDetailFilm.last_air_date}</p>
                        <p class="type">${typeFilm.substr(0, typeFilm.length - 1)}</p>
                        <p class="duration"><i class="fa-regular fa-clock"></i><span></span>${
                            dataDetailFilm.runtime ? dataDetailFilm.runtime : dataDetailFilm.number_of_episodes
                        } min</p>
                    </div>
                    <div class="film-info2">
                        <p class="core"><span>${dataDetailFilm.vote_average}%</span>user core</p>
                        <button style="display: ${
                            type == "tv" ? "none" : "block"
                        }" class="trailer" onclick="openTrailer(${filmID})  "><i class="fa-solid fa-play"></i><span></span> Play trailer</button>
                    </div>
                    <h5 class="film-quote">${dataDetailFilm.tagline}</h5>
                    <h6 class="film-overview">Overview</h6>
                    <p class="film-overview-txt">${dataDetailFilm.overview}</p>
                </div>
    `;

    bgrBanner.style.backgroundImage = ` linear-gradient(to bottom, #111d1dee, #111d1dee),url(https://image.tmdb.org/t/p/w300${dataDetailFilm.backdrop_path})`;

    const dataCastOfFilm = await getData(`https://api.themoviedb.org/3/${type}/${filmID}/credits?api_key=${API_KEY}`);
    const castOfFilm = document.querySelector(".listCast");

    if (!dataCastOfFilm.cast.length) {
        document.querySelector(".cast").style.display = "none";
    } else {
        dataCastOfFilm.cast.forEach((element) => {
            castOfFilm.innerHTML += `
                <li class="cast-actor" >
                    <a href="actor.html?actorID=${element.id}" >
                        <div class="cast-thumb">
                            <img src="https://image.tmdb.org/t/p/w300${element.profile_path} " alt="" />
                        </div>
                        <h5 class="cast-name">${element.name}</h5>
                        <p class="cast-more">${element.character}</p>
                    </a>
                </li>
        `;
        });
    }

    const dataReview = await getData(`https://api.themoviedb.org/3/${type}/${filmID}/reviews?api_key=${API_KEY}`);
    const listReview = document.querySelector(".listReview");
    console.log(dataReview);

    if (!dataReview.results.length) {
        document.querySelector(".review").style.display = "none";
    } else {
        dataReview.results.forEach((element) => {
            let avatar = element.author_details.avatar_path.substr(1);
            if (!avatar.includes("https")) {
                avatar = `https://image.tmdb.org/t/p/w300/${element.author_details.avatar_path}`;
            }
            if (avatar == "null") {
                avatar == "image/favicon.svg";
            }
            listReview.innerHTML += `
                    <li class="card-review">
                        <div class="review-thumb">
                            <img src="${avatar}" alt="" />
                        </div>
                        <div class="review-detail">
                            <h6 class="review-author">A review by <span>${element.author}</span></h6>
                            <p class="review-date">Written by ${element.author_details.username} on ${element.created_at}</p>
                            <p class="review-content">
                                ${element.content}
                            </p>
                            <button class="review-more" onclick="showMore(event)">Show more</button>
                        </div>
                    </li>
        `;
        });
    }
}
showDetailFilm(filmID, type);
