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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            isAlphanumeric: true,
            validate: {
                len: [8, 1000]
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
            allowNull: true,

        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "This user hasn't entered any information"
        }
    });
    return User;
};
