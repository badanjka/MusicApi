let search = document.querySelector(".search")
const button = document.querySelector(".button")
const baseUrl = "https://theaudiodb.com/api/v1/json/1/"
let artistId = 0;
const searchContainer = document.querySelector(".searchButton")
let artistName = '';
let musicAppTittle = document.querySelector(".musicApp")


const printTheInputValue = () => {
    return search.value;
}

const printArtist = () => {
    const artistUrl = baseUrl + "search.php?s=" + printTheInputValue()
    artistName = printTheInputValue();

    fetch(artistUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson)
            if (myJson.artists === null) {                
            }
            let name = document.querySelector(".name")
            if (name) {
                name.remove()
            }
            let img = document.querySelector(".image")
            if (img) {
                img.remove()
            }
            let paragraph = document.querySelector(".bio")
            if (paragraph) {
                paragraph.remove()
            }
            console.log(myJson.artists);
            printAlbums(myJson.artists[0].idArtist);
            let albums = document.querySelector(".wrapper")
            console.log(albums, "za brisanje")
            if (albums) {
                albums.remove()
            }
            printArtistName(myJson.artists);
            printImage(myJson.artists);
            printBio(myJson.artists);
            setArtistId(myJson.artists);

            getVideos();
            // console.log(myJson.artists)
        });
}

const setArtistId = (el) => {
    console.log("SETUJEM ID");
    artistId = el[0].idArtist
}

button.addEventListener('click', () => {
    printArtist();
    search.value = ""

    searchContainer.classList = "searchButton"
    musicAppTittle.classList="afterClick"

});

search.addEventListener('keypress', function (el) {
    if (el.keyCode === 13) {
        printArtist();
        search.value = ""

        searchContainer.classList = "searchButton"
        musicAppTittle.classList="afterClick"
    }
})

const printArtistName = (el) => {
    let posterAndInfo = document.querySelector(".posterAndInfo")
    let name = document.createElement("h1")
    name.classList = "name"
    name.textContent = el[0].strArtist
    console.log(name)
    posterAndInfo.appendChild(name)
}

const printImage = (el) => {
    let posterAndInfo = document.querySelector(".posterAndInfo")
    let img = document.createElement("img")
    img.classList = "image"
    posterAndInfo.appendChild(img)
    let poster = el[0].strArtistFanart
    img.setAttribute("src", poster)
}
const printBio = (el) => {

    let posterAndInfo = document.querySelector(".posterAndInfo");
    let paragraph = document.createElement("p");
    paragraph.classList = "bio"
    paragraph.textContent = el[0].strBiographyEN
    posterAndInfo.appendChild(paragraph)
}

const printAlbums = (artistId) => {
    const albumstUrl = baseUrl + "album.php?i=" + artistId;
    fetch(albumstUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log("OVO SU ALBUMI", myJson);
            let albums = document.querySelector(".albums")
            albums.innerHTML = ""
            myJson.album.forEach(element => {
                printAlbum(element);
            });

        });

}

const printAlbum = (el) => {   
    let oneAlbum = document.createElement("div")
    oneAlbum.classList = "oneAlbum"
    let albums = document.querySelector(".albums")
    let albumName = document.createElement("p")
    let year = document.createElement("div")
    year.textContent = el.intYearReleased
    year.classList = "year"
    albumName.textContent = el.strAlbum;
    albumName.classList = "albumName"
    oneAlbum.appendChild(albumName)
    oneAlbum.appendChild(year)
    albums.appendChild(oneAlbum)

    albumName.addEventListener('click', () => {
        storeAlbumID(el.idAlbum)
        window.location.href = "albumData.html";
    });
}

const storeAlbumID = (albumId) => {
    localStorage.setItem("albumId", albumId)
}

const getVideos = () => {
    console.log("PRAVIMN URL");
    const videosUrl = baseUrl + "mvid.php?i=" + artistId
    fetch(videosUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            let videos = document.querySelectorAll('.video')
            for (let i = 0; i < 3; i++) {
                let baseVideoUrl = 'https://www.youtube.com/embed/';
                let videosUrl = myJson.mvids[i].strMusicVid;
                let splitedUrl = videosUrl.split('=')
                let videoId = splitedUrl[1];
                videos[i].src = baseVideoUrl + videoId;

            }

        });
}