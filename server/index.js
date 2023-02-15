const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [
      'https://chat-app-kohl-three.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
      'https://chat-app-mangeshkchauhan.vercel.app',
      'https://chat-app-git-master-mangeshkchauhan.vercel.app',
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
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
