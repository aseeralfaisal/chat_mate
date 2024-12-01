import { io } from "socket.io-client";

const roomSelectionContainer = document.getElementById(
  "room-selection-container",
);
const roomInput = document.getElementById("room-input");
const connectButton = document.getElementById("connect-button");

const videoChatContainer = document.getElementById("video-chat-container");
const localVideoComponent = document.getElementById("local-video");
const remoteVideoComponent = document.getElementById("remote-video");

const socket = io("http://localhost:4001", {
  transports: ["websocket", "polling"],
});
const mediaConstraints = {
  audio: true,
  video: true,
};
let localStream;
let isRoomCreator;
let rtcPeerConnection;
let roomId;

const iceServers = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" },
  ],
};

connectButton.addEventListener("click", () => {
  joinRoom(roomInput.value);
});

socket.on("room_created", async () => {
  console.log("Socket event callback: room_created");

  await setLocalStream(mediaConstraints);
  isRoomCreator = true;
});

socket.on("room_joined", async () => {
  console.log("Socket event callback: room_joined");

  await setLocalStream(mediaConstraints);
  socket.emit("start_call", roomId);
});

socket.on("full_room", () => {
  console.log("Socket event callback: full_room");

  alert("The room is full, please try another one");
});

socket.on("start_call", async () => {
  console.log("Socket event callback: start_call");

  if (isRoomCreator) {
    rtcPeerConnection = new RTCPeerConnection(iceServers);
    addLocalTracks(rtcPeerConnection);
    rtcPeerConnection.ontrack = setRemoteStream;
    rtcPeerConnection.onicecandidate = sendIceCandidate;
    await createOffer(rtcPeerConnection);
  }
});

socket.on("offer", async (event) => {
  console.log("Socket event callback: offer");

  if (!isRoomCreator) {
    rtcPeerConnection = new RTCPeerConnection(iceServers);
    addLocalTracks(rtcPeerConnection);
    rtcPeerConnection.ontrack = setRemoteStream;
    rtcPeerConnection.onicecandidate = sendIceCandidate;
    await rtcPeerConnection.setRemoteDescription(
      new RTCSessionDescription(event),
    );
    await createAnswer(rtcPeerConnection);
  }
});

socket.on("answer", async (event) => {
  console.log("Socket event callback: answer");

  await rtcPeerConnection.setRemoteDescription(
    new RTCSessionDescription(event),
  );
});

socket.on("ice_candidate", async (event) => {
  console.log("Received ICE candidate:", event);

  if (!event && !event?.candidate) {
    return console.warn(
      "ICE candidate event is missing required fields:",
      event,
    );
  }
  const candidate = new RTCIceCandidate(event);

  try {
    await rtcPeerConnection.addIceCandidate(candidate);
    console.log("Added ICE candidate successfully");
  } catch (error) {
    console.error("Error adding ICE candidate", error);
  }
});

socket.on("user left", async (roomId) => {
  console.log("USER HAS LEFT", roomId);
  remoteVideoComponent.style.display = "none";
});

function joinRoom(room) {
  if (room === "") {
    alert("Please type a room ID");
  } else {
    roomId = room;
    socket.emit("join", room);
    showVideoConference();
  }
}

function showVideoConference() {
  roomSelectionContainer.style.display = "none";
  videoChatContainer.style.display = "block";
}

async function setLocalStream(mediaConstraints) {
  try {
    localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
    localVideoComponent.srcObject = localStream;
  } catch (error) {
    console.error("Could not get user media", error);
  }
}

function addLocalTracks(rtcPeerConnection) {
  console.log("Adding local tracks to connection");
  localStream.getTracks().forEach((track) => {
    console.log(`Adding track: ${track.kind}`);
    rtcPeerConnection.addTrack(track, localStream);
  });
}

async function createOffer(rtcPeerConnection) {
  try {
    const sessionDescription = await rtcPeerConnection.createOffer();
    rtcPeerConnection.setLocalDescription(sessionDescription);

    socket.emit("offer", {
      type: "offer",
      sdp: sessionDescription,
      roomId,
    });
  } catch (error) {
    console.error(error);
  }
}

async function createAnswer(rtcPeerConnection) {
  try {
    const sessionDescription = await rtcPeerConnection.createAnswer();
    rtcPeerConnection.setLocalDescription(sessionDescription);

    socket.emit("answer", {
      type: "answer",
      sdp: sessionDescription,
      roomId,
    });
  } catch (error) {
    console.error(error);
  }
}

function setRemoteStream(event) {
  console.log("REMOTE STREAM", event.streams[0]);
  if (event.streams && event.streams[0]) {
    remoteVideoComponent.srcObject = event.streams[0];
  } else {
    console.log("No remote stream available");
  }
}

function sendIceCandidate(event) {
  if (event.candidate) {
    console.log("Sending ICE Candidate:", event.candidate);

    socket.emit("ice_candidate", {
      roomId,
      candidate: event.candidate.candidate,
      sdpMid: event.candidate.sdpMid,
      sdpMLineIndex: event.candidate.sdpMLineIndex,
    });
  }
}
