var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();
var googleStrategy = require('passport-google-oath').OAuth2Strategy;

// Plug the strategy into passport in order to use is
passport.use(new googleStrategy({
  clientID: '934579778545-kljd7ea5kgcf8l3lenr189rumbj1ben6.apps.googleusercontent.com',
  clientSecret: 'RK7PBYQ4c5es4em9qct1uPrF',
  callbackURL: 'http://localhost:3000/auth/google/callback'},
  function(req, accessToken, refreshToken, profile, done){
    done(null, profile);
  }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Pull in Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Pull in serialize user. This puts the user object in the session
passport.serializeUser(function(user, done){
  done(null, user)
});

// Passport removes the user out of the session using deserializeuser
passport.deserializeUser(function(user, done){
  done(null, user);
});

// Pull in Express session
app.use(session({secret: 'anything'}))

// Pull in your routes
app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
