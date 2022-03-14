const mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema(
  {
    member: {
      type: [mongoose.Types.ObjectId],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
