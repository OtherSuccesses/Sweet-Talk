module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        //We don't need a timestamp as sequelize will start with one
        userName: {
            type: DataType.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                len: [8,25]
            }
        },
        online: {
            type: DataType.BOOLEAN,
            allowNull: false,
        
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                len: [8, 30]
            }
        },
        gender: {
            type: DataType.STRING,
            allowNull:false,
            validate: {
                len: [1, 1]
                //Will come from a radio or dropdown list, whatevs example outcome: M, F, or B
            }
        },
        seeking: {
            type: DataType.STRING,
            allowNull:false,
            validate: {
                len: [1, 1]
                //Will come from a radio or dropdown list, whatevs example outcome: M, F, or B
            }
        },
        age: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                min: 18
            }
        }
    });
    return User;
};