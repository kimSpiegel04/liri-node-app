var dotenv = require('dotenv').config();
var keys = require('./keys.js');
var fs = require("fs");
var request = require("request");
var moment = require("moment");
var axios = require("axios");
var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);

var Liri = function() {

    var divider = "\n------------------------------------------------------------\n\n";

///////////////////FIND A CONCERT//////////////////////////////

    this.findConcert = function(concert) {
        var URL = "https://rest.bandsintown.com/artists/" + concert + "/events?app_id=codingbootcamp";
        var concertData = [];

        axios.get(URL)
            .then(function (response){
                //success, print five concerts 
                for (var i = 0; i < 5; i++){
                    var concertInfo = response.data[i];
                    var datetime = concertInfo.datetime;
                    var converted = moment(datetime).format("dddd, MMMM Do YYYY, h:mm:ss a");

                    var newConcert = [
                        '============='+'CONCERT '+[i+1]+'=============',
                        'Concert Name: ' + concertInfo.venue.name,
                        'Venue Location: ' + concertInfo.venue.city + ', ' + concertInfo.venue.region,
                        'Date/Time: ' + converted
                    ].join("\n\n");

                    concertData.push(newConcert);
                };

                //send all five to txt file
                fs.appendFile('log.txt', concertData + divider, function(err){
                    if (err) throw err;
                    for(var i=0; i<concertData.length; i++){
                        console.log(concertData[i]);
                    }
                });
            });
    }

///////////////////FIND A SONG//////////////////////////////

    this.findSong = function(song){
        var songData = [];
        spotify
            .search({ type: 'track', query: song })
            .then(function(response) {
                //success then print five songs
                for (var i=0; i<5; i++){
                    var track = response.tracks.items[i];

                    var newSong = [
                        '=============SONG '+[i]+'=============',
                        'Artist: ' + track.artists[0].name,
                        'Song: ' + track.name,
                        'Album name: ' + track.album.name,
                        'Song Snippet: ' + track.preview_url
                    ].join("\n\n");

                    songData.push(newSong);

                }

                fs.appendFile('log.txt', songData + divider, function(err){
                    if (err) throw err;
                    for(var i=0; i<songData.length; i++){
                        console.log(songData[i]);
                    }
                });

            });
    }

///////////////////FIND A MOVIE//////////////////////////////

    this.findMovie = function(movie){
        var URL = 'http://www.omdbapi.com/?apikey=trilogy&t='+movie

        axios.get(URL)
            .then(function (response){
                var movieInfo = response.data;
                var movieData = [
                    'Title: ' + movieInfo.Title,
                    'Year: ' + movieInfo.Released,
                    'IMDB Rating: ' + movieInfo.Ratings[0].Value,
                    'Rotten Tomatoes Rating: ' + movieInfo.Ratings[1].Value,
                    'Produced in: ' + movieInfo.Country,
                    'Languages: ' + movieInfo.Language,
                    'Plot: ' + movieInfo.Plot,
                    'Actors: ' + movieInfo.Actors
                ].join("\n\n");

                fs.appendFile('log.txt', movieData + divider, function(err){
                    if (err) throw err;
                    console.log(movieData);
                });
            });

    }

};



module.exports = Liri;