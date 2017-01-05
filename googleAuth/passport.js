var express = require('express');
var app = express();
var passport = require('passport');
var	GoogleStrategy 	= require('passport-google-oauth').OAuth2Strategy;

var login = require('./models/Login.js');
passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'});

passport.use(new GoogleStrategy({
	  clientID: '934579778545-kljd7ea5kgcf8l3lenr189rumbj1ben6.apps.googleusercontent.com',
	  clientSecret: 'RK7PBYQ4c5es4em9qct1uPrF',
	  callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  function (token, tokenSecret, profile, done) {
    // placeholder for translating profile into your own custom user object.
    // for now we will just use the profile object returned by GitHub
    process.nextTick(function(){
      Login.findOne({'google.id': profile.id}, function(err, user){
        if(err) {
          return err;
        } else if (user) {
          return done(null, profile);
        } else {
          var newLogin = new Login();
          newLogin.google.id = profile.id;
          newLogin.google.token = token;
          newLogin.google.name = profile.displayName;
          newLogin.google.email = profile.emails[0].value;

          newLogin.save(function(err) {
            if(err){
              return err;
            }
            console.log(profile);
          })
        }
      })
    })
    return done(null, profile);
  }
));

// Express and Passport Session
var session = require('express-session');
// app.use(session({secret: "enter custom sessions secret here"}));
app.use(session({secret: "secret"}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // maybe you are getoing to get the user from mongo by id?
  // null is for errors
  done(null, user);
});

// we will call this to start the Google Login process
app.get('/auth/google', passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}));

// Google will call this URL
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    console.log("Google Callback");
    console.log(req.isAuthenticated());
    res.redirect('/');
  });

app.get('/login', function (req, res) {
  var html = "<ul>\
    <li><a href='/auth/google'>Google</a></li>\
    <li><a href='/'></a></li>\
    <li><a href='/protected'>Check For Login</a></li>\
    <li><a href='/'></a></li>\
    <li><a href='/logout'>logout</a></li>\
  </ul>";

  // dump the user for debugging
  if (req.isAuthenticated()) {
    html += "<p>User is LOGGED IN as user:</p>"
    html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
  } else {
    html += "<p> User is NOT LOGGED IN. </p>"
    html += "</p>"
    html += "</p>"
  }

  res.send(html);
});

app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//  Use this route middleware on any resource that needs to be protected.  If
//  the request is authenticated (typically via a persistent login session),
//  the request will proceed.  Otherwise, the user will be redirected to the
//  login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

app.get('/protected', ensureAuthenticated, function(req, res) {
    var html = "<ul>\
      <li><a href='/auth/google'>Google</a></li>\
      <li><a href='/'></a></li>\
      <li><a href='/protected'>Check For Login</a></li>\
      <li><a href='/'></a></li>\
      <li><a href='/logout'>logout</a></li>\
    </ul>";
    // dump the user for debugging
  if (req.isAuthenticated()) {
    html += "<p>User is LOGGED IN as user:</p>"
    html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
  } else {
    html += "<p> User is NOT LOGGED IN. </p>"
    html += "</p>"
    html += "</p>"
  }
    res.send(html);
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Amazing things happening on port ' + server.address().port);
});
