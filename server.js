import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const router = express.Router();

app.use(cors());

app.use(express.json());

app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Example app listening on port http://localhost:${
          process.env.PORT || 5000
        }`
      );
    })
  )
  .catch((error) => console.error(error));
