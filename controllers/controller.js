const express = require("express");
const db = require("../models");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {title: 'Clever Title'});
});
router.get("/userView", (req,res) => {
	res.render("userView", {title: 'User Page'});
})
//post route for login modal. Body is username and password
router.post('/login', function (req, res) {
	console.log(req.body);
    res.redirect('/userView');
});

//post route for create user modal. Body is username, password, gender(man, woman), and seeking(man, woman)
router.post('/api/create', function (req, res) {
	console.log('new user: ', req.body)
    res.status(200).end();
});

//post route for login modal. Body is username and password
router.post('/login', function (req, res) {
	console.log(req.body);
    res.status(200).end();
});

//post route for create user modal. Body is username, password, gender(man, woman), and seeking(man, woman)
router.post('/api/create', function (req, res) {
	console.log('new user: ', req.body)
  res.status(200).end();
});

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

  db.VideoChat.update({
    recId: req.body,
  }, {
    where: {
      id:
    }
  })
});

module.exports = router;
