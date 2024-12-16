const express = require("express");
const { fetchMessages, deleteMessages } = require("../controllers/message.controller.js");


const router = express.Router();

router.get("/messages", fetchMessages);
router.post("/delete", deleteMessages);

module.exports = router;