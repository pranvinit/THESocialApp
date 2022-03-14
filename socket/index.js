const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("a user has connected");

  io.emit("welcome", "a user connected");
});
