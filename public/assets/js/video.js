$("#connect").on("click", function(e) {
  console.log("Trying to get initiator ID...");
  const Peer = require("simple-peer");

  const peer = new Peer({
    initiator: true,
    trickle: false,
  });
  console.log(peer);
  peer.on('signal', (data) => {
    console.log("Initiator ID", data);
  });

  peer.on('error', function (err) { console.error('error', err) });
});
