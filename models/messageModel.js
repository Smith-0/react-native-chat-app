import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      defaultValue: "admin",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
