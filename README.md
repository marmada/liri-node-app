# liri-node-app
 LIRI. 
 
 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

 Recognized commands on node work as follow when you execute from the root folder:

 node liri.js my-tweets : will pull your last 20 tweets

 node liri.js spotify-this-song -any song- : will get information from spotify including title, artist, album, url, etc

 node liri.js spotify-this-song : will get information for "The Sign by Ace of Base"

 node liri.js movie-this - any movie - : will grab basic information from OMDB API

 node liri.js movie-this : will bring back details for Mr. Nobody as default

 node liri.js do-what-it-says : will read the command from text file (random.txt and execute if line matches any of the formats above)

 In all case, the command and the results will be logged on a text file log.txt
