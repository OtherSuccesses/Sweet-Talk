module.exports = function(sequelize, DataTypes, username1, username2) {
    var MessageDb = sequelize.define(username1+username2, {
        //We don't need a timestamp as sequelize will start with one
        user1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                max: 280
            }
        }
    });
    return MessageDb;
};
