module.exports = function(sequelize, DataTypes) {
  var VideoChat = sequelize.define('VideoChat', {
    initiatorId: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    recId: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    initiatorUserName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recUserName: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  return VideoChat;
}
