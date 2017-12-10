module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        //We don't need a timestamp as sequelize will start with one
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                len: [8,25]
            }
        },
        online: {
            type: DataTypes.BOOLEAN,
            allowNull: false,

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 30]
            }
        },
        gender: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: [1, 1]
                //Will come from a radio or dropdown list, whatevs example outcome: M, F, or B
            }
        },
        seeking: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: [1, 1]
                //Will come from a radio or dropdown list, whatevs example outcome: M, F, or B
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 18
            }
        }
    });
    // User.associate = function(models) {
    //     User.hasOne(models.personalDb, {
    //         onDelete: "cascade"
    //     });
    // };
    // User.associate = function(models) {
    //     User.hasMany(models.messageDb, {
    //         onDelete: "cascade"
    //     });
    // };
    return User;
};
