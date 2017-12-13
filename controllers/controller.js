const express = require("express");
const db = require("../models");
const router = express.Router();
const bCrypt = require('bcrypt-nodejs');


var currentUser = {},
    users = [];

router.get("/", (req, res) => {
  res.render("index", {title: 'Clever Title'});
});

//route to init page
router.get('/#init', (req,res) => {
	console.log('redirect to init');

});

//Code that actually updates user data!
router.post('/api/update/', (req,res) => {
  console.log('body from post to /api/update',req.body);
  db.User.update(req.body, {
    where:{
      userName: currentUser.userName
    }
  });

  res.status(200).end();
})

//Route to log swipes to personal DB
router.post('/userView/swipe', (req,res) => {
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
