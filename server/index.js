const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://192.168.29.145:3000',
      'https://chat-app-kohl-three.vercel.app/',
    ],
    methods: ['GET', 'POST'],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {

    const newData = {...data,userId: socket.id}
    socket.to(newData.room).emit("receive_message", newData);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
