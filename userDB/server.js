// dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


// use morgan and bodyparser with our app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

// make public a static dir
app.use(express.static('public'));


// Database configuration with mongoose
mongoose.connect('mongodb://localhost/plantDB');
var db = mongoose.connection;

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Bring in our Models: User & Plants
var YourPlants = require('./models/YourPlants.js');
var PlantsLib = require('./models/PlantsLib.js');


var exampleLibrary = new PlantsLib({
  name: "Hannah's Library of Plants"
});

var useLibrary = exampleLibrary.name;
console.log(useLibrary);


// using the save method in mongoose, we create our example libary in the db
exampleLibrary.save(function(err, doc) {
  // log any errors
  if (err) {
    console.log(err);
  } 
  // or log the doc
  else {
    console.log(doc);
  }
});




// Routes
// ======

// Simple index route
app.get('/', function(req, res) {
  res.send(index.html);
});



// This POST route handles the creation of a new book in our mongodb plants collection
app.post('/submit', function(req, res) {

  var newPlant = new YourPlants(req.body);

// Save the new book in the books collection
  newPlant.save(function(err, doc) {
    // send an error to the browser if there's something wrong
    if (err) {
      res.send(err);
    } 
    // otherwise...
    else {

      PlantsLib.findOneAndUpdate({'name': useLibrary}, {$push: {'yourPlants': doc._id}}, {new: true}, function(err, doc) {
        // send any errors to the browser
        if (err) {
          res.send(err);
        } 
        // or send the doc to the browser
        else {
          res.send(doc);
        }
      });
    }
  });
});


// This GET route let's us see the plants we have added
app.get('/plants', function(req, res) {
  // using our Plants model, "find" every plant in our plants db
  YourPlants.find({}, function(err, doc) {
    // send any errors to the browser

    if (err) {
      res.send(err);
    } 
    // or send the doc to the browser
    else {
      res.send(doc);
    }
  });
});


// Route to see what our user data looks in the browser
app.get('/myplants', function(req, res) {
  // find all of the entries of Library (there's only one, remember)
  PlantsLib.find({}, function(err, doc) {
    // send an error message to the browser
    if (err) {
      res.send(err);
    } 
    // or send the doc to the browser
    else {
      res.send(doc);
    }
  });
});

// Route to see what user looks like WITH populating
app.get('/populated', function(req, res) {
  PlantsLib.find({})

    .populate('yourPlants')
    // Now, execute that query
    .exec(function(err, doc) {
      // send any errors to the browser
      if (err) {
        res.send(err);
      } 
      // or, send our results to the browser, 
      // which will now include the plants stored in the userdb.
      else {
        res.send(doc);
      }
    });
});

// LISTEN ON PORT 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});
