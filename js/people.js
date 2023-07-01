let numberPage = 1;
const showMore = document.querySelector(".btn-link");

async function showListPeople(numberPage) {
    const dataPeople = await getData(`https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${numberPage}`);
    const listPeople = document.querySelector(".listPeople");
    console.log(dataPeople);
    renderPeople(dataPeople, listPeople);
}
showListPeople(numberPage);

showMore.addEventListener("click", async function () {
    numberPage++;
    console.log(numberPage);
    showListPeople(numberPage);
});
