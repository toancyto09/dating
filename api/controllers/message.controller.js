const Chat = require("../models/message.js");


const fetchMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    console.log(senderId);
    console.log(receiverId);

    const messages = await Chat.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error in getting messages", error });
  }
}

const deleteMessages = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length == 0) {
      return res.status(400).json({ message: "Invalid request body" })
    };

    for (const messageId of messages) {
      await Chat.findByIdAndDelete(messageId);
    }

    res.status(200).json({ message: "Messages delted successfully!" })
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error })
  }
}

module.exports = { fetchMessages, deleteMessages };