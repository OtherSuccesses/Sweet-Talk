var exports = module.exports = {}
 
exports.signup = function(req, res) {
	console.log('New user created: ', req.body)
  	let {userName, password, gender, seeking, age, online} = req.body;
  	db.sequelize.define(userName, {
	    id: {
	        type: db.Sequelize.INTEGER,
	        primaryKey: true,
	        autoIncrement: true,
	    },
	    userName: {
	        type: db.Sequelize.STRING,
	        allowNull: false,
	        primaryKey: true,
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
	    timestamps: false
	});
    db.sequelize.sync().then(() => {
	    db.User.create({
		    userName,
		    password,
		    gender,
		    seeking,
		    age,
		    online
	    }).then(function(data) {
	        res.sendStatus(200);
	    });
    })
};

exports.signin = function(req, res) {
 	let {userName, password} = req.body;
    db.User.findOne({
    	where: {
        	userName: req.body.userName,
        	password: req.body.password
    	}
    }).then((result)=>{
      	if (result.dataValues.userName===req.body.userName && result.dataValues.password===req.body.password) {
	        console.log(`${userName} successfully logged in...`);
	        // console.log("line 42", JSON.stringify(result.dataValues));
	        currentUser = result.dataValues;
	        console.log(currentUser);
	        // res.sendStatus(200);
	        // res.redirect('/userView');
    	}
    });
    // res.render('index', {title: 'index'});
}
// exports.userView = function(req,res) {
// 	res.render('userView', {title: 'userView'});
// }
exports.logout = function(req, res) { 
    req.session.destroy(function(err) { 
        res.redirect('/'); 
    }); 
}