const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/login', function (req, res) {
	console.log(req.body);
    res.status(200).end();
});

app.get('/userview', function (req, res) {
	console.log('get request firing')
    res.render('userview');
});

app.listen(PORT, ()=>{
	console.log(`App listening on http://localhost:${PORT}`)
})