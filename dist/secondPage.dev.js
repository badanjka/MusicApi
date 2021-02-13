"use strict";

var baseAlbumUrl = "https://theaudiodb.com/api/v1/json/1/";

var getAlbumName = function getAlbumName() {
  return localStorage.getItem("albumName");
};

var getSearchValue = function getSearchValue() {
  return localStorage.getItem("searchValue");
};

var getAlbumsData = function getAlbumsData() {
  var albumUrl = baseAlbumUrl + "searchalbum.php?s=" + getSearchValue() + "&a=" + getAlbumName();
  console.log(albumUrl);
  fetch(albumUrl).then(function (response) {
    return response.json();
  }).then(function (myJson) {
    console.log(myJson, "noviapi"); // let albums = document.querySelector(".albums")
    // albums.innerHTML = ""
    // myJson.album.forEach(element => {
    //     printAlbum(element);
    // });

    printAlbumCover(myJson.album);
    printAlbumDescription(myJson.album);
    printYearReleased(myJson.album);

    if (myJson.album[0].intScore) {
      printScore(myJson.album);
    }

    var albumId = myJson.album[0].idAlbum;
    getSongs(albumId);
  });
};

getAlbumsData();

var printAlbumCover = function printAlbumCover(el) {
  var cover = document.querySelector(".cover");
  var img = document.createElement("img");
  img.classList = "image";
  cover.appendChild(img);
  var poster = el[0].strAlbumThumb;
  img.setAttribute("src", poster);
};

var printAlbumDescription = function printAlbumDescription(el) {
  var description = document.querySelector(".description");
  var p = document.createElement("p");
  p.classList = "descriptionAlbum";
  p.textContent = el[0].strDescriptionEN;
  description.appendChild(p);
};

var printYearReleased = function printYearReleased(el) {
  var albumYear = document.querySelector(".albumYear");
  var yearReleased = document.createElement("p");
  yearReleased.classList = "yearReleased";
  yearReleased.textContent = "Year Released: " + el[0].intYearReleased;
  albumYear.appendChild(yearReleased);
};

var printScore = function printScore(el) {
  var albumScore = document.querySelector(".albumScore");
  var score = document.createElement("p");
  score.classList = "score";
  score.textContent = " Album Score: " + el[0].intScore;
  albumScore.appendChild(score);
};

var getSongs = function getSongs(albumId) {
  var albumUrl = baseAlbumUrl + "track.php?m=" + albumId;
  console.log(albumUrl);
  fetch(albumUrl).then(function (response) {
    return response.json();
  }).then(function (myJson) {
    console.log(myJson, "api");
    myJson.track.forEach(function (element) {
      printSongs(element);
    });
  });
};

var printSongs = function printSongs(el) {
  var songs = document.querySelector(".songs");
  var song = document.createElement("p");
  song.classList = "song";
  song.textContent = el.strTrack;
  songs.appendChild(song);
};