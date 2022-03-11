const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      maxLength: [500, "post description cannot exceed 500 characters"],
    },
    image: {
      type: String,
      default: "",
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
