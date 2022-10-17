import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";

import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/user", userRoutes);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Example app listening on port http://localhost:${process.env.PORT || 5000}`
  );
});

const io = new Server(server, {
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  socket.emit("connected");

  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    socket.emit("connected to backend socket");
    console.log(`Connecting to frontend socket `);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room : " + room);
  });

  socket.on("new message", ({ newRecivedMessage, receiver }) => {
    console.log("new message");
    socket.emit("message recived", newRecivedMessage);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

mongoose
  .connect(
    "mongodb+srv://sahil:sahil@cluster0.bxu1dtp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => server)
  .catch((error) => console.error(error));
