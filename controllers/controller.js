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
// app.get("/api/update/:username", function (req, res){
//   db.User.findOne({
//     where: {
//       username: currentUser.userName
//     }
//   }).then((results)=>{
//     console.log('results from update findOne:', results);
//     res.json(results);
//   });
// });

app.get("/api/dataCount", function(req, res){
  db.User.count()
  .then(function(results){
    res.json(results);
  });
});

//Code that actually updates user data!
app.post('/api/update/', (req,res) => {
    console.log('req.body from update:',req.body)
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
   
    db.User.findOne({
        where: {
            userName: req.body.userName
        }
    }).then((result)=>{
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
      // socket.disconnect();
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
  var users = [];
  var connections = [];
  db.User.findOne({
    where: {
        userName: currentUser.userName
    }
  }).done((foundUser)=>{
    console.log('foundUser:', foundUser.dataValues);
    currentUser = foundUser.dataValues
  })
  // db.sequelize.query(`SELECT userName, swiped FROM sockets, ${currentUser.userName} INNER JOIN sockets ON user = userName;`).done((swipes)=>{
  //   console.log('Swipes from inner join',swipes);

  //   for (var i = 0; i<swipes[0].length; i++) {
  //     if (typeof swipes[0][i].swiped!=='undefined') {
  //       db.sequelize.query(`SELECT * FROM users WHERE userName = "${swipes[0][i].userName}"`).done((newUser)=>{
  //         console.log('newUser from select *: ',newUser[0]);
  //         for (var j = 0; j<newUser[0][j].length; j++){
  //           users.push(newUser[0][j]);
  //         }
  //       });
  //     } else {
  //        db.sequelize.query(`SELECT * FROM ${swipes[0][i].userName} WHERE userName = "${currentUser.userName}"`).done((connected)=>{
  //         console.log('connected from select *: ',connected);
  //         if (connected.swiped = 1){
  //           connections.push(swipes[0][i].userName);
  //         }
  //       });
  //     }//end of if/else statement
  //   }//end of for loop
  //   console.log('users from /userview:',users)

db.User.findAll({
    where: {
        gender: currentUser.seeking,
        seeking: currentUser.gender

    }
}).done((results)=>{
    for (var i = 0; i<results.length; i++) {
      console.log(results[i].dataValues);
        if(currentUser !== result[i].dataValues) {
            users.push(results[i].dataValues);
        }
    }
    db.sequelize.query(`SELECT userName FROM ${currentUser.userName} WHERE swiped = "1";`).done((data)=>{
        console.log(data);
        for (j = 0; j<data[0].length; j++) {
            console.log('asdfasdfasdfasdfasdfdsfa:',data[0][j]);
            if(currentUser.userName !== data[0][j].userName) {
              connections.push(data[0][j].userName);
            }
        }


      console.log('connections from before handlebarsObject:', connections)
      var handlebarsObject = {
       currentUser: currentUser,
       connections: connections,
       users: users,
       title: currentUser.userName
     };
     console.log('=========================================================')
     console.log('=========================================================')
     console.log('=========================================================')
     console.log('handlebarsObject:',handlebarsObject)
     console.log('=========================================================')
     console.log('=========================================================')
     console.log('=========================================================')
     res.render("userview", handlebarsObject);
    });

})
    


      // for (let j = 0; j<result.length; j++) {
      //   db.sequelize.query(`SELECT swiped FROM ${result[j].userName} WHERE userName = "${currentUser.userName}";`).done((response)=>{
      //     console.log('response from swiped values from other user:', response);
      //   });
      // }

     






  // });//end of swipes query


});//end of route listener


app.get('/getUser', (req,res)=>{
    res.send(currentUser.userName);
})

io.sockets.on("connection", (socket) => {

    db.sequelize.query(`SELECT userName, seeking, bio, img, gender FROM Users INNER JOIN sockets ON user = userName;`).done((data) => {
      socket.emit('logins', data); 
    });

    db.sequelize.query(`SELECT user FROM sockets WHERE user='${currentUser.userName}';`)
    .done((res)=>{
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
        db.sequelize.query(`SELECT socketId FROM sockets WHERE user="${message.to}";`)    
      .done((res) =>{
        socket.to(res[0][0].socketId).emit('private message',message);
      });
    });

    socket.on('disconnect', function(){
      console.log('user disconnected: ', currentUser.userName);
      db.sequelize.query(`DELETE FROM sockets WHERE user='${currentUser.userName}';`).done((res) =>{
        console.log('Delete from sockets', res)
      });
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



