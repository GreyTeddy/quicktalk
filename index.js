const express = require("express");

const { ExpressPeerServer } = require("peer");

const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(3000, () => {
  console.log("Your app is listening on port " + 3000);
});

// peerjs server
const peerServer = ExpressPeerServer(listener, {
  debug: true,
  port: 3000,
  path: "/myapp",
});

app.use("/peerjs", peerServer);
