const express = require("express");
const db = require("../models");
const router = express.Router();
let currentUser = {},
    users = [];

router.get("/", (req, res) => {
  res.render("index", {title: 'Clever Title'});
});

router.get("/userView", (req,res) => {
  //userview is populating properly with dummy data
  db.User.findAll({
    where: {
      gender: currentUser.seeking,
      seeking: currentUser.gender
      // online: true
    }
  }).then((results)=>{
    console.log(results);
    results.map(user => users.push(user.dataValues))
    console.log(users);
  });
	res.render("userView", {users, title: 'User View', currentUser});
});

//route to init page
router.get('/#init', (req,res) => {
	console.log('redirect to init');
});

router.get('/api/update/:userName', (req,res) => {
  console.log('username from profile submit:',req.params.userName);
  if (req.params.userName===currentUser.userName){
    res.json(currentUser);
  } else {
    res.status(404).end();
  }

});

//post route for login modal. Body is username and password
router.post('/login', function (req, res) {
  let {userName, password} = req.body;

  db.User.findOne({
    where: {
      userName,
      password
    }
  }).then((result)=>{
    if (result.userName===userName && result.password===password) {
      console.log(`${userName} successfully logged in...`);
      currentUser = result.dataValues;
      res.sendStatus(200);
      // res.redirect('/userView');
    }
  });
});

//post route for create user modal. Body is userName, password, gender(m, w), and seeking(m, w)
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
      res.redirect('/');
    });
  })
});

router.post('/api/update', (req,res) => {
  console.log('body from post to /api/update',req.body);
  //
  // TODO: write sequelize statement to update user with info from req.body
  //
  res.status(200).end();
})

router.post('/userView/swipe', (req,res) => {
  console.log('body from userview swipe:',req.body);
  //
  // TODO: write sequelize statement to update user with info from req.body
  //
  res.sendStatus(200);
})

router.post('/video', (req, res) => {
  console.log("Initiator ID", req.body);

  db.VideoChat.create({
    initiatorId: req.body,
    recId: null,
  }).then(function(result) {
    res.json(result);
  });
});

router.put('/video', (req, res) => {
  console.log("Recipient ID", req.body);
});

module.exports = router;
