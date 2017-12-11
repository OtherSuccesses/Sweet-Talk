const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
var favicon = require("serve-favicon");
const routes = require("./controllers/controller.js");
const db = require("./models");



const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
