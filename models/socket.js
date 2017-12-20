//=============================
//Table that tracks socket ids.
//=============================
module.exports = function(sequelize, DataTypes) {
	var Socket = sequelize.define('socket', {
		user: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		socketId: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},{timestamps:false});
	return Socket;
};