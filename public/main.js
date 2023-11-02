// client-side js, loaded by index.html
// run by the browser each time the page is loaded

let Peer = window.Peer;

let messagesEl = document.querySelector(".messages");
let peerIdEl = document.querySelector("#connect-to-peer");
let peerButtonIdEl = document.querySelector("#connect-to-peer-button");
let messageIdEl = document.querySelector("#message-to-peer");
let messageButtonIdEl = document.querySelector("#send-message-to-peer");
let infoEl = document.querySelector(".info");

let logMessage = (message) => {
  let newMessage = document.createElement("div");
  newMessage.innerText = message;
  messagesEl.appendChild(newMessage);
};

let logInfo = (message) => {
  let newMessage = document.createElement("div");
  newMessage.innerText = message;
  infoEl.appendChild(newMessage);
};

let renderVideo = (stream) => {
  videoEl.srcObject = stream;
};

// Register with the peer server
let peer = new Peer({
  host: "/",
  path: "/peerjs/myapp",
  port: 3000,
});
peer.on("open", (id) => {
  logInfo("My ID: " + id);
});
peer.on("error", (error) => {
  logInfo(error);
  console.error(error);
});

// Handle incoming data connection
peer.on("connection", (conn) => {
  logMessage(`incoming peer connection from: ${conn.peer}`);
  window.conn = conn;
  conn.on("data", (data) => {
    logMessage(`Them: ${data}`);
    console.log(conn);
  });
  conn.on("open", () => {
    logMessage(`Connected with ${peerId}...`);
    peerIdEl.disabled = true;
    peerButtonIdEl.disabled = true;
    peerIdEl.value = conn.peer;
  });
});

// Initiate outgoing connection
let connectToPeer = () => {
  let peerId = peerIdEl.value;
  logMessage(`Connecting to ${peerId}...`);
  let conn = peer.connect(peerId);
  window.conn = conn;
  conn.on("data", (data) => {
    logMessage(`Them: ${data}`);
  });
  conn.on("open", () => {
    logMessage(`Connected to ${peerId}...`);
    peerIdEl.disabled = true;
    peerButtonIdEl.disabled = true;
  });
};

let sendMessage = () => {
  conn.send(messageIdEl.value);
  logMessage("Me: " + messageIdEl.value);
};

window.connectToPeer = connectToPeer;
window.sendMessage = sendMessage;
