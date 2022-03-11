const Product = require("../models/PostModel");
const { StatusCodes } = require("http-status-codes");

const getSinglePost = async (req, res) => {
  res.send("get single post");
};

const createPost = async (req, res) => {
  res.send("create post");
};

const updatePost = async (req, res) => {
  res.send("update post");
};

const deletePost = async (req, res) => {
  res.send("delete post");
};

const likePost = async (req, res) => {
  res.send("like posts");
};

const dislikePost = async (req, res) => {
  res.send("dislike post");
};

// timeline post - posts from user and user followings
const timelinePosts = async (req, res) => {
  res.send("get timeline posts");
};

module.exports = {
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  timelinePosts,
};
