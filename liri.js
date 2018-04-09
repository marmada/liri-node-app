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
      console.log (
        '----------------------\nTitle: ' +
          data.Title +
          '\nYear Release: ' +
          data.Year +
          '\nIMDB Rating: ' +
          data.imdbRating +
          '\nRotten Tomatos Rating: ' +
          data.tomatoRating +
          '\nCountry: ' +
          data.Country +
          '\nLanguage: ' +
          data.Language +
          '\nPlot: ' +
          data.Plot +
          '\nActors: ' +
          data.Actors +
          '\n----------------------'
      );

      fs.appendFile (
        'log.txt',
        '----------------------\r\nTitle: ' +
          data.Title +
          '\r\nYear Release: ' +
          data.Year +
          '\r\nIMDB Rating: ' +
          data.imdbRating +
          '\r\nRotten Tomatos Rating: ' +
          data.tomatoRating +
          '\r\nCountry: ' +
          data.Country +
          '\r\nLanguage: ' +
          data.Language +
          '\r\nPlot: ' +
          data.Plot +
          '\r\nActors: ' +
          data.Actors +
          '\r\n----------------------',
        function (err) {
          if (err) {
            console.log (err);
          }
        }
      );
    }

    if (data.Response == 'False') {
      console.log ('I did not find your movie, maybe try something else');

      fs.appendFile (
        'log.txt',
        '\r\nI did not find your movie, maybe try something else',
        function (err) {
          if (err) {
            console.log (err);
          }
        }
      );
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
        console.log (
          'Date & Place:' + tweets[i].created_at + '\nTweet: ' + tweets[i].text
        );

        fs.appendFile (
          'log.txt',
          '\r\nDate & Place:' +
            tweets[i].created_at +
            '\r\nTweet: ' +
            tweets[i].text,
          function (err) {
            if (err) {
              console.log (err);
            }
          }
        );
      }
    }
  });
}

// searcg spotify

function song () {
  var song = '';

  if (inputB == '') {
    song = 'The Sign Ace of base';
  } else {
    song = inputB;
  }

  spotify.search ({type: 'track', query: song, limit: 1}, function (err, data) {
    if (err) {
      return console.log ('Error occurred: ' + err);
    }

    console.log (
      '\n-----------------Spotify-this-song!--------------------\nArtists: ' +
        data.tracks.items[0].album.artists[0].name +
        '\nSong Name: ' +
        data.tracks.items[0].name +
        '\nPreview URL: ' +
        data.tracks.items[0].preview_url +
        '\nExternal URL ' +
        data.tracks.items[0].external_urls.spotify +
        '\nAlbum Name ' +
        data.tracks.items[0].album.name +
        '\n-----------------Brought to you a Liri Lola!--------------------'
    );

    fs.appendFile (
      'log.txt',
      '\r\n-----------------Spotify-this-song!--------------------\r\nArtists: ' +
        data.tracks.items[0].album.artists[0].name +
        '\r\nSong Name: ' +
        data.tracks.items[0].name +
        '\r\nPreview URL: ' +
        data.tracks.items[0].preview_url +
        '\r\nExternal URL ' +
        data.tracks.items[0].external_urls.spotify +
        '\r\nAlbum Name ' +
        data.tracks.items[0].album.name +
        '\r\n-----------------Brought to you a Liri Lola!--------------------',
      function (err) {
        if (err) {
          console.log (err);
        }
      }
    );
  });
}

// do what it says 

function justdoit () {
  fs.readFile ('random.txt', 'utf8', function (error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log (error);
    }
    // We will then print the contents of data
    console.log (data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split (',');
    inputA = dataArr[0];
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

    if (inputA == 'do-what-it-says') {
      justdoit (inputB);
    }
  });
}

//Node Input

if (inputA == 'movie-this') {
  //log command

  fs.appendFile ('log.txt', '\r\n' + inputA + ' ' + inputB, function (err) {
    if (err) {
      console.log (err);
    }
  });

  imdbQuery ();
}

if (inputA == 'my-tweets') {
  fs.appendFile ('log.txt', '\r\n' + inputA + ' ' + inputB, function (err) {
    if (err) {
      console.log (err);
    }
  });

  twitter ();
}

if (inputA == 'spotify-this-song') {
  fs.appendFile ('log.txt', '\r\n' + inputA + ' ' + inputB, function (err) {
    if (err) {
      console.log (err);
    }
  });

  song ();
}

if (inputA == 'do-what-it-says') {
  fs.appendFile ('log.txt', '\r\n' + inputA + ' ' + inputB, function (err) {
    if (err) {
      console.log (err);
    }
  });

  justdoit ();
}
