// Creating variables to store node packages
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotifyClient = new Spotify(keys.spotify);
var moment = require("moment");
var axios = require("axios");
var fs = require("fs")
// Variables to store input information
var command = process.argv[2];
var input = process.argv.slice(3);
var queryUrl = "";
// Creating function for the Bands in Town command
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
// Creating function for the Spotify command
function spotifySearch() {
  if (input == false){
    var spotifyParameter = { type: "track", query: "The Sign Ace of Base", limit: 1 }
  }
  else {
  input = input.join(" ");
  var spotifyParameter = { type: "track", query: input, limit: 1 }
  }
  spotifyClient.search(spotifyParameter, function(
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
// Creating function for the Movie search command
function movieSearch() {
  if (input == false){
    input = "Mr. Nobody"
  }
  else{
    input = input.join("+")
  }
   queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
   axios
    .get(queryUrl)
    .then(function(response) {
      var movie = response.data
      var title = movie.Title;
      // console.log(title)
      var year = movie.Year
      // console.log(year)
      var imdbRating = movie.Rated
      // console.log(imdbRating)
      var rotRating = movie.Ratings[1].Value
      // console.log(rotRating)
      var country = movie.Country
      // console.log(country)
      var language = movie.Language
      // console.log(language)
      var plot = movie.Plot
      // console.log(plot)
      var actors = movie.Actors
      // console.log(actors)
     console.log("Movie Name: " + title+
                 "\nYear released: " +year+
                 "\nIMDB rating: " +imdbRating+
                 "\nRotten Tomatoes rating: " +rotRating+
                 "\nCountries produced: " +country+
                 "\nLanguages available: " +language+
                 "\nPlot: " + plot+
                  "\nActors: "+ actors)
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
function txtSearch(){
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.split(",");
    // console.log(data)
    command = data[0]
    // console.log(command)
    input = data[1].split(" ")
    // console.log(input)

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
        movieSearch();
        break;
      case "do-what-it-says":
        // console.log("Working");
        txtSearch();
        break;
    }
})
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
    movieSearch();
    break;
  case "do-what-it-says":
    // console.log("Working");
    txtSearch();
    break;
}
