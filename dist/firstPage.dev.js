"use strict";

var search = document.querySelector(".search");
var button = document.querySelector(".button");
var baseUrl = "https://theaudiodb.com/api/v1/json/1/";
var artistId = 0;
var searchContainer = document.querySelector(".searchButton");
var artistName = ''; // const resetVideos = () => {
//     let videos = document.querySelectorAll('.video')
//     videos.forEach((el) => {
//         el.src = ''
//     })
// }
// resetVideos()

var printTheInputValue = function printTheInputValue() {
  return search.value;
};

var printArtist = function printArtist() {
  var artistUrl = baseUrl + "search.php?s=" + printTheInputValue();
  artistName = printTheInputValue();
  fetch(artistUrl).then(function (response) {
    return response.json();
  }).then(function (myJson) {
    console.log(myJson);

    if (myJson.artists === null) {// Uraditi nesto tipa, sakriti donji kontent, prikazati p sa obavestenjem
      //  ( moze da se koristi toggle class )
    }

    var name = document.querySelector(".name");

    if (name) {
      name.remove();
    }

    var img = document.querySelector(".image");

    if (img) {
      img.remove();
    }

    var paragraph = document.querySelector(".bio");

    if (paragraph) {
      paragraph.remove();
    }

    var albums = document.querySelector(".wrapper");
    console.log(albums, "za brisanje");

    if (albums) {
      albums.remove();
    }

    printArtistName(myJson.artists);
    printImage(myJson.artists);
    printBio(myJson.artists);
    setArtistId(myJson.artists);
    getVideos(); // console.log(myJson.artists)
  });
};

var setArtistId = function setArtistId(el) {
  console.log("SETUJEM ID");
  artistId = el[0].idArtist;
};

button.addEventListener('click', function () {
  printArtist();
  printAlbums();
  search.value = "";
  searchContainer.classList = "searchButton";
});
search.addEventListener('keypress', function (el) {
  if (el.keyCode === 13) {
    printArtist();
    printAlbums();
    search.value = "";
    searchContainer.classList = "searchButton";
  }
});

var printArtistName = function printArtistName(el) {
  var posterAndInfo = document.querySelector(".posterAndInfo");
  var name = document.createElement("h1");
  name.classList = "name";
  name.textContent = el[0].strArtist;
  console.log(name);
  posterAndInfo.appendChild(name);
};

var printImage = function printImage(el) {
  var posterAndInfo = document.querySelector(".posterAndInfo");
  var img = document.createElement("img");
  img.classList = "image";
  posterAndInfo.appendChild(img);
  var poster = el[0].strArtistFanart;
  img.setAttribute("src", poster);
};

var printBio = function printBio(el) {
  var posterAndInfo = document.querySelector(".posterAndInfo");
  var paragraph = document.createElement("p");
  paragraph.classList = "bio";
  paragraph.textContent = el[0].strBiographyEN;
  posterAndInfo.appendChild(paragraph);
};

var printAlbums = function printAlbums() {
  var albumstUrl = baseUrl + "discography.php?s=" + printTheInputValue();
  fetch(albumstUrl).then(function (response) {
    return response.json();
  }).then(function (myJson) {
    var albums = document.querySelector(".albums");
    albums.innerHTML = "";
    myJson.album.forEach(function (element) {
      printAlbum(element);
    });
  });
};

var printAlbum = function printAlbum(el) {
  // let h2 = document.createElement("h2")
  // albums.appendChild(h2)
  // h2.textContent = "Albums"
  // h2.classList = "h"
  var oneAlbum = document.createElement("div");
  oneAlbum.classList = "oneAlbum";
  var albums = document.querySelector(".albums");
  var albumName = document.createElement("p");
  var year = document.createElement("div");
  year.textContent = el.intYearReleased;
  year.classList = "year";
  albumName.textContent = el.strAlbum;
  albumName.classList = "albumName";
  oneAlbum.appendChild(albumName);
  oneAlbum.appendChild(year);
  albums.appendChild(oneAlbum);
  albumName.addEventListener('click', function () {
    console.log(albums);
    storeAlbumIData(albumName.textContent);
    window.location.href = "albumData.html";
  });
};

var storeAlbumIData = function storeAlbumIData(albumName) {
  localStorage.setItem("albumName", albumName);
  localStorage.setItem("searchValue", artistName);
  console.log(artistName, "OVO JE ARTIST NAME");
};

var getVideos = function getVideos() {
  console.log("PRAVIMN URL");
  var videosUrl = baseUrl + "mvid.php?i=" + artistId;
  fetch(videosUrl).then(function (response) {
    return response.json();
  }).then(function (myJson) {
    var videos = document.querySelectorAll('.video');

    for (var i = 0; i < 3; i++) {
      var baseVideoUrl = 'https://www.youtube.com/embed/';
      var _videosUrl = myJson.mvids[i].strMusicVid;

      var splitedUrl = _videosUrl.split('=');

      var videoId = splitedUrl[1];
      videos[i].src = baseVideoUrl + videoId;
    }
  });
};