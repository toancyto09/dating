const express = require("express");
const bodyParser = require("body-parser");

//model
const Chat = require("./models/message");

//router
const authRoutes = require("./routers/auth.route.js");
const userRoutes = require("./routers/user.route.js");
const messageRoutes = require("./routers/message.route.js");

//mongoose
const connectMongoDB = require("./db/connectMongoDB");

const app = express();
const port = 3000;

//socket io
const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

//user router
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', messageRoutes);


app.listen(port, () => {
  console.log("connect port", port);
  connectMongoDB();
});


//connect socket.io
io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("sendMessage", async (data) => {
    try {
      const { senderId, receiverId, message } = data;

      console.log("Data received:", data);

      const newMessage = new Chat({
        senderId,
        receiverId,
        message,
      });

      await newMessage.save();

      // Emit message to the receiver
      io.to(receiverId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error handling the messages:", error.message);
      console.error("Stack trace:", error.stack);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


server.listen(8000, () => {
  console.log("Socket.IO server running on port 8000");
});
