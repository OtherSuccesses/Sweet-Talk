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
	res.render("userView", {users: dummyUserArr, title: 'User View'});
});

//post route for login modal. Body is username and password
router.post('/login', function (req, res) {

  //not quite working.  For some reason, it will still find the person
  //even if the password is wrong. 
  db.User.findOne({
    where: {
      userName: req.body.userName,
      password: req.body.password
    }
  }).then((result)=>{
    console.log('res from post to /login',result);
    res.send(200);
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
