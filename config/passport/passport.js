var bCrypt = require('bcrypt-nodejs');
 
module.exports = function(passport, user, db) { 
    var User = user; 
    var LocalStrategy = require('passport-local').Strategy; 
    passport.serializeUser(function(user, done) {
    	console.log(user)
        done(null, user.userName);
    });
    passport.deserializeUser(function(userName, done) {
        User.findById(userName).then(function(user) {
            if(user){
          		done(null, user.get());
        	} else{
          		done(user.errors,null);
        	}
        });
    });
    passport.use('local-signup', new LocalStrategy( 
        { 
            usernameField: 'userName',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, userName, password, done) {
        	console.log("passport callback called");
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            db.User.findOne({
                where: {
                    userName: userName
                }
            }).then(function(user) {
                if (user) {
                    return done(null, false, {
 	                   message: 'No'
                    });
                } else {
                    var userPassword = generateHash(password);
                    var data =
                        {
                            userName: userName,
                            password: password
                        };
                    db.User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    passport.use('local-signin', new LocalStrategy(
 		{
            usernameField: 'userName',
	        passwordField: 'password',
	        passReqToCallback: true // allows us to pass back the entire request to the callback
	    },
	    function(req, userName, password, done) {
	        var User = user;
	        var isValidPassword = function(userpass, password) {
	            return bCrypt.compareSync(password, userpass);
	        }
	        db.User.findOne({
	            where: {
	                userName: userName
	            }
	        }).then(function(user) {
	            if (!user) {
	                return done(null, false, {
	                    message: 'Email does not exist'
	                });
	            }
	            if (!isValidPassword(user.password, password)) {
	                return done(null, false, {
	                    message: 'Incorrect password.'
	                });
	            }
	            var userinfo = user.get();
	            return done(null, userinfo);
	        }).catch(function(err) {
	            console.log("Error:", err);
	            return done(null, false, {
	                message: 'Something went wrong with your Signin'
	            });
	        });
	    }
	 
	));
}