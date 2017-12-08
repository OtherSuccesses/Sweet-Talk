module.exports = function(sequelize, DataTypes, username) {
    var PersonalDb = sequelize.define(username, {
        //We don't need a timestamp as sequelize will start with one
        userName: {
            type: DataType.STRING,
            allowNull: false,
            primaryKey: true
        },
        swiped: {
            type: DataType.BOOLEAN,
            allowNull: false
        }
    });
    return PersonalDb;
};