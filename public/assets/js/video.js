$(document).ready(function() {
  $("#connect").on("click", function(e) {
    console.log("Getting initiator ID...");
    const Peer = require("simple-peer");

    const peer = new Peer({
      initiator: location.hash === "#init",
      trickle: false,
      stream: stream
    });
    console.log(location);
    if (location.hash === "#init") {
      console.log("location.hash has been fired");
      peer.on('signal', (data) => {
        let id = data;
        console.log("Initiator ID", id);
        $.post("/userView/swipe", id);
      });
    } else {
      peer.on('signal', (data) => {
        let id = data;
        console.log("Recipient ID", id);
        $.ajax({
            type: "PUT",
            url: "/video",
            data: id
        })
      })
    }

    peer.on('error', function (err) { console.error('error', err) });
  });
});
