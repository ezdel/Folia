var express = require('express');
var routes = require('./routes/search.js');
var mongoose = require('mongoose');
var path    = require("path");

var app = express();

// require mongojs and connect to my db
var mongojs = require('mongojs');
var databaseUrl = "plantDB";
var collections = ["plants"];

// save mongojs to the db variable
var db = mongojs(databaseUrl, collections); 

// specifies the location of static files
app.use(express.static('public'));

// start a mongoose connection
mongoose.connect('mongodb://localhost/search');
var db = mongoose.connection;

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// at '/', render my index.html file if ther eis no error
app.get('/', function(req, res) {
	if(err) {
		console.log(err);
	} else {
		sendFile(path.join(__dirname+'/public/index.html'));
	}
});

// at '/db', render the result of my query if there is no error
app.get('/db', function(req, res) {
	db.plants.find().limit(1).pretty(), function(err, query) {
		if(err) {
			console.log(err);
		} else {
			res.json(query);
		}
	};
});

// specify my port
app.listen(3000, function() {
  console.log('App running on port 3000!');
});