document.addEventListener("DOMContentLoaded", () => {
  const localVideo = document.getElementById("localVideo");
  const remoteVideo = document.getElementById("remoteVideo");
  const startButton = document.getElementById("startButton");

  let localStream;
  let peerConnection;

  // Function to start the video chat
  async function startVideoChat() {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideo.srcObject = localStream;

      // Initialize the peer connection
      peerConnection = new RTCPeerConnection();

      // Add the local stream to the peer connection
      localStream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, localStream));

      // Set up the remote video stream when received
      peerConnection.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
      };

      // Create an offer to initiate the connection
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // Send the offer to the other user (you would use a signaling server for this in a real application)
      // For simplicity, you can alert the offer for testing purposes
      alert(JSON.stringify(offer));
    } catch (error) {
      console.error("Error starting video chat:", error);
    }
  }

  // Event listener for the start button
  startButton.addEventListener("click", startVideoChat);
});
