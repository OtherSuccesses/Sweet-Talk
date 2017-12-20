//=====================
//Model for user table
//=====================
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
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
            }
        },

        seeking: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
                len: [1, 1]
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
