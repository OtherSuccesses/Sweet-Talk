module.exports = {
  connections: {},

  getAllConnections: function() {
    return this.connections;
  },

  getOneConnection: function (username){
    return this.connections[username];
  },

  addConnection: function (username, socketId, callback) {
    this.connections[username]=socketId;
    callback();
  },

  deleteConnection: function (username, callback){
    delete this.connections[username]
    callback();
  }
}
