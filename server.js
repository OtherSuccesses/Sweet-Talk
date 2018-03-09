//Dependencies
const express  = require('express');
const app      = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
const path = require('path');
const exphbs  = require('express-handlebars');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');


// Configuring MongoDB server
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweet-talk'
mongoose.Promise = Promise;
mongoose
  .connect(MONGODB_URI)
  .then( result => {
    console.log(`Connected to database '${result.connections[0].name}' on ${result.connections[0].host}:${result.connections[0].port}`)
  })
  .catch(err => console.log('There was an error with your connection:', err));

// set up our express application middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set up view engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Configuring MongoDBStore
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'mySessions'
});

store
  .on('error', function(error) {
    assert.ifError(error);
    assert.ok(false);
  });

//Configuring express session
app.use(session({
    secret: '52e0d0v5h5t5r2e0s0s2cvb1j1j2k25u', // session secret
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    unset: 'destroy',
    resave: true,
    saveUninitialized: false,
    store: store
}));

//initializing passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport')(passport);

// routes
require('./app/routes.js')(app, passport, io); // load our routes and pass in our app and fully configured passport

// launch app
const PORT     = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log(`Server listening on localhost:${PORT}`)
});
