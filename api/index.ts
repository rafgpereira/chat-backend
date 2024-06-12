const app = require("express");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin:"https://user-login-system.netlify.app" },
});

const PORT = 3000;

io.on("connection", (socket) => {
  socket.on("set_username", (username) => {
    socket.data.username = username;
    io.emit('user_joined', {
      username: socket.data.username,
      message: 'joined the chat'
    })
  });
  

  socket.on("disconnect", (reason) => {
    io.emit('user_left', {
      username:socket.data.username,
      message: 'left the chat'
    })
  });

  socket.on("message", (text) => {
    io.emit("receive_message", {
      text,
      authorId: socket.id,
      author: socket.data.username,
    });
  });
});

server.listen(PORT, () => console.log("Servidor conectado."));
module.exports = app;