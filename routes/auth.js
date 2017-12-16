var express = require('express');
var sessions = require('express-session');
var io = require('socket.io');
const socketConnection = require('../controllers/socketConnection.js')
module.exports = function(app, passport, db, io) {
 
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
    	console.log(req.user);
  		let {userName, password, gender, seeking, age, bio, img} = req.user;

		db.sequelize.define(userName, {
	    	id: {
	    		type: db.Sequelize.INTEGER,
	    		allowNull: false,
	    		primaryKey: true,
	    		autoIncrement: true
	    	},
	    	userName: {
	        	type: db.Sequelize.STRING,
		        allowNull: false,
		        validate:{
		            isAlphanumeric: true
		        }
		    },
		    swiped: {
		        type: db.Sequelize.BOOLEAN,
		        allowNull: false
		    }
	    }, {
	    	freezeTableName: true,
	    	timestamps: false,
	  	});
		db.User.update({online: 1}, {
			where: {
				userName
			}
		}).then(()=>{

		// });
		  	db.sequelize.sync().then(() => {
		    	res.json(req.user);
		  	})   
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
    	console.log(`SUCCESSFULLY LOGGED IN...`);
    	io.sockets.on("connection", (socket) => {
    		socketConnection.addSocket(req.user.userName, socket);
    		socketConnection.checkConnected();
    		console.log("You have connected");

		 	socket.on('disconnect', function (data) {
		 		socketConnection.removeSocket(req.user.userName, socket);
		 	});

    	});
    	res.send(req.user);
    });
    app.get('/logout', function(req, res) { 
	    req.session.destroy(function(err) { 
	    	console.log(req)
    	db.User.update({online:0}, {
    		where: {
    			userName: req.user.userName
    		}
    	});

    	
        
        res.redirect('/'); 
	    });
	});
    app.get('/userView', isLoggedIn, function(req,res) {
    	currentUser = req.user;
    	db.User.findAll({
		    where: {
		      gender: currentUser.seeking,
		      seeking: currentUser.gender,
		      online: 1
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
