import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  const newMessage = new Message(req.body);
  console.log(newMessage);
  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
  }
};

export const getAllMsgInChat = async (req, res) => {
  const chatId = req.params.chatId;
  console.log(chatId);
  try {
    const messages = await Message.find({ chat: chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
  }
};
