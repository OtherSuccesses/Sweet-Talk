const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
var favicon = require("serve-favicon");
const routes = require("./controllers/controller.js");
const db = require("./models");
const passport = require('passport');
const session = require('express-session');
const env = require('dotenv').load();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized:true})); //sessions secret
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const authRoute = require('./routes/auth.js')(app, passport);
require('./config/passport/passport.js')(passport, db.user, db);

app.use("/", routes);


db.sequelize.sync().then(function () {
	app.listen(PORT, () => {
	  console.log(`Listening on PORT ${PORT}`);
	});
});
