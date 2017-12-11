var authController = require('../controllers/authcontroller.js');
 
module.exports = function(app, passport) {
 
    app.get('/signup', authController.signup);
	app.post('/signup', passport.authenticate('local-signup', 
		{
            successRedirect: '/userView',
 
            failureRedirect: '/'
        }
 
    ));
	app.get('/login', isLoggedIn, authController.signin);
    app.post('/login', passport.authenticate('local-signin', 
    	{
	    	seccessRedirect: '/userView',
	    	failureRedirect: '/'
    	})
    );
    app.get('/logout',authController.logout);
 	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated()) {
	        return next();	         
	    }
	    res.redirect('/');
	 
	}
}
