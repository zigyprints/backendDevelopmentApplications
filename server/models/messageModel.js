const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema(
	{
		sender: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		content: {
			type: String,
			default: false,
		},
		chatId: {
			type: Schema.Types.ObjectId,
			ref: "Chat",
		},
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
