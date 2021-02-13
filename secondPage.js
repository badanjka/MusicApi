const baseAlbumUrl = "https://theaudiodb.com/api/v1/json/1/"

const getAlbumName = () => {
    return localStorage.getItem("albumName");
}

const getSearchValue = () => {
    return localStorage.getItem("searchValue");
}

const getAlbumsData = () => {
    const albumUrl = baseAlbumUrl + "searchalbum.php?s=" + getSearchValue() + "&a=" + getAlbumName()
    console.log(albumUrl)
    fetch(albumUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson, "noviapi")
            // let albums = document.querySelector(".albums")
            // albums.innerHTML = ""
            // myJson.album.forEach(element => {
            //     printAlbum(element);

            // });
            printAlbumCover(myJson.album)
            printAlbumDescription(myJson.album)
            printYearReleased(myJson.album)
            if (myJson.album[0].intScore) {
                printScore(myJson.album)
            }

            let albumId = myJson.album[0].idAlbum
            getSongs(albumId)
        });

}
getAlbumsData()

const printAlbumCover = (el) => {
    let cover = document.querySelector(".cover")
    let img = document.createElement("img")
    img.classList = "image"
    cover.appendChild(img)
    let poster = el[0].strAlbumThumb
    img.setAttribute("src", poster)
}

const printAlbumDescription = (el) => {
    let description = document.querySelector(".description")
    let p = document.createElement("p")
    p.classList = "descriptionAlbum"
    p.textContent = el[0].strDescriptionEN
    description.appendChild(p)
}

const printYearReleased = (el) => {
    let albumYear = document.querySelector(".albumYear")
    let yearReleased = document.createElement("p")
    yearReleased.classList = "yearReleased"
    yearReleased.textContent = "Year Released: " + el[0].intYearReleased
    albumYear.appendChild(yearReleased)
}
const printScore = (el) => {
    let albumScore = document.querySelector(".albumScore")
    let score = document.createElement("p")
    score.classList = "score"
    score.textContent = " Album Score: " + el[0].intScore
    albumScore.appendChild(score)
}

const getSongs = (albumId) => {
    const albumUrl = baseAlbumUrl + "track.php?m=" + albumId
    console.log(albumUrl)
    fetch(albumUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson, "api")
            myJson.track.forEach(element => {
                printSongs(element);

            });

        });

}

const printSongs = (el) => {
    let songs = document.querySelector(".songs")
    let song = document.createElement("p")
    song.classList = "song"
    song.textContent = el.strTrack
    songs.appendChild(song)

}