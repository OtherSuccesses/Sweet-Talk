module.exports = function(sequelize, DataTypes, username) {
    var PersonalDb = sequelize.define(username, {
        //We don't need a timestamp as sequelize will start with one
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            validate:{
                isAlphanumeric: true
            }
        },
        swiped: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return PersonalDb;
};
