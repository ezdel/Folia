var express = require('express');
var routes = require('./routes/search.js');
var mongoose = require('mongoose');
var path = require("path");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require mongojs and connect to my db
var mongojs = require('mongojs');
var databaseUrl = "plantDB";
var collections = ["plants", "UserLibrary", "YourPlants"];

// save mongojs to the db variable
var db = mongojs(databaseUrl, collections);

// specifies the location of static files
app.use(express.static('public'));

// start a mongoose connection
mongoose.connect('mongodb://localhost/plantDB');

// show any mongoose errors
db.on('error', function(err) {
    console.log('Mongoose has an error: ', err);
});

// once logged in to the db through mongoose, log a success message
db.once('open', function() {
    console.log('Mongoose connection successful.');
});


// ***** RETURN LATER ******
// Bring in our Models: User & Plants
var YourPlants = require('./models/YourPlants.js');
var UserLibrary = require('./models/UserLibrary.js');

var exampleLibrary = new UserLibrary({
    name: "Plants Library"
});

var useLibrary = exampleLibrary.name;
console.log(useLibrary);
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


// at '/', render my index.html file if ther eis no error
app.get('/', function(req, res) {
    if (err) {
        console.log(err);
    } else {
        sendFile(path.join(__dirname + '/public/index.html'));
    }
});

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

            UserLibrary.findOneAndUpdate({ 'name': useLibrary }, { $push: { 'yourPlants': doc._id } }, { new: true }, function(err, doc) {
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
    UserLibrary.find({}, function(err, doc) {
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

app.get('/populated', function(req, res) {
    UserLibrary.find({})

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


// at '/db', render the result of my query if there is no error
app.get('/db', function(req, res) {
    // res.send(db.plants.find({}).limit(2));
    db.plants.find({}, function(err, query) {
        if (err) {
            console.log(err);
        } else {
            res.json(query);
        }
    });

});

app.post('/db', function(req, res) {
    if (err) {
        console.log(err);
    } else {
        // the request was sent by the front-end
        console.log(req.body);
    }
});

app.post('/search', function(req, res) {
    var userSearch = req.body.someData;
    var cleanSearch;

    function toTitleCase(user) {
        cleanSearch = user.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        return cleanSearch;
    }

    toTitleCase(userSearch);

    db.plants.find({ "commonName": cleanSearch }, function(err, query) {
        var plantSoil = query[0].soil;
        var plantMoisture = query[0].moisture;
        var plantShade = query[0].shade;
        var plantName = query[0].commonName;

        if (err) {
            console.log(err);
        } else {
            res.json(query);
            console.log("name: " + plantName + " soil: " + plantSoil + " moisture: " + plantMoisture + " shade: " + plantShade);

            var examplePlant = new YourPlants({
                plantName: plantName,
                moisture: plantMoisture,
                shade: plantShade,
                soil: plantSoil
            });

            examplePlant.save(function(err, doc) {
                // log any errors
                if (err) {
                    console.log(err);
                }
                // or log the doc
                else {
                    UserLibrary.findOneAndUpdate({ 'name': useLibrary }, { $push: { 'yourPlants': doc._id } }, { new: true }, function(err, doc) {
                        if (err) {
                            res.send(err);
                        } else {
                            console.log('Go forth');
                        }
                    });
                    console.log(doc);
                }
            });

            exampleLibrary.populate('examplePlant');

        }

    });
});

// specify my port
app.listen(3000, function() {
    console.log('App running on port 3000!');
});
