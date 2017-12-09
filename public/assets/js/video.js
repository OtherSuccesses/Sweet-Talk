$(document).ready(function() {
  $("#connect").on("click", function(e) {
    console.log("Trying to get initiator ID...");
    const Peer = require("simple-peer");

    const peer = new Peer({
      initiator: location.hash === "#init",
      trickle: false,
    });
    var id;

    console.log(peer);
    peer.on('signal', (data) => {
      id = data;
      console.log("Initiator ID", id);
      $.post("/video", id);
    });

    peer.on('error', function (err) { console.error('error', err) });
  });
});
