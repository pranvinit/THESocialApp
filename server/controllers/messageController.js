const Message = require("../models/MessageModel");
const { StatusCodes } = require("http-status-codes");

const createMessage = async (req, res) => {
  const { _id: userId } = req.user;
  const { conversation, text } = req.body;
  if (!conversation || !text) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide a text and convesation id" });
  }
  try {
    const message = await Message.create({
      conversation,
      sender: userId,
      text,
    });

    res.status(StatusCodes.CREATED).json({ message });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const getMessages = async (req, res) => {
  const { id: conversationId } = req.params;
  try {
    const messages = await Message.find({ conversation: conversationId });
    res.status(StatusCodes.OK).json({ messages, nbHits: messages.length });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

module.exports = { createMessage, getMessages };
