require ('dotenv').config ();
var keys = require ('./keys.js');
var request = require ('request');
var fs = require ('fs');
var Spotify = require ('node-spotify-api');
var Twitter = require ('twitter');

var OMDb = keys.omdb;
var spotify = new Spotify (keys.spotify);
var client = new Twitter (keys.twitter);

var input = process.argv;
var inputA = process.argv[2];
var inputB = '';

for (var i = 3; i < input.length; i++) {
  if (i > 3 && i < input.length) {
    inputB = inputB + ' ' + input[i];
  } else {
    inputB += input[i];
  }
}

//function to search for movie using string with arguments from [3+]

function imdbQuery () {
  var movie = ' ';

  if (inputB === '') {
    movie = 'Mr+NoBody';
  } else {
    movie = inputB.split (' ').join ('+');
  }

  var urlQ =
    'http://www.omdbapi.com/?t=' +
    movie +
    '&apikey=' +
    OMDb +
    '&plot=full&tomatoes=true';

  console.log (
    '---------------------------------\n' +
      urlQ +
      '\n---------------------------------'
  );

  request (urlQ, function (error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    var data = JSON.parse (body);

    if (!error && response.statusCode === 200) {
      console.log ('----------------------');
      console.log ('Title: ' + data.Title);
      console.log ('Year Release: ' + data.Year);
      console.log ('IMDB Rating: ' + data.imdbRating);
      console.log ('Rotten Tomatos Rating: ' + data.tomatoRating);
      console.log ('Country: ' + data.Country);
      console.log ('Language: ' + data.Language);
      console.log ('Plot: ' + data.Plot);
      console.log ('Actors: ' + data.Actors);
      console.log ('----------------------');
    }

    if (data.Response == 'False') {
      console.log ('I did not find your movie, maybe try something else');
    } else {
      return 'N/A';
    }
  });
}

// function to get last 20 tweets

function twitter () {
  var params = {screen_name: 'mairima1', count: 20};
  client.get ('statuses/user_timeline', params, function (
    error,
    tweets,
    response
  ) {
    if (!error) {
      //console.log(tweets);
      for (var i = 0; i < tweets.length; i++) {
        console.log ('Date & Place:' + tweets[i].created_at);
        console.log ('Tweet: ' + tweets[i].text);
      }
    }
  });
}

function song () {
  var song = '';

  if (inputB == '') {
    song = 'The Sign ace of base';

    spotify.search ({type: 'track', query: song, limit: 1}, function (err, data) {
      if (err) {
        return console.log ('Error occurred: ' + err);
      }
  
      console.log ('-----------------Spotify-this-song!--------------------\n');
      //console.log(data.artists.items);
      console.log ('Artists: ' + data.tracks.items[0].album.artists[0].name);
      console.log ('Song Name: ' + data.tracks.items[0].name);
      console.log ('Preview URL: ' + data.tracks.items[0].preview_url);
      console.log ('External URL ' + data.tracks.items[0].external_urls.spotify);
      console.log ('Album Name ' + data.tracks.items[0].album.name);
      console.log (
        '\n-----------------Brought to you a Liri Lola!--------------------'
      );
    });

  } else {

    song = inputB;
    spotify.search ({type: 'track', query: song, limit: 1}, function (err, data) {
      if (err) {
        return console.log ('Error occurred: ' + err);
      }
      
      console.log ('\n-----------------Spotify-this-song!--------------------\n');
      //console.log(data.tracks.items[0]);
      console.log ('Artists: ' + data.tracks.items[0].album.artists[0].name);
      console.log ('Song Name: ' + data.tracks.items[0].name);
      console.log ('Preview URL: ' + data.tracks.items[0].preview_url);
      console.log ('External URL ' + data.tracks.items[0].external_urls.spotify);
      console.log ('Album Name ' + data.tracks.items[0].album.name);
      console.log (
        '\n-----------------Brought to you a Liri Lola!--------------------'
      );
    });
  }

  };

  function justdoit(){

    fs.readFile("random.txt", "utf8", function(error, data) {

      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }
          // We will then print the contents of data
      console.log(data);
    
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");
      inputA = dataArr[0]
      inputB = dataArr[1];

      if (inputA == 'movie-this') {
        imdbQuery (inputB);
      }
      
      if (inputA == 'my-tweets') {
        twitter (inputB);
      }
      
      if (inputA == 'spotify-this-song') {
        song (inputB);
      }
      
      if(inputA == 'do-what-it-says'){
      
        justdoit(inputB);
      }
    });
  }

//Node Input

if (inputA == 'movie-this') {
  imdbQuery ();
}

if (inputA == 'my-tweets') {
  twitter ();
}

if (inputA == 'spotify-this-song') {
  song ();
}

if(inputA == 'do-what-it-says'){

  justdoit();
}
