const express = require("express");
const db = require("../models");
const router = express.Router();
const bCrypt = require('bcrypt-nodejs');


var currentUser = {},
    users = [];

router.get("/", (req, res) => {
    res.render("index", {title: 'Clever Title'}); 
});

router.get(`/:username/video/`, (req, res) => {
  console.log("line 20 controller.js", req.user);
  if(req.user !== null && req.user !==undefined) {
    let currentUser = req.user;
      db.VideoChat.findOne({
        where: {
          recUserName: currentUser.userName
        }
      }).then((results) => {
          console.log(results);
          let vidInfo = results.dataValues;
          res.render("videoChat", { vidInfo });
      })
    } else {
      console.log("19, 33 controller.js: req.user is null")
    }
});

//Get function to bring back the password
router.get("/api/update/:username", function (req, res){
  if(req.user !== undefined && req.user !== null) {
    let currentUser = req.user;
    db.User.findOne({
      where: {
        username: currentUser.userName
      }
    }).then((results)=>{
      res.json(results);
    });
  } else {
    console.log("38, 49 controller.js: req.user = null")
  }
});

//Code that actually updates user data!
router.post('/api/update/', (req,res) => {
  if(req.user !== null && req.user !==undefined) {
    let currentUser = req.user;
    if(req.body !== null && req.body !==undefined) {
      console.log("line 58 req.body", req.body);
      db.User.update(req.body, {
        where:{
          userName: currentUser.userName
        }
      }).then(function () {
        res.sendStatus(200).end(); 
      });
    } else{console.log("57,66 controller.js req.body=null")}
  } else {
    console.log("55, 68 controller.js: req.user=null");
  }
});

//Vytas's route
//Route to check the swipe database for duplicates 
// router.get('/userView/swipe/:username', (req, res)=>{
//   db.sequelize.query(`SELECT * FROM ${currentUser.userName};`, (err, res)=> {
//     if (err){
//       console.log(err);
//     }
//   }).then(function(result){
//     console.log("req console ", req);
//     console.log("Then result ", result[0]);
//     //console.log("legible result", res.json({result:result[0]}));
//     res.json({result:result[0]});
//   });
// });


//Route to log swipes to personal DB


//Route to check the swipe database for duplicates 
router.get('/userView/swipe/:username', (req, res)=>{
  if(req.user !== null && req.user !==undefined) {
    console.log("line 94 controller.js req.params", req.params.username);

    let currentUser = req.user;
    console.log("line 97 controller.js current user: ", req.user.userName);
    db.sequelize.query("SELECT * FROM "+ currentUser.userName, (err, res)=> {
      if (err){
        throw(err);
      }

    }).then(function(result){
      if (Object.keys(result.includes(currentUser.userName))){
        console.log(" line 105 controller.js Swiped Person ", req.params.username);
      } else {console.log("104,106 controller.js Object.keys(result) does not include current user");}
      //console.log("legible result", res.json({result:result[0]}));
      res.sendStatus(200);
    });
  } else {
    console.log('88,106 req.user=null');
  }
});

router.post('/userView/swipe/video/:username', (req,res) => {
  if(req.user !== null && req.user !==undefined) {
    let currentUser = req.user;
    //Update or insert into dynamic user swipe table
    db.sequelize.query("SELECT * FROM " + currentUser.userName + " WHERE userName= " + req.params.username).then((data) => {
      if (!data) {
        db.sequelize.query("INSERT INTO " + currentUser.userName + " (userName, swiped) VALUES (" + req.params.username + ", " + req.params.username +");");
      } else {
        db.sequelize.query('UPDATE ' + currentUser.userName + 'SET swiped= ' + req.params.userName + 'WHERE userName= ' +req.params.username+ ';');
      }

    })
  } else {
    console.log("116,128 controller.js: req.user=null");
  }
  if(req.body.swipe !== null && req.body.swipe !== undefined) {
    console.log("line 131", req.body.swipe)
    //Check for match
    if (req.body.swipe === "true") {
      let currentUser = req.user;
      let selectedUser = req.params.username;
      db.sequelize.query('SELECT * FROM ' + selectedUser + 'WHERE userName= ' + currentUser.userName + ';').then((data) => { 
        console.log("line 137 ", data[0][0]);
        if (data[0][0].swiped === 1) {
          console.log("It's a match!");
          db.VideoChat.create({
            initiatorId: null,
            recId: null,
            initiatorUserName: req.params.username,
            recUserName: currentUser.userName,
          }).then((result) => {
            res.json(result);
          });
        } else {
          res.end();
        }
      });
    } else {
      res.end();
    }
  } else {console.log('128,152 controller.js req.body.swipe = null')}
});
//Video Chat Route
// router.post('/video', (req, res) => {
//   console.log("video post req.body", req.body);

//   db.VideoChat.create({
//     initiatorId: req.body,
//     recId: null,
//   }).then(function(result) {
//     res.json(result);
//   });
// });

module.exports = router;
