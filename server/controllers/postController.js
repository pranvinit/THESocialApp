const User = require("../models/UserModel");
const Post = require("../models/PostModel");
const { StatusCodes } = require("http-status-codes");
const { checkAccess } = require("../utils");

const getSinglePost = async (req, res) => {
  const { id: postId } = req.params;
  try {
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(`No post with id ${postId}`);
    }
    res.status(StatusCodes.OK).json({ post });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const getUsersPosts = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const posts = await Post.find({ user: userId });
    res.status(StatusCodes.OK).json({ posts, nbHits: posts.length });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const createPost = async (req, res) => {
  const { _id: userId } = req.user;
  const data = req.body;
  data.user = userId;
  try {
    const post = await Post.create(data);
    res.status(StatusCodes.CREATED).json({ post });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const data = req.body;

  try {
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No post with id ${postId}` });
    }
    if (!checkAccess(req.user._id, post.user.toString())) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json("you are not authorized to access this resource");
    }
    // returns old post
    await post.updateOne(data);
    res.status(StatusCodes.OK).json(post);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;

  try {
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No post with id ${postId}` });
    }
    if (!checkAccess(req.user._id, post.user.toString())) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json("you are not authorized to access this resource");
    }
    await post.deleteOne();
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

// like & dislike a post
const likePost = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: postId } = req.params;
  try {
    const post = await Post.findOne({ _id: postId });
    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No post with id ${postId}` });
    }
    const isLiked = post.likes.includes(userId);
    if (!isLiked) {
      await post.updateOne({ $push: { likes: userId } });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
    }
    res
      .status(StatusCodes.OK)
      .json({ msg: `the post has been ${!isLiked ? "liked" : "disliked"}` });
  } catch (err) {
    res.status(500).json(err);
  }
};

// timeline post - posts from user and user followings
const timelinePosts = async (req, res) => {
  const { _id: userId } = req.user;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No user with id ${userId}` });
  }
  const userPosts = await Post.find({ user: userId }).sort("-updatedAt");
  const followingsPost = await Promise.all(
    user.followings.map(async (f) => {
      return await Post.find({ user: f }).sort("-updatedAt");
    })
  );
  const followersPosts = await Promise.all(
    user.followers.map(async (f) => {
      return await Post.find({ user: f }).sort("-updatedAt");
    })
  );
  const timeline = userPosts.concat(...followingsPost, ...followersPosts);
  res.status(StatusCodes.OK).json({ posts: timeline, nbHits: timeline.length });
};

module.exports = {
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  timelinePosts,
  getUsersPosts,
};
