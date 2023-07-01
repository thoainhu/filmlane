// Danh sách NOW PLAYING: https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1
// Danh sách UPCOMING: https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1
// Danh sách TOP RATED: https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1
// Danh sách TV POPULAR: https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=1

async function showMovieHome() {
    const boxNowplaying = document.querySelector("#nowplaying");
    const dataNowplaying = await getData(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1`);
    console.log(dataNowplaying);
    renderData(dataNowplaying, boxNowplaying);
    const boxUpcomming = document.querySelector("#upcomming");
    const dataUpcoming = await getData(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`);
    renderData(dataUpcoming, boxUpcomming);
    const boxToprate = document.querySelector("#toprate");
    const dataToprate = await getData(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`);
    renderData(dataToprate, boxToprate);
    const boxSeries = document.querySelector("#series");
    const dataSeries = await getData(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=1`);
    renderData(dataSeries, boxSeries);
    console.log(dataSeries);
}
showMovieHome();
