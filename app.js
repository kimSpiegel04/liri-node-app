var Liri = require('./search');
var fs = require("fs");
var joke = require('knock-knock-jokes');

var liri = new Liri();

//search command and search term
var operator = process.argv[2];
var searchTerm = process.argv.slice(3).join(' ');

//if no search term 
if (operator == 'spotify-this-song' && !searchTerm){
    searchTerm = 'the sign ace of base';
}

if (operator == 'movie-this' && !searchTerm){
    searchTerm = 'mr nobody';
}

if (operator == 'concert-this') {
    liri.findConcert(searchTerm);
} else if (operator == 'spotify-this-song') {
    liri.findSong(searchTerm);
} else if (operator == 'movie-this') {
    liri.findMovie(searchTerm);
} else if (operator == 'do-what-it-says') {
    findText();
} else if (operator == 'knock-knock') {
    console.log(joke());
}

///////////////////DO WHAT IT SAYS//////////////////////////////

function findText(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        var term = dataArr[1].trim().slice(1,-1);
        liri.findSong(term);

    });
}

