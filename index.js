const menuBar = document.querySelector(".hearder-menu-bar .icon");
const footer = document.querySelector(".footer");
const header = document.querySelector(".header");
const API_KEY = "e9e9d8da18ae29fc430845952232787c";

function renderHeader() {
    const header = document.querySelector(".header");
    header.innerHTML = `
<div class="container align-item">
                <a href="index.html" class="header-logo">
                    <img src= "image/logo.svg" alt= ""/>
                   
                </a>
                <ul class="header-menu">
                    <li><a href="index.html">HOME</a></li>
                    <li><a href="list.html?type=movie">MOVIES</a></li>
                    <li><a href="list.html?type=tv">TV SHOWS</a></li>
                    <li><a href="people.html">PEOPLE</a></li>
                    <li>
                        <a>GENRE</a>
                        <ul class="submenu"></ul>
                    </li>
                </ul>
                <div class="header-search">
                    <input type="text" placeholder="Search for a movie" />
                    <button class="iconSearch">
                        <img src="icon/search.png" alt="" />
                    </button>
                </div>
                <div class="hearder-menu-bar">
                    <div class="icon" onclick="barMenu()"><i class="fa-solid fa-bars"></i></div>
                </div>
            </div>`;
}
renderHeader();
function renderFooter() {
    const footer = document.querySelector(".footer");
    footer.innerHTML = `
<div class="footer-top">
                <div class="container">
                    <div class="footer-top-content">
                        <h4>trial start first 30 days.</h4>
                        <p>Enter your email to create or restart your memberships.</p>
                    </div>
                    <div class="footer-top-enterEmail">
                        <input type="email" placeholder="Enter your email" />
                        <button class="btnEmail">GET STARTED</button>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="container">
                    <div class="footer-links">
                        <a class="footer-logo" href="index.html">
                            <img src= "image/logo.svg" alt= ""/>
                        </a>
                        <ul class="footer-menu">
                            <li><a href="index.html">HOME</a></li>
                            <li><a href="list.html?type=movie">MOVIES</a></li>
                            <li><a href="list.html?type=tv">TV SHOWS</a></li>
                            <li><a href="people.html">PEOPLE</a></li>
                            <li><a href="list.html?type=movie">GENRE</a></li>
                        </ul>
                    </div>
                    <div class="footer-info">
                        <div class="footer-rights">© 2023 <span>Filmlane</span>. All Rights Reserved by <span>Thoai Nhu</span></div>
                        <ul class="footer-social">
                            <li>
                                <a href="index.html"><i class="fa-brands fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href=""><i class="fa-brands fa-youtube"></i></a>
                            </li>
                            <li>
                                <a href=""><i class="fa-brands fa-instagram"></i></a>
                            </li>
                            <li>
                                <a href=""><i class="fa-brands fa-twitter"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
`;
}
renderFooter();

//FETCH DATA FROM URL
async function getData(url) {
    const promise = await fetch(url);
    let data = await promise.json();
    return data;
}

//RENDER DATA
function renderData(data, box) {
    data.results.forEach((element) => {
        box.innerHTML += `
                    <li class="card">
                        <a href="film.html?filmID=${element.id}&type=${element.title ? "movie" : "tv"}">
                        <div class="card-filmThumb">
                            <img src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="" />
                        </div>
                        <h5 class="card-filmName">${element.title ? element.title : element.original_name}</h5>
                        <div class="card-filmDetail">
                            <h6 class="card-filmDate">${element.release_date ? element.release_date : element.first_air_date}</h6>
                            <p class="card-filmRate"><i class="fa-solid fa-star"></i>${element.vote_average}</p>
                        </div>
                        </a>
                    </li>
    `;
    });
}

//RENDER LIST PEOPLE
function renderPeople(data, box) {
    data.results.forEach((element) => {
        box.innerHTML += `
               <li class="card">
                        <a href="actor.html?actorID=${element.id}" >
                            <div class="card-peopleThumb">
                                <img src="https://image.tmdb.org/t/p/w300${element.profile_path}" alt="" />
                            </div>
                            <h5 class="card-peopleName">${element.name}</h5>
                            <p class="card-peopleRate"><i class="fa-solid fa-star"></i>Popularity: <span>${element.popularity}</span></p
                        ></a>
                    </li>
    `;
    });
}

//XỬ LÝ DOM
window.onscroll = function () {
    let valueY = window.scrollY;
    if (valueY > 10) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
};
function barMenu() {
    const headerMenu = document.querySelector(".header-menu");
    headerMenu.classList.toggle("active");
}

async function menuGenre() {
    const submenu = document.querySelector(".submenu");
    const dataGenreList = await getData(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    dataGenreList.genres.forEach((element) => {
        submenu.innerHTML += `<li><a href="list.html?type=${element.name}&id=${element.id}">${element.name}</a></li>`;
    });
}
menuGenre();

// SEARCH
const search = document.querySelector(".iconSearch");
const inputSearch = document.querySelector(".header-search input");
search.addEventListener("click", function () {
    window.location.href = `list.html?query=${inputSearch.value}&title="Search"`;
});
inputSearch.addEventListener("keydown", function (e) {
    if (e.keyCode == "13") {
        window.location.href = `list.html?query=${inputSearch.value}&title="Search"`;
    }
});
