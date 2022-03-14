const Conversation = require("../models/ConversationModel");
const { StatusCodes } = require("http-status-codes");

const createConversation = async (req, res) => {
  const { sender, receiver } = req.body;
  if (!sender || !receiver) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide both sender and receiver id" });
  }
  try {
    const conversation = await Conversation.create({
      members: [sender, receiver],
    });

    res.status(StatusCodes.CREATED).json({ conversation });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const getConversation = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const conversations = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json({ conversations, nbHits: conversations.length });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

module.exports = {
  createConversation,
  getConversation,
};
