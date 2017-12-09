const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {title: 'Clever Title'});
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

module.exports = router;
