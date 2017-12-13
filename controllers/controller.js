const express = require("express");
const db = require("../models");
const router = express.Router();
const bCrypt = require('bcrypt-nodejs');


var currentUser = {},
    users = [];

router.get("/", (req, res) => {
  res.render("index", {title: 'Clever Title'});
});

//Get function to bring back the password
router.get("/api/update/:username", function (req, res){
  db.User.findOne({
    where: {
      username: currentUser.userName
    }
  }).then((results)=>{
      res.json(results);
    });
});

//****************************************************************************************************
//passport get /userView needs to be integrated
//****************************************************************************************************
router.get("/userView", function (req,res) {
  db.User.findAll({
    where: {
      gender: currentUser.seeking,
      seeking: currentUser.gender
      // online: true
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
    // results.map(user => users.push(user.dataValues));
    res.render("userview.handlebars", handlebarsObject);
      // , {users, title: 'User View', currentUser});
  });

});
//****************************************************************************************************
//passport post /login needs to be integrated
//****************************************************************************************************
router.post('/login', function (req, res) {
  let {userName, password} = req.body;
  db.User.findOne({
    where: {
      userName: req.body.userName,
      password: req.body.password
    }
  }).then((result)=>{
      console.log(result);
      if (result.dataValues.userName===req.body.userName && result.dataValues.password===req.body.password) {
        console.log(`${userName} successfully logged in...`);
        // console.log("line 42", JSON.stringify(result.dataValues));
        currentUser = result.dataValues;
        console.log(currentUser);
        // res.sendStatus(200);
        res.redirect('/userView');
    }
  });
});
//route to init page
router.post('/api/create', function (req, res) {
  console.log('New user created: ', req.body)
  let {userName, password, gender, seeking, age, online} = req.body;
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
    db.User.create({
      userName,
      password,
      gender,
      seeking,
      age,
      online
    }).then(function(data) {
      res.redirect('/userView');
    });
  })
});

//Code that actually updates user data!
router.post('/api/update/', (req,res) => {

  console.log('body from post to /api/update', req.body);
  db.User.update(req.body, {
    where:{
      userName: currentUser.userName
    }
  }).then(function () {
    res.sendStatus(200).end(); 
  });
});

//Route to log swipes to personal DB
router.post('/userView/swipe', (req,res) => {
  console.log(currentUser);
  console.log('body from userview swipe:',req.body);

  //Update current users swipe table
  db.sequelize.query(`INSERT INTO ${currentUser.userName} (userName, swiped) VALUES ("${req.body.user}", ${req.body.swipe});`).then(() => {
      res.sendStatus(200);
  });

  //Check for match on right swipe
  if (req.body.swipe === "true") {
    db.sequelize.query(`SELECT * FROM ${req.body.user} WHERE userName='${currentUser.userName}';`).then((data) => { 
      if (data[0][0].swiped === 1) {
        console.log("It's a match!");
        db.VideoChat.create({
          initiatorId: null,
          recId: null,
          initiatorUserName: req.body.user,
          recUserName: currentUser.userName,
        }).then(function(result) {
          res.render("videoChat");
        });
      };
    });
  };
});

//Video Chat Route
router.post('/video', (req, res) => {
  console.log("video post req.body", req.body);

  
});

module.exports = router;
