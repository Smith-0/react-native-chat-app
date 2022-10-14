import express from "express";
import {
  sendMessage,
  getAllMsgInChat,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/sendMessage", sendMessage);
router.get("/getAllMsgInChat/:chatId", getAllMsgInChat);

export default router;
