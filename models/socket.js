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
		// createdAt: {
		//     type: DataTypes.DATE,
		//     defaultValue: sequelize.literal('NOW()')
		//   }
	});
	return Socket;
};