var express = require('express');
var routes = require('./routes/search.js');
var mongoose = require('mongoose');
var path    = require("path");
var bodyParser = require('body-parser');
var ReactStormpath = require('react-stormpath').default;
var Router = require('react-stormpath').Router;
var AuthenticatedRoute = require('react-stormpath').AuthenticatedRoute;
var LoginLink = require('react-stormpath').LoginLink;


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require mongojs and connect to my db
var mongojs = require('mongojs');
var databaseUrl = "plantDB";
var collections = ["plants"];

// save mongojs to the db variable
var db = mongojs(databaseUrl, collections); 

// specifies the location of static files
app.use(express.static('public'));

// start a mongoose connection
mongoose.connect('mongodb://localhost/db');

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose has an error: ', err);
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
	// res.send(db.plants.find({}).limit(2));
	db.plants.find({}, function(err, query) {
		if(err) {
			console.log(err);
		} else {
			res.json(query);
		}
	});

});

app.post('/db', function(req, res) {
	if(err) {
		console.log(err);
	} else {
		// the request was sent by the front-end
		console.log(req.body);
	}
});

app.post('/search', function(req, res) {
	var userSearch = req.body.someData;
	var happySearch;

	function toTitleCase(user){
    		happySearch = user.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    		return happySearch;
	}

toTitleCase(userSearch);

	db.plants.find({"commonName": happySearch}, function(err, query) {
		if(err) {
			console.log(err);
		} else {
			res.json(query);
			console.log("soil: " + query[0].soil + " moisture: " + query[0].moisture + " shade: " + query[0].shade);

		}
	});
});

// specify my port
app.listen(3000, function() {
  console.log('App running on port 3000!');
});