const express = require("express");
const router = express.Router();

const { sendMessage } = require("../controllers/messageController");
router.post("/sendMessage", sendMessage);
// router.get('/chat:id', getAllMessages)

module.exports = router;
