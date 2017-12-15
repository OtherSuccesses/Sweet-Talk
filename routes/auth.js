var express = require('express');
var sessions = require('express-session');
module.exports = function(app, passport, db) {
 
    app.get('/api/create', function() {
    	console.log('api/create called')
    });
	app.post('/api/create', passport.authenticate('local-signup', 
		{
            successRedirect: '/api/signup/success',
            failureRedirect: '/api/signup/failure',
	    	failureFlash: true
        }
 
    ));
    app.get('/api/signup/failure',function(req,res) {
		res.send({error: "There has been an error in signup."});
    });
    app.get('/api/signup/success',function(req,res) {
  		let {userName, password, gender, seeking, age, online} = req.user;
  		db.sequelize.findOne(
  			{
  				where: {
  					userName: userName
  				}
  			}
  		).then(function(user) {
  			if(user) {
  				console.log("User by that name already exists.");
  				res.send({error: "User by that name already exists."});
  			} else {
  				db.sequelize.define(userName, {
			    	userName: {
			        	type: db.Sequelize.STRING,
				        allowNull: false,
				        primaryKey: true,
				        validate:{
				            isAlphanumeric: true
				        }
				    },
				    swiped: {
				        type: db.Sequelize.BOOLEAN,
				        allowNull: false
				    }
			    }, {
			    	freezeTableName: true
			  	});
			  	db.sequelize.sync().then(() => {
			    	console.log('then sync')
			    	db.User.create({
			        	userName,
			      		password,
			      		gender,
			      		seeking,
			      		age,
			      		online
			    	}).then(function(data) {
			    		console.log('signup success');
			      		res.redirect('/userView');
			    	});
			  	})
			}
		});	    
    });

    app.post('/login', passport.authenticate('local-signin', 
    	{
	    	successRedirect: '/api/login/success',
	    	failureRedirect: '/api/login/failure',
	    	failureFlash: true
    	})
    );
    app.get('/api/login/failure',function(req,res) {
    	res.status(401);
    	
    });
    app.get('/api/login/success',function(req,res) {
    	console.log(`successfully logged in...`);
    	res.send(req.user);
    });
    app.get('/logout', function(req, res) { 
	    req.session.destroy(function(err) { 
	        res.redirect('/'); 
	    });
	});
    app.get('/userView', isLoggedIn, function(req,res) {
    	currentUser = req.user;
    	db.User.findAll({
		    where: {
		      gender: currentUser.seeking,
		      seeking: currentUser.gender
		    }
		}).then((results)=>{
		    var users = [];
		    for(var i = 0; i<results.length; i++) {
		      if(results[i].dataValues.userName !== currentUser.userName) {
		        users[i] = results[i].dataValues;
		      }
		    }
		    var handlebarsObject = {
		      currentUser: currentUser,
		      users: users
		    };
		    res.render("userview.handlebars", handlebarsObject);
    	});
    });
 	function isLoggedIn(req, res, next) {
	    if (req.isAuthenticated()) {
	        return next();	

	    }
	    res.status(200).send({});
	 
	}
}
