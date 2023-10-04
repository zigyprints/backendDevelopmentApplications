const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

async function sendMessage(req, res, next) {
	// try {
	// 	const { content, chatId } = req.body;

	// 	if (!content || !chatId) {
	// 		res.json({
	// 			message: "invalid data passed to sendMessage",
	// 		});
	// 	}

	// 	//CREATING NEW MESSAGE DOC
	// 	const newMessage = {
	// 		sender: req.userId,
	// 		content,
	// 		chatId,
	// 	};

	// 	let message = await Message.create(newMessage);

	// 	console.log(`this is the message ${message}`);

	// 	message = await message.populate("sender", "username");
	// 	message = await message.populate("chatId");
	// 	message = await User.populate("message", {
	// 		path: "chat.users",
	// 		select: "usrename",
	// 	});

	// 	console.log(`after message: ${message}`);
	// 	//SETTING TO LAST MESSAGE FOR LATER CLIENT VIEW
	// 	await Chat.findByIdAndUpdate(req.body.chatId, {
	// 		latestMessage: message,
	// 	});

	// 	res.json({
	// 		payload: message,
	// 	});
	// } catch (e) {
	// 	res.json({
	// 		message: "error new message",
	// 		payload: `error with ${e}`,
	// 	});
	// }

	try {
		const { content, chatId } = req.body;

		if (!content || !chatId) {
			res.json({
				message: "Invalid data passed to sendMessage",
			});
			return; // Return early to prevent further execution
		}

		// Creating a new message document
		const newMessage = {
			sender: req.userId,
			content,
			chatId,
		};

		let message = await Message.create(newMessage);
		message = await Message.findOne({ _id: message._id })
			.populate({
				path: "sender",
				select: "username",
			})
			.populate({
				path: "chatId",
			})
			.exec();
		console.log(`usrs ${message.chat}`);

		message.chatId.users = await User.find(
			{ _id: { $in: message.chatId.users } },
			"username"
		);
		// Setting the latest message for the chat
		await Chat.findByIdAndUpdate(chatId, {
			latestMessage: message,
		});

		res.json({
			payload: message,
		});
	} catch (e) {
		res.json({
			message: "Error creating a new message",
			payload: `Error: ${e}`,
		});
	}
}

module.exports = { sendMessage };
