const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    conversation: {
      ref: "Conversation",
      type: mongoose.Types.ObjectId,
    },
    sender: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
    text: {
      type: String,
      required: [true, "please provide a message body"],
      maxLength: [500, "message cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
