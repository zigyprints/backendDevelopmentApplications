const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new mongoose.Schema(
	{
		chatName: {
			type: String,
			required: true,
		},
		isGroupChat: {
			type: Boolean,
			default: false,
		},
		users: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		latestMessage: {
			type: Schema.Types.ObjectId,
			ref: "Message",
		},
		groupAdmin: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
