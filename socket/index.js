const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((u) => u.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  const user = users.find((user) => user.userId === userId);
  return user;
};

io.on("connection", (socket) => {
  // send and get message
  socket.on("sendMessage", ({ sender, receiver, text }) => {
    const user = getUser(receiver);
    io.to(user.socketId).emit("getMessage", {
      sender,
      text,
    });
  });

  // take user and socket id and push the object to users array
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // remove from users on disconnect
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
