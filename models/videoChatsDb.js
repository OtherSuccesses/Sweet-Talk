module.exports = function(sequelize, DataTypes) {
  var VideoChat = sequelize.define('VideoChat', {
    initiatorId: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    recId: {
      type: DataTypes.JSON,
      allowNull: true,
    }
  });
  return VideoChat;
}
