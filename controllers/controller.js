const express = require("express");
const db = require("../models");
const router = express.Router();

//DUMMY DATA FOR TESTING RENDERING USERS IN userView
let dummyUserArr = [
  {
    userName: 'Dummy User1',
    img: 'https://www.fillmurray.com/300/300',
    bio: 'I like corn.  Corn is life.'
  },
  {
    userName: 'Dummy User2',
    img: 'https://www.fillmurray.com/300/300',
    bio: 'I like corn.  Corn is life.'
  },
  {
    userName: 'Dummy User3',
    img: 'https://www.fillmurray.com/300/300',
    bio: 'I like corn.  Corn is life.'
  },
  {
    userName: 'Dummy User4',
    img: 'https://www.fillmurray.com/300/300',
    bio: 'I like corn.  Corn is life.'
  }
];

router.get("/", (req, res) => {
  res.render("index", {title: 'Clever Title'});
});

router.get("/userView", (req,res) => {
  //userview is populating properly with dummy data
  console.log('firing')
	res.render("userView", {users: dummyUserArr, title: 'User View'});
});

//route to init page
router.get('/#init', (req,res) => {
	console.log('redirect to init');

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

      res.sendStatus(200);
      // res.redirect('/userView');

    }
  });   
});

//post route for create user modal. Body is userName, password, gender(m, w), and seeking(m, w)
router.post('/api/create', function (req, res) {
	console.log('new user: ', req.body)
    let {userName, password, gender, seeking, age, online} = req.body;
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
});

router.post('/userView/swipe', (req,res) => {
  console.log('body from userview swipe:',req.body);
  res.sendStatus(200);
})

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
