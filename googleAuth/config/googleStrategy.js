var passport  = require('passport');
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(){
	// Plug the strategy into passport in order to use is
	passport.use(new googleStrategy({
	  clientID: '934579778545-kljd7ea5kgcf8l3lenr189rumbj1ben6.apps.googleusercontent.com',
	  clientSecret: 'RK7PBYQ4c5es4em9qct1uPrF',
	  callbackURL: 'http://localhost:3000/auth/google/callback'},
	  function(req, accessToken, refreshToken, profile, done){
	    done(null, profile);
	  }
	));
};