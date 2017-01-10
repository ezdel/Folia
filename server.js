// ALl of my NPM dependencies
var express = require('express');
var mongoose = require('mongoose');
var path = require("path");
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongojs = require('mongojs');

// All of my file dependencies
var auth = require('./routes/auth');
var users = require('./routes/users');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Pull in Express session
app.use(session({secret: 'anything'}))

require('./config/passport')(app);

// Connect to my db using mongojs
var databaseUrl = "plantDB";
var collections = ["plants", "UserLibrary", "YourPlants"];

// Save mongojs to the db variable
var db = mongojs(databaseUrl, collections);

// Specify the location of static files
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

// ***** COME BACK TO THIS ******
// Bring in our Models: User & Plants
var YourPlants = require('./models/YourPlants.js');
var UserLibrary = require('./models/UserLibrary.js');

// At root, render my index.html file if ther eis no error
app.get('/', function(req, res) {
    if (err) {
        console.log('This is where it breaks');
    } else {
        sendFile(path.join(__dirname + 'public/index.html'));
    }
});

app.use('/auth', auth);
app.use('/users', users);

// Starting to render the frontend html
// app.get('/google', function(req, res) {
//     res.sendFile(path.join(__dirname+'/index.html'));
// });

app.post('/submit', function(req, res) {
    var newPlant = new YourPlants(req.body);
    // Save the new plant in the collection
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

// Save current date
app.post('/date', function(req, res) {
    db.UserLibrary.update({ "$currentDate": { "lastModified": true,
        }});
});

app.post('/search', function(req, res) {
    console.log("Req: " + req);
    console.log("Res: " + res);
    var userSearch = req.body.someData;
    var cleanSearch;

    function toTitleCase(user) {
        cleanSearch = user.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        return cleanSearch;
    }

    toTitleCase(userSearch);

    db.plants.findOne({ "commonName": cleanSearch }, function(err, query) { // This might be a textSearch
        if (err) {
            return res.status(500).send(err)
        }
        if (!query) {
            return res.send({})
        }
        console.log(query, 'query')
        res.json(query)
        var plantSoil = query.soil;
        var plantMoisture = query.moisture;
        var plantShade = query.shade;
        var plantName = query.commonName;

        console.log("name: " + plantName + " soil: " + plantSoil + " moisture: " + plantMoisture + " shade: " + plantShade);
        if (req.user && req.user.email) {
            UserLibrary.findOne({email: req.user.email}).exec(function(err, user) {
                if (err) {
                    return console.log('Error occured when fetching user', err)
                }
                if (!user) {
                    console.error('No user found!')
                    return
                }
                user.yourPlants.push({
                    plantName: plantName,
                    moisture: plantMoisture,
                    shade: plantShade,
                    soil: plantSoil
                })
                user.save()
            })
        } else {
            console.error("No logged in user: Very weird!!! ")
        }
        //}

    });
});

module.exports = app;

// specify my port
app.listen(3000, function() {
    console.log('App running on port 3000!');
});