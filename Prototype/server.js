const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Serve static files from the "public" directory
app.use(express.static("public")); // Assuming your HTML and JS are in a directory named "public"

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("drawing", (data) => {
    socket.broadcast.emit("drawing", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
