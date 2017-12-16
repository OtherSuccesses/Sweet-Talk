let socketConnection = {};

module.exports = {
	addSocket: function (userName, socket) {
		socketConnection[userName] = socket;
		console.log('================================================================')
		console.log('connected: ', socketConnection)
	}
}