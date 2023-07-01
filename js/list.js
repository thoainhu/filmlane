const url = new URL(window.location.href);
let type = url.searchParams.get("type");
let id = url.searchParams.get("id");

let query_string = url.searchParams.get("query");
let bigTitle = document.querySelector(".big-title");
const showMore = document.querySelector(".btn-link");

let numberPage = 1;
if (type == "movie") {
    bigTitle.innerHTML = "Movies";
} else if (type == "tv") {
    bigTitle.innerHTML = "TV Shows";
} else {
    bigTitle.innerHTML = type;
}

async function showListFilm(numberPage) {
    const filmList = document.querySelector("#listFilm");
    if (query_string) {
        let dataList = await getData(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query_string}`);
        bigTitle.innerHTML = "Search";
        renderData(dataList, filmList);
    } else {
        if (!id) {
            let dataList = await getData(`https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&page=${numberPage}`);
            renderData(dataList, filmList);
        } else {
            let dataList = await getData(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${numberPage}`);
            renderData(dataList, filmList);
        }
    }
}
showListFilm(numberPage);

showMore.addEventListener("click", async function () {
    numberPage++;
    showListFilm(numberPage);
});
