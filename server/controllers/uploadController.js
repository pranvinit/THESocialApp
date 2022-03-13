const path = require("path");
const Post = require("../models/PostModel");
const { StatusCodes } = require("http-status-codes");
const fs = require("fs");

const cloudinary = require("cloudinary");

const uploadPostImage = async (req, res) => {
  if (!req.files) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "No file uploaded" });
  }
  const postImage = req.files.image;
  if (!postImage.mimetype.startsWith("image")) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "please upload an image" });
  }
  const maxSize = 1024 * 1024 * 5;
  if (postImage.size > maxSize) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `please upload a smaller than 1MB` });
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads" + `${postImage.name}`
  );

  try {
    await postImage.mv(imagePath);

    const result = await cloudinary.uploader.upload(imagePath, {
      use_filename: true,
    });

    fs.unlinkSync(imagePath);
    return res.status(StatusCodes.OK).json({ image: result.secure_url });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong uploading the image" });
  }
};

module.exports = uploadPostImage;
