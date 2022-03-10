const User = require("../models/UserModel");
const { StatusCodes } = require("http-status-codes");

const getSingleUser = async (req, res) => {
  res.send("get single user");
};

const getAllUsers = async (req, res) => {
  res.send("get all users");
};

const createUser = async (req, res) => {
  res.send("create a user");
};

const updateUser = async (req, res) => {
  res.send("update a user");
};

const deleteUser = async (req, res) => {
  res.send("delete a user");
};

module.exports = {
  getSingleUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
