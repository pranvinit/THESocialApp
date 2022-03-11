const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
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
    description: {
      type: String,
      maxLength: [50, "description cannot exceed 50 characters"],
    },
    city: {
      type: String,
      maxLength: [50, "city cannot exceed 50 characters"],
    },
    from: {
      type: String,
      maxLength: [50, "from cannot exceed 50 characters"],
    },
    relationshipStatus: {
      type: String,
      enum: ["single", "married"],
    },
    // email-verification properties
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verified: {
      type: Date,
    },
    // forgot/reset password properties
    passwordToken: {
      type: String,
    },
    passwordExpirationDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// instance method
UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

// instance hook
UserSchema.pre("save", async function () {
  // handling safe update
  if (!this.isModified("password")) return;

  // hasing password for register/change password condition
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

module.exports = mongoose.model("User", UserSchema);
