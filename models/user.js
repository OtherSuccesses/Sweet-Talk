module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        //We don't need a timestamp as sequelize will start with one
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate: {
                isAlphanumeric: true,
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
            isAlphanumeric: true,
            validate: {
                len: [8, 30]
            }
        },
        gender: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: [1, 1]
                //Will come from a radio or dropdown list, whatevs example outcome: M, F
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
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return User;
};
