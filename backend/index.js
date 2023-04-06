const express = require("express");
const app = express();
const http = require("http");

const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const Messages = []

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    Messages.push(data)
    io.emit('receive_message', Messages)
  });
});

server.listen(4000, () => {
  console.log("Server is running");
});
