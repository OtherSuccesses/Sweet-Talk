
const LocalStrategy    = require('passport-local').Strategy;
const User = require('../app/models/user');
const db = require('../app/models/')


module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        db.User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, username,password, done) {
        process.nextTick(function() {
            db.User
              .findOne({ 'username' :  req.body.username })
              .then(user => {
                if (!user){
                  return done(null, false, req.flash('loginMessage', 'No user found.'));
                } else if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                } else {
                  return done(null,user)
                }
              })
              .catch(err=>console.log(err));
        });
    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, username, password,done) {
        process.nextTick(function() {

            if (!req.user) {
                db.User
                  .findOne({ 'username' :  req.body.username })
                  .then( result => {
                    if (result) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                      let newUser = new User(req.body);
                      newUser.password = newUser.generateHash(req.body.password);
                      if (newUser.img === '') {
                        newUser.img = newUser.gender === 'm' ? '/img/default_man.jpg' : '/img/default_woman.jpg';
                      }

                      db.User
                        .create(newUser)
                        .then(user => done(null,user))
                        .catch(err => done(err));
                    }
                  })
                  .catch(err=>console.log(err));

        }//end if statement
      });//end process.nextTick
    }));//end passport.use
};//end module.exports
