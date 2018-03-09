const User = require('../app/models/user')
const Swipe = require('../app/models/swipe')
const socketObj = require('../config/socketObj')
const db = require('../app/models/')
let currentUser = 'no user connected';
let online = socketObj.getAllConnections();

module.exports = function(app, passport, io) {

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index');
    });


// =============================================================================
// AUTHENTICATION ROUTES =======================================================
// =============================================================================
        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/userView', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/userView', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // LOGOUT ==============================
        app.get('/logout', function(req, res) {
          req.logout();
          req.session.destroy(function (err) {
            if (!err) {
                res.status(200).clearCookie('connect.sid', {path: '/'}).redirect('/');
            } else {
                console.log('Error from session destroy:', err)
            }
          });
        });

// =============================================================================
// USERVIEW ROUTES =============================================================
// =============================================================================
      app.get('/userView', isLoggedIn, function (req,res){
        currentUser = req.user;
        User
          .findOne({username: req.user.username})
          .populate('matches')
          .populate('rightSwipes')
          .populate('leftSwipes')
          .then(currentUser => {
            //return all users that match the user's gender and seeking preference
            User
            .find({gender: req.user.seeking, seeking: req.user.gender})
            .then(result => {
              //filter out the user, if it is a same sex preference
              let users = result.filter(user => {
                return  user.username !== req.user.username
              })

              //iterate through all the users, and check if the user has swiped right on them before.
              //if so, remove the user
              users.forEach((user,i) => {
               currentUser.rightSwipes.forEach(match => {
                 if (JSON.stringify(user._id)===JSON.stringify(match._id)){
                   users.splice(users[i],1)
                 }
               })
              });

              //iterate through all the users, and check if the user has swiped left on them before.
              //if so, remove the user
              users.forEach((user,i) => {
               currentUser.leftSwipes.forEach(match => {
                 if (JSON.stringify(user._id)===JSON.stringify(match._id)){
                   users.splice(users[i],1)
                 }
               })
              });

              //check matches to see who is currently online.  If they are online,
              //send them to front end to populate chat window
              let connections = []
              connections = currentUser.matches.map((match, i) => {
                if (typeof online[match.username] !== 'undefined'){
                  return match;
                }
              })
              let hbsObj = {
                currentUser: currentUser,
                users: users,
                connections: connections
              }
              res.render('userView', hbsObj)
            })
            .catch(err => res.json(err));
          })
          .catch(err => console.log(err));
      });

      app.post('/updateUser', function (req, res){
        console.log('+++++++++++++++++++++++++++++', req.isAuthenticated());
        User
          .findOneAndUpdate({username: req.user.username}, {$set:req.body})
          .then(result => res.sendStatus(200))
          .catch(err => res.json(err));
      });

      app.post('/swipe', function (req,res){
        //A = current user ID;
        let userA = req.user._id
        //B = user who was swiped on ID
        let userB = req.body.userId;
        let swipe = req.body.swipe
        //create new swipe
        let newSwipe = new Swipe({
        swiper: userA,
        swipee: userB,
        swipe: swipe
        });
        Swipe
          .create(newSwipe)
          .then(result => {
            //if swipe was true, check if userB has swiped on userA
            if (swipe) {
              Swipe
                .findOne({swiper: userB, swipee: userA})
                .then(swipeDoc => {
                  //if swipe document exists, and if swipe was true, then update userA and userB's match array
                  //and add userB to rightSwipes
                  if (swipeDoc){
                    if (swipeDoc.swipe) {
                      User
                        .findOneAndUpdate({_id: userA}, {$push:{rightSwipes: userB, matches: userB}})
                        .then( result => {
                          User
                            .findOneAndUpdate({_id: userB}, {$push:{matches: userA}})
                            .then(matchedUser =>{
                              //then send the new match to the front end
                              res.json({match: matchedUser});
                            })
                            .catch(err=> res.json(err));
                        })
                        .catch(err=> res.json(err));
                    }
                  } else {
                    //if userB hasn't swiped on userA, just push userB into rightSwipes
                    User
                      .findOneAndUpdate({_id: userA}, {$push:{rightSwipes: userB}})
                      .then( result =>{
                        res.json(result)
                      })
                      .catch(err=> res.json(err));
                  }
                })
                .catch(err=> res.json(err));
            } else {
              //if swipe was false, add userB to leftSwipes
              User
                .findOneAndUpdate({_id: userA}, {$push:{leftSwipes: userB}})
                .then( result => {
                  res.json(result)
                })
                .catch(err => res.json(err));
            }
          })
          .catch(err => res.json(err))

      })//end of post to /swipe

      app.get('/getUser', function (req,res){
        //keep this console log, trying to debug why sometimes user doesn't get sent
        console.log('req.user from /getUser',req.user)
        res.json(req.user)
      })

          io.on('connection', function (socket) {
            let username = currentUser.username;
            let matches = '';
            let connectedUsers = socketObj.getAllConnections();
            socketObj.addConnection(username, socket.id, function(){
              console.log('Connection added', connectedUsers)
              //when a user connects, get all their matches, loop through and checked
              //if they are online.  If they are, emit current user's name to them so they
              //can update their chat list
              User
                .findOne({username: username})
                .populate('matches')
                .then(user => {
                  matches = user.matches
                  matches.forEach(match => {
                    let socketId = socketObj.getOneConnection(match.username)
                    if (typeof socketId !== 'undefined'){
                      socket.broadcast.to(socketId).emit('add match', username)
                    }
                  });
                })
                .catch(err => console.log(err));
            });//end of addConnection



            socket.on('new message', function (message) {
              let socketId = socketObj.getOneConnection(message.to)
              socket.broadcast.to(socketId).emit('private message', message);
            });



            socket.on('disconnect', function(){
              socketObj.deleteConnection(username, function(){
                console.log('Connection removed')
                //when currentUser's connection is severed,
                //check to see if their matches are online, and if they are emit to them
                //so they can update their chat list
                matches.forEach(match => {
                  let socketId = socketObj.getOneConnection(match.username)
                  if (typeof socketId !== 'undefined'){
                    socket.broadcast.to(socketId).emit('delete match', username)
                  }
                });
              });//end of deleteConnection
            });//end of socket disconnect

          });//end of socket on connection

};//end of module.exports


// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
