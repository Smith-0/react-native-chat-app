import mongoose from "mongoose";
import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  const { user } = req.body;
  console.log(req.body);
  const isExistBefore = await User.find({ user }).count();
  console.log(isExistBefore);
  if (isExistBefore >= 1)
    return res.status(401).send(`user is already created`);
  if (!mongoose.Types.ObjectId.isValid(user))
    return res.status(401).send(`Invalid user id: ${user}`);
  const newUser = new User(req.body);
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};
