//==============
//All the routes
//==============
const express = require("express");
const db = require("../models");

let currentUser = {},
    users = [];

module.exports = function (app, db, io) {
//route to index
app.get("/", (req, res) => {
  res.render("index", {title: 'Sweet Talk'});
});
// //Unused code for future video
// app.get(`/:username/video/`, (req, res) => {
//     db.VideoChat.findOne({
//       where: {
//         recUserName: currentUser.userName
//       }
//     }).then((results) => {
//       let vidInfo = results.dataValues;
//       res.render("videoChat", { vidInfo });
//     });
// });

//Get function to bring back the password
app.get("/api/update/:username", function (req, res){

  db.User.findOne({
    where: {
      username: currentUser.userName
    }
  }).then((results)=>{
      res.json(results);
  });
});

//Code that actually updates user data!
app.post('/api/update/', (req,res) => {
  db.User.update(req.body, {
    where:{
      userName: currentUser.userName
    }
  }).then(function () {
    res.sendStatus(200).end(); 
  });
});
//When the user swipes this function will update their personal table with that information
app.post('/userView/swipe', (req,res) => {
  console.log('req.body',req.body);

  //Update or insert into dynamic user swipe table
  db.sequelize.query(`SELECT * FROM ${currentUser.userName} WHERE userName='${req.body.user}'`).then((data) => {
    if (data[0].length === 0) {
      db.sequelize.query(`INSERT INTO ${currentUser.userName} (userName, swiped) VALUES ("${req.body.user}", ${req.body.swipe});`)

      
    } else {
      db.sequelize.query(`UPDATE ${currentUser.userName} SET swiped=${req.body.swipe} WHERE userName='${req.body.user}';`)
      
    }
  });


  //Check for match
  if (req.body.swipe === "true") {
    db.sequelize.query(`SELECT * FROM ${req.body.user} WHERE userName='${currentUser.userName}';`).then((data) => { 
      if (typeof data[0][0] !== 'undefined') {
        if (data[0][0].swiped === 1) {
          console.log("It's a match!");
          //creating a video chat table, not functioning at the moment
          db.VideoChat.create({
            initiatorId: null,
            recId: null,
            initiatorUserName: req.body.user,
            recUserName: currentUser.userName,
          }).then((result) => {
            res.json(result);
          })
        } else {
          res.end();
        }
      }

    });

  };
});
    
//When a user signs up, we create a row in the user table and make a table for the users swipes
app.post('/create', function(req, res) {
    console.log('api/create called')
    let {userName, password, gender, seeking, age, bio, img} = req.body;
    console.log('User from /create:', userName);

    let data ={
        userName,
        password,
        age,
        seeking,
        img,
        bio,
        gender
    };

    db.User.create(data)

    db.sequelize.define(userName, {
        id: {
          type: db.Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        userName: {
            type: db.Sequelize.STRING,
            allowNull: false,
            validate:{
                isAlphanumeric: true
            }
        },
        swiped: {
            type: db.Sequelize.BOOLEAN,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    db.sequelize.sync().then(() => {
        res.end();
    });
 
});
//When the user logs on this checks the password against the password in the database.
app.post('/login',function (req, res) { 
    console.log('user from /login', req.body)
    
    db.User.findOne({
        where: {
            userName: req.body.userName
        }
    }).then((result)=>{
        console.log('result from db find one:',result)
        let password = result.dataValues.password;
        if (req.body.password===password) {
            currentUser = result.dataValues;
            console.log(`successfully logged in...`);
            res.sendStatus(200);
        } else {
            res.sendStatus(404); 
        }
    })
    

});
//When the user logs out, the page will redirect to the index
app.get('/logout', function(req, res) { 
    socket.disconnect();
    res.redirect('/'); 
});

    // app.get('/getSocket/:userName', function (req,res) {
    //   let connected = socketConnection.getObj();
    //   console.log('Firing after getObj:', req.params.userName)
    //   let userSocket = connected[req.params.userName];
    //   console.log('connected obj:', connected);
    //   console.log('userSocket from backend:', userSocket);
    //   res.send(userSocket)
    // });

//When the user logs in, they get this view.
app.get('/userView', function(req,res) {
    console.log('current user from userview',currentUser)
    var users = [];
    db.sequelize.query(`SELECT userName, seeking, bio, img, gender FROM users INNER JOIN sockets ON user = userName;`).done((results)=>{
      console.log("results from /userview db query", results);
      // check for gender compatible users
      for(var i = 0; i < results[0].length; i++) {
        console.log('firing inside for loop')
        console.log('gender',results[0][i].gender);
        console.log('seeking',currentUser.seeking);
        console.log('seeking',results[0][i].seeking);
        console.log('gender',currentUser.gender);
        if(results[0][i].gender === currentUser.seeking && results[0][i].seeking === currentUser.gender) {
            console.log('firing inside results from for loop', results[0][i]);
          users.push(results[0][i]);
        }
      }
      console.log('users from /userview:',users)
        var handlebarsObject = {
          currentUser: currentUser,
          users: users,
          title: currentUser.userName
        };
        res.render("userview", handlebarsObject);
    });
});
//this route sends the user info to whatever calls it.
app.get('/getUser', (req,res)=>{
    res.send(currentUser.userName);
})

io.sockets.on("connection", (socket) => {

    console.log('currentUser.userName from before query:',currentUser.userName)

    db.sequelize.query(`SELECT user FROM sockets WHERE user='${currentUser.userName}';`)
    .done((res)=>{
      console.log("res from db socket connection query", res);
      if (res[0] === []) {
        db.sequelize.query(`INSERT INTO sockets (user, socketId) VALUES ('${currentUser.userName}', '${socket.id}');`);
      } else {
        db.sequelize.query(`DELETE FROM sockets WHERE user='${currentUser.userName}';`).done((res) =>{
          console.log('Delete from sockets', res);
          db.sequelize.query(`INSERT INTO sockets (user, socketId) VALUES ('${currentUser.userName}', '${socket.id}');`);
        });
      }
    });

    socket.on('send message', function (message) {
      console.log('message from send message',message)
        db.sequelize.query(`SELECT socketId FROM sockets WHERE user="${message.to}";`)    
      .done((res) =>{
        console.log('res from query:',res)
        socket.to(res[0][0].socketId).emit('private message',message);
      });
    });

    socket.on('disconnect', function(){
      console.log('user disconnected: ', currentUser.userName);
      db.sequelize.query(`DELETE FROM sockets WHERE user='${currentUser.userName}';`).done((res) =>{
        console.log('Delete from sockets', res)
      });
    });

    db.sequelize.query(`SELECT userName, seeking, bio, img, gender FROM users INNER JOIN sockets ON user = userName;`).done((res) => {
      socket.emit('logins', res);
    });

    socket.on('swipe right', function (data) {
        console.log('data from swipe right socket listener:',data)
        let user = data.user
        db.sequelize.query(`SELECT * FROM ${user} WHERE userName='${currentUser.userName}';`).then((data) => { 
            if (typeof data[0][0] !== 'undefined') {
                if (data[0][0].swiped === 1) {
                    db.sequelize.query(`SELECT socketId FROM sockets WHERE user="${message.to}";`)      
                    .done((res) =>{
                        console.log('res from query:',res)
                        socket.to(res[0][0].socketId).emit('add chat user',user);
                    });
                } 
            }
        });
    });

});//end of socket connection code


}//end of export obj  



