// Creating variables to store node packages
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotifyClient = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");
// Variables to store input information
var command = process.argv[2];
var input = process.argv.slice(3);
var queryUrl = "";
// Creating functions for each command
function concertSearch() {
  input = input.join("+");
  queryUrl =
    "https://rest.bandsintown.com/artists/" +
    input +
    "/events?app_id=codingbootcamp";
  axios
    .get(queryUrl)
    .then(function(response) {
      // console.log(response.data[0].venue);
      for (let i = 0; i < response.data.length; i++) {
        var venue = response.data[i].venue.name;
        var city = response.data[i].venue.city;
        var region = response.data[i].venue.region;
        var dateTime = moment(response.data[i].datetime).format("MM/DD/YYYY");
        console.log(
          "They will be playing at " +
            venue +
            " in " +
            city +
            "," +
            region +
            " on " +
            dateTime +
            "."
        );
      }
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}
function spotifySearch() {
  input = input.join(" ");
  spotifyClient.search({ type: "track", query: input, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    var spotifyData = data.tracks.items[0];
    var artistName = spotifyData.album.artists[0].name;
    var songName = spotifyData.name;
    var albumName = spotifyData.album.name;
    var previewURL = spotifyData.preview_url;
    // console.log(spotifyData.album.name)
    // console.log (spotifyData.name)
    // console.log(spotifyData);
    // console.log(artistName);
    // console.log(spotifyData.preview_url)
    console.log(
      "Artist Name: " +
        artistName +
        "\nSong Name: " +
        songName +
        "\nAlbum Name: " +
        albumName +
        "\nPreview URL: " +
        previewURL
    );
  });
}
// Switch to run through the different commands
switch (command) {
  case "concert-this":
    // console.log("Working");
    concertSearch();
    break;
  case "spotify-this-song":
    // console.log("Working");
    spotifySearch();
    break;
  case "movie-this":
    // console.log("Working");
    break;
  case "do-what-it-says":
    // console.log("Working");
    break;
}
