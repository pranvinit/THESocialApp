const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: [5, "username cannot be less than 5 characters"],
    maxLength: [50, "username cannot exceed 50 characters"],
    unique: true,
    required: [true, "please provide a username"],
    trim: true,
  },
  password: {
    type: String,
    minLength: [5, "password cannot be less than 5 characters"],
    required: [true, "please provide a password"],
  },
  email: {
    type: String,
    required: [true, "please provide a valid email"],
    validate: {
      validator: validator.isEmail,
      message: "please provide a valid email",
    },
    unique: true,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  coverPicture: {
    type: String,
    default: "",
  },
  followers: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  followings: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
