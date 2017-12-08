module.exports = function(sequelize, DataTypes, username1, username2) {
    var MessageDb = sequelize.define(username1+username2, {
        //We don't need a timestamp as sequelize will start with one
        user1: {
            type: DataType.STRING,
            allowNull: false,
        },
        user2: {
            type: DataType.STRING,
            allowNull: false,
        },
        message: {
            type: DataType.text,
            allowNull: false
            validate: {
                max: 280
            }
        }
    });
    return MessageDb;
};