let socketConnection = {};

module.exports = {
	checkConnected: function () {
		console.log('Connected: %s sockets connected', Object.keys(socketConnection).length)
	},

	addSocket: function (userName, socket) {
		socketConnection[userName] = socket;
		console.log('================================================================')
		console.log('connected: ', userName);
		console.log('connected users:', Object.keys(socketConnection))
		console.log('================================================================')
	},

	removeSocket: function (userName, socket) {
		delete socketConnection[userName];
		console.log('Disconnected: %s sockets connected', Object.keys(socketConnection).length)
		console.log('connected users:', Object.keys(socketConnection))
	},
}