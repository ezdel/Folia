var express = require('express');
var passport = require('passport');
var router = express.Router();

router.route('/google/callback')
	.get(passport.authenticate('google', {
		successRedirect: '/google',
		failure: '/error/'
	}));

router.route('/google')
	.get(passport.authenticate('google', {
		scope: ['https://www.googleapis.com/auth/userinfo.profile',
		'https://www.googleapis.com/auth/userinfo.email']
}));

module.exports = router;

// app.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
// app.get('/google', passport.authenticate('google', {successRedirect: 'www.google.com', failureRedirect: 'www.reddit.com'}));