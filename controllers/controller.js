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
  console.log("update req.body ", req.body);
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
    //console.log("line 23", results[0].dataValues);
    var users = [];
    for(var i = 0; i<results.length; i++) {
      if(results[i].dataValues.userName !== currentUser.userName) {
        results[i].dataValues["currentUser"] = currentUser.userName;
        users[i] = results[i].dataValues;

      }
    }
    var handlebarsObject = {
      currentUser: currentUser,
      users: users
    };
    console.log(res);
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
router.get('/#init', (req,res) => {
	console.log('redirect to init');

});

//****************************************************************************************************
//passport create and this needs to be integrated ****************************************************
//****************************************************************************************************
//post route for create user modal. Body is userName, password, gender(m, w), and seeking(m, w)
router.post('/api/create', function (req, res) {
  console.log('New user created: ', req.body)
  let {userName, password, gender, seeking, age, online} = req.body;
  db.sequelize.define(userName, {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
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
    freezeTableName: true,
    timestamps: false
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
  });

  res.status(200).end();
})


//Route to check the swipe database for duplicates 
router.get('/userView/swipe/:username', (req, res)=>{
  db.sequelize.query(`SELECT * FROM ${currentUser.userName};`, (err, res)=> {
    if (err){
      console.log(err);
    }

  }).then(function(result){
    if (Object.keys(result.includes(${userName}))){
      console.log("Swiped Person ", ${userName});
    }
    console.log("Then result ", result[0]);
    //console.log("legible result", res.json({result:result[0]}));
    res.json({result:result[0]});
  });
});

//Route to log swipes to personal DB
router.post('/userView/swipe', (req, res) => {
  console.log(currentUser);
  console.log('body from userview swipe:',req.body);

  db.sequelize.query(`INSERT INTO ${currentUser.userName} (userName, swiped) VALUES ("${req.body.user}", ${req.body.swipe});`).then(() => {
      res.sendStatus(200);
  });
})

//Video Chat Route
router.post('/video', (req, res) => {
  console.log("video post req.body", req.body);

  db.VideoChat.create({
    initiatorId: req.body,
    recId: null,
  }).then(function(result) {
    res.json(result);
  });
});

module.exports = router;
