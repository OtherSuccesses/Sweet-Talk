//==============
//All the routes
//==============
const db = require("../models");

let currentUser = {},
    users = [];

module.exports = function (app, db, io) {
  //=================================================
  //Creates socket connection and listens for events
  //=================================================
  function createConnection() {
    io.sockets.on("connection", (socket) => {
      // db.sequelize.query(`SELECT socketId FROM sockets WHERE socketId='${socket.id}';`).done((result) => {
        // if (result[0] === []) {
          //Checks for users with active socket connections
          db.sequelize.query(`SELECT userName, seeking, bio, img, gender FROM Users INNER JOIN sockets ON user = userName;`)
          .done((data) => {
            console.log("\n=====> DONE CHECKING FOR USERS WITH ACTIVE SOCKETS AND EMITING THOSE USERS TO FRONT END createConnection()\n")
            socket.emit('logins', data[0]); 
          });

          //Checks if current user has a socket open
          db.sequelize.query(`SELECT user FROM sockets WHERE user='${currentUser.userName}';`).done((res) => {
            if (res[0] === []) {
              db.sequelize.query(`INSERT INTO sockets (user, socketId) VALUES ('${currentUser.userName}', '${socket.id}');`).done(() => {
                currentUser.socketId = socket.id;
                console.log(`\n=====> DONE INSERTING ${currentUser.userName} SOCKET ID ${socket.id} INTO TABLE createConnection()\n`);
              });
            } else {
              db.sequelize.query(`DELETE FROM sockets WHERE user='${currentUser.userName}';`).done(() => {
                console.log(`\n=====> DELETING ${currentUser.userName} LEFTOVER SOCKET ID FROM DB createConnection()\n`)
                db.sequelize.query(`INSERT INTO sockets (user, socketId) VALUES ('${currentUser.userName}', '${socket.id}');`).done(() => {
                  currentUser.socketId = socket.id;
                  console.log(`\n=====> DONE INSERTING ${currentUser.userName} SOCKET ID ${socket.id} INTO TABLE createConnection()\n`);
                });
              });
            }
          });

          socket.on('send message', function (message) {
            db.sequelize.query(`SELECT socketId FROM sockets WHERE user="${message.to}";`).done((res) =>{
              console.log(`\n=====> SOCKET.ON 'SEND MESSAGE': FOUND SOCKET ID AND SENDING PRIVATE MESSAGE ${message} TO ${message.to} AT SOCKET ID ${res[0][0].socketId} createConnection()\n`);
              socket.to(res[0][0].socketId).emit('private message', message);
            });
          });

          socket.on('disconnect', function(){
            db.sequelize.query(`DELETE FROM sockets WHERE user='${currentUser.userName}';`).done((res) =>{
              console.log(`\n=====> SOCKET.ON 'DISCONNECT': DELETED ${currentUser.userName}'S ROW FROM SOCKETS TABLE createConnection()\n`);
            });
          });


          socket.on('swipe right', function (data) {
            let potentialMatch = data.user;
            console.log(`\n=====> SOCKET.ON SWIPE RIGHT: ${currentUser.userName} HAS SWIPED RIGHT ON ${potentialMatch} createConnection()\n`);
            db.sequelize.query(`SELECT * FROM ${potentialMatch} WHERE userName='${currentUser.userName}';`).done((res1) => {
              console.log(`\n=====> SOCKET.ON SWIPE RIGHT: CHECKING IF ${potentialMatch} HAS ALSO SWIPED RIGHT createConnection()\n`);
              //Check if current is in potential's db
              if (res1[0][0] !== []) {
                //Check if potential swiped right on current
                if (res1[0][0].swiped === 1) {
                  console.log(`\n=====> SOCKET.ON SWIPE RIGHT: ${currentUser.userName} AND ${potentialMatch} HAVE MATCHED! createConnection()\n`);
                  //Get potential's socket ID
                  db.sequelize.query(`SELECT socketId FROM sockets WHERE user="${potentialMatch}";`).done((res2) => {
                    console.log(`\n=====> CHECKING IF ${potentialMatch} HAS A SOCKET CONNECTION AND ADDING TO CHAT ACCORDION IF ONLINE createConnection()\n`);
                    //Emit current's username to potential's front end if they're online
                    console.log("res2", res2);
                    // socket.to(res2[0][0].socketId).emit('add chat user', currentUser.userName);
                  });
                }
              } 
            });
          });
        // }
      // })
    });//end of socket connection code
  }
                
  //=================================================
  //Loads homepage
  //=================================================
  app.get("/", (req, res) => {
    res.render("index", {title: 'Sweet Talk'});
  });
     
  //=============================================================================================    
  //When a user signs up, we create a row in the user table and make a table for the users swipes
  //=============================================================================================
  app.post('/create', function(req, res) {
    let {userName, password, gender, seeking, age, bio, img} = req.body;

    let data = {
      userName,
      password,
      age,
      seeking,
      img,
      bio,
      gender
    };

    db.User.create(data);

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
          validate: {
              isAlphanumeric: true
          }
      },
      swiped: {
          type: db.Sequelize.BOOLEAN,
          allowNull: false
      }
    },{
      freezeTableName: true,
      timestamps: false,
    });

    db.sequelize.sync().then(() => {
      res.end();
    });
  });

  //====================================================================================
  //When the user logs on this checks the password against the password in the database.
  //====================================================================================
  app.post('/login',function (req, res) { 
    db.User.findOne({
      where: {
        userName: req.body.userName
      }
    }).then((result)=>{
      let password = result.dataValues.password;
      if (req.body.password === password) {
        currentUser = result.dataValues;
        res.sendStatus(200);
      } else {
        res.sendStatus(404); 
      }
    });
  });

  //====================================================
  //Sends userName back to script in userview.handlebars
  //====================================================
  app.get('/getUser', (req,res)=>{
    res.send(currentUser.userName);
  });

  //==========================================
  //When the user logs in, they get this view.
  //==========================================
  app.get('/userView', function(req, res) {
    var potentialMatches = [];
    var connections = [];
    var handlebarsObject = {};

    db.User.findAll({
      where: {
        gender: currentUser.seeking,
        seeking: currentUser.gender
      }
    }).done((results) => {
      for (var i = 0; i<results.length; i++) {
        potentialMatches.push(results[i].dataValues);
      }
      db.sequelize.query(`SELECT userName FROM ${currentUser.userName} WHERE swiped = "1";`).done((data)=>{
        for (j = 0; j<data[0].length; j++) {
          connections.push(data[0][j].userName);
        }
        handlebarsObject = {
          currentUser: currentUser,
          connections: connections,
          users: potentialMatches,
          title: currentUser.userName
        };
        res.render("userview", handlebarsObject);
        createConnection();
      });
    });
  });//end of route listener

  //=========================================================================================
  //When the user swipes this function will update their personal table with that information
  //=========================================================================================
  app.post('/userView/swipe', (req,res) => {

    //Update or insert into dynamic user swipe table
    db.sequelize.query(`SELECT * FROM ${currentUser.userName} WHERE userName='${req.body.user}'`).then((data) => {
      if (data[0].length === 0) {
        db.sequelize.query(`INSERT INTO ${currentUser.userName} (userName, swiped) VALUES ("${req.body.user}", ${req.body.swipe});`);
        res.end();
      } else {
        db.sequelize.query(`UPDATE ${currentUser.userName} SET swiped=${req.body.swipe} WHERE userName='${req.body.user}';`);
        res.end();   
      }
    });
  });

  //=================================================
  //Updates user data
  //=================================================
  app.post('/api/update/', (req,res) => {
    db.User.update(req.body, {
      where:{
        userName: currentUser.userName
      }
    }).then(function () {
      res.sendStatus(200).end(); 
    });
  });

  //=================================================
  //Counts dummy users
  //=================================================
  app.get("/api/dataCount", function(req, res){
    db.User.count()
    .then(function(results){
      res.json(results);
    });
  });

  //===========================================================
  //When the user logs out, the page will redirect to the index
  //===========================================================
  app.get('/logout', function(req, res) { 
    // socket.disconnect();
    res.redirect('/'); 
  });
}



























        // for (let j = 0; j<result.length; j++) {
        //   db.sequelize.query(`SELECT swiped FROM ${result[j].userName} WHERE userName = "${currentUser.userName}";`).done((response)=>{
        //     console.log('response from swiped values from other user:', response);
        //   });
        // }
    // });//end of swipes query

    // app.get('/getSocket/:userName', function (req,res) {
    //   let connected = socketConnection.getObj();
    //   console.log('Firing after getObj:', req.params.userName)
    //   let userSocket = connected[req.params.userName];
    //   console.log('connected obj:', connected);
    //   console.log('userSocket from backend:', userSocket);
    //   res.send(userSocket)
    // });  



