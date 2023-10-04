const express = require("express");
const router = express.Router();

//FUNCTIONS
const {
	accessChat,
	fetchChats,
	createGroupChat,
	addToGroupChat,
	removeFromGroupChat,
} = require("../controllers/chatController");

const verifyJWT = require("../controllers/middleware/verifyJWT");

//ROUTES
router.post("/accessChat", verifyJWT, accessChat);
router.get("/", verifyJWT, fetchChats);
router.post("/createGroupChat", verifyJWT, createGroupChat);
router.put("/removeFromGroup", verifyJWT, removeFromGroupChat);
router.put("/addToGroupChat", verifyJWT, addToGroupChat);

module.exports = router;
