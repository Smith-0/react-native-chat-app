import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

export const createChat = async (req, res) => {
  const { currentUserId, otherUserId } = req.body;
  const users = [currentUserId, otherUserId];

  const isCurrentUserIdCorrect = await User.find({
    user: currentUserId,
  }).count();
  const isOtherUserIdCorrect = await User.find({ user: otherUserId }).count();

  if (isCurrentUserIdCorrect < 1)
    return res.status(200).send("current user id incorrect 1");
  if (isOtherUserIdCorrect < 1)
    return res.status(200).send("other user id incorrect 2");

  const isExistBefore = await Chat.findOne({
    users,
  });
  console.log(isExistBefore);

  if (isExistBefore !== null) return res.status(200).json(isExistBefore);

  const newChat = new Chat({ users });
  try {
    await newChat.save();
    console.log(newChat);
    res.status(201).json(newChat);
  } catch (error) {
    console.log(error);
  }
};
