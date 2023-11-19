document.addEventListener("DOMContentLoaded", () => {
  const localVideo = document.getElementById("localVideo");
  const remoteVideo = document.getElementById("remoteVideo");
  const startButton = document.getElementById("startButton");

  let localStream;
  let peerConnection;

  async function startVideoChat() {
    try {
      // Get user media
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideo.srcObject = localStream;

      // Create peer connection
      peerConnection = new RTCPeerConnection();

      // Add local stream to the peer connection
      localStream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, localStream));

      // Set up event handler for receiving remote stream
      peerConnection.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
      };

      // Create and send offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // Simulate sending the offer to the other user (in a real app, use a signaling server)
      const offerStr = JSON.stringify(offer);
      alert("Offer created. Share this with the other user:\n\n" + offerStr);

      // Simulate receiving the answer from the other user (in a real app, use a signaling server)
      const answerStr = prompt(
        "Enter the answer received from the other user:"
      );
      const answer = JSON.parse(answerStr);
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    } catch (error) {
      console.error("Error starting video chat:", error);
    }
  }

  // Event listener for the start button
  startButton.addEventListener("click", startVideoChat);
});
