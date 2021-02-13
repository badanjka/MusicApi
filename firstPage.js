let search = document.querySelector(".search")
const button = document.querySelector(".button")
const baseUrl = "https://theaudiodb.com/api/v1/json/1/"
let artistId = 0;
const searchContainer = document.querySelector(".searchButton")
let artistName = '';
// const resetVideos = () => {
//     let videos = document.querySelectorAll('.video')
//     videos.forEach((el) => {
//         el.src = ''
//     })
// }

// resetVideos()

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
                // Uraditi nesto tipa, sakriti donji kontent, prikazati p sa obavestenjem
                //  ( moze da se koristi toggle class )
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
    printAlbums();
    search.value = ""

    searchContainer.classList = "searchButton"

});

search.addEventListener('keypress', function (el) {
    if (el.keyCode === 13) {
        printArtist();
        printAlbums();
        search.value = ""

        searchContainer.classList = "searchButton"
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

const printAlbums = () => {
    const albumstUrl = baseUrl + "discography.php?s=" + printTheInputValue()
    fetch(albumstUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            let albums = document.querySelector(".albums")
            albums.innerHTML = ""
            myJson.album.forEach(element => {
                printAlbum(element);

            });

        });

}

const printAlbum = (el) => {
    // let h2 = document.createElement("h2")
    // albums.appendChild(h2)
    // h2.textContent = "Albums"
    // h2.classList = "h"
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
        console.log(albums);
        storeAlbumIData(albumName.textContent)
        window.location.href = "albumData.html";
    });
}

const storeAlbumIData = (albumName) => {
    localStorage.setItem("albumName", albumName)
    localStorage.setItem("searchValue", artistName)
    console.log(artistName, "OVO JE ARTIST NAME");
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