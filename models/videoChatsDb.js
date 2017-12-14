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
      allowNull: false
    },
    recUserName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return VideoChat;
}
