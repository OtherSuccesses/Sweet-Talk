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
      db.VideoChat.findOne({
      where: {
        recUserName: currentUser.userName
      }
    }).then((results) => {
      let vidInfo = results.dataValues;
      res.render("videoChat", { vidInfo });
    })
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

//Code that actually updates user data!
router.post('/api/update/', (req,res) => {
  db.User.update(req.body, {
    where:{
      userName: currentUser.userName
    }
  }).then(function () {
    res.sendStatus(200).end(); 
  });
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
router.post('/userView/swipe', (req,res) => {
  //Update or insert into dynamic user swipe table
  db.sequelize.query(`SELECT * FROM ${currentUser.userName} WHERE userName='${req.body.user}'`).then((data) => {
    if (data[0].length === 0) {
      db.sequelize.query(`INSERT INTO ${currentUser.userName} (userName, swiped) VALUES ("${req.body.user}", ${req.body.swipe});`);
    } else {
      db.sequelize.query(`UPDATE ${currentUser.userName} SET swiped=${req.body.swipe} WHERE userName='${req.body.user}';`);
    }
  });

  //Check for match
  if (req.body.swipe === "true") {
    db.sequelize.query(`SELECT * FROM ${req.body.user} WHERE userName='${currentUser.userName}';`).then((data) => { 
      if (data[0][0].swiped === 1) {
        console.log("It's a match!");
        db.VideoChat.create({
          initiatorId: null,
          recId: null,
          initiatorUserName: req.body.user,
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
