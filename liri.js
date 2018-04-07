require ('dotenv').config ();

var request = require ('request');
var keys = require ('./keys.js');
var fs = require ('fs');

var OMDb = keys.omdb;
var spotify = new Spotify (keys.spotify);
var client = new Twitter (keys.twitter);

var input = process.argv;
var inputA = process.argv[2];
var inputB = '';

for (var i = 3; i < input.length; i++) {
  inputB =+ input[i] + ' ';
}

console.log (inputB);

//function to search for movie using string with arguments from [3+]

function imdbQuery () {
  console.log (inputB);

  var movie = ' ';

  if (inputB === ' ') {
    movie = 'Mr.+NoBody';
  } else {
    movie = inputB.split (' ').join ('+');
  }

  request (
    'http://www.omdbapi.com/?t=' +
      movie +
      '&apikey=' +
      OMDb +
      '&plot=full&tomatoes=true',
    function (error, response, body) {
      // If the request is successful (i.e. if the response status code is 200)
      if (!error && response.statusCode === 200) {
        var data = JSON.parse (body);

        console.log ('----------------------');
        console.log ('Title: ' + data.title);
        console.log ('Year Release: ' + data.year);
        console.log ('IMDB Rating: ' + data.imdbRating);
        console.log ('Rotten Tomatos Rating: ' + data.tomatoRating);
        console.log ('Country: ' + data.Country);
        console.log ('Language: ' + data.Language);
        console.log ('Plot: ' + data.Plot);
        console.log ('Actors: ' + data.Actors);
        console.log ('----------------------');
      }
    }
  );
}

//Request to OMDB
