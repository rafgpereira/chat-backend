const app = require("express");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "https://user-login-system.netlify.app" },
});

const PORT = 3003;

io.on("connection", (socket) => {
  socket.on("set_username", (username) => {
    socket.data.username = username;
  });

  console.log("Usuario conectado", socket.data.id);

  socket.on("disconnect", (reason) => {
    console.log("Usuário desconectado", socket.id);
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
