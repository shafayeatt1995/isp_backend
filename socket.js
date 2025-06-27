const http = require("http");
const { Server } = require("socket.io");
const socketServer = (app) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.BASE_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
    allowEIO3: true,
  });
  global.io = io;

  return server;
};

module.exports = { socketServer };
