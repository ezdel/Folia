var express = require('express');
var router = express.Router();

// If user is not logged in, then go to login screen, else go to their page
router.use('/', function(req, res, next){
	if(!req.user){
		res.redirect('/');
	} else {
		next();
	}

});

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('users', {user: 
  						{name: req.user.displayName,
  						id: req.user.id}});
});

module.exports = router;