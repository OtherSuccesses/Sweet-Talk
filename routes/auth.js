var authController = require('../controllers/authcontroller.js');
 
module.exports = function(app, passport) {
 
    app.get('/api/create', authController.signup);
	app.post('/signup', passport.authenticate('local-signup', 
		{
            successRedirect: '/api/signup/success',
 
            failureRedirect: '/api/signup/failure'
        }
 
    ));
    app.get('/api/signup/failure',function() {
    	res.send(404, {error: "an error occured"})
    });
    app.get('/api/signup/success',function() {
    	res.send(200, {user: req.user})
    });

    app.post('/login', passport.authenticate('local-signin', 
    	{
	    	successRedirect: '/api/login/success',
	    	failureRedirect: '/api/login/failure'
    	})
    );
    app.get('/api/login/failure',function() {
    	res.send(404, {error: "an error occured"})
    });
    app.get('/api/login/success',function() {
    	res.send(200, {user: req.user})
    });
    app.get('/logout',authController.logout);
    app.get('/userView', isLoggedIn, authController.signin);
 	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated()) {
	        return next();	         
	    }
	    res.redirect('/');
	 
	}
}
