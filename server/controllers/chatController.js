const Chat = require("../models/chatModel");
const User = require("../models/userModel");

async function accessChat(req, res, next) {
	try {
		const friendId = req.body.id;
		console.log(`jwt id ${req.userId}`);
		//FINDING THE CHAT BETWEEN TWO PEOPLE
		let isChat = await Chat.find({
			isGroupChat: false,
			$and: [
				{ users: { $elemMatch: { $eq: req.userId } } },
				{ users: { $elemMatch: { $eq: friendId } } },
			],
		})
			.populate("users", "-password")
			.populate("latestMessage");

		isChat = await User.populate(isChat, {
			path: "latestMessage.sender",
			select: "username",
		});
		if (isChat.length > 0) {
			res.json({
				message: "old chat",
				payload: isChat[0],
			});
		} else {
			const newChat = {
				chatName: "sender",
				isGroupChat: false,
				users: [req.userId, friendId],
			};
			const createdChat = await Chat.create(newChat);
			const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
				"users",
				"-password"
			);
			res.json({
				message: "new chat",
				payload: fullChat,
			});
		}
	} catch (e) {
		res.json({
			message: "failure",
			payload: `failed to accessChat ${e}`,
		});
	}
}

async function fetchChats(req, res, next) {
	try {
		const result = await Chat.find({
			users: { $elemMatch: { $eq: req.userId } },
		})
			.populate("users", "-password")
			.populate("groupAdmin", "-password")
			.populate("latestMessage")
			.sort({ updatedAt: -1 });
		// .then(async (results) => {
		// 	results = await User.populate(results, {
		// 		path: "latestMessage.sender",
		// 		select: "username",
		// 	});
		// });

		res.json({
			message: "success getchats",
			payload: result,
		});
	} catch (e) {
		res.json({
			message: "failure",
			payload: `failed to getAllChats ${e}`,
		});
	}
}

async function createGroupChat(req, res, next) {
	try {
		if (!req.body.name) {
			return res.status(400).send({ message: "Please Fill all the feilds" });
		}

		var users = JSON.parse(req.body.users);

		if (users.length < 2) {
			return res
				.status(400)
				.send("More than 2 users are required to form a group chat");
		}

		users.push(req.userId);
		const groupChat = await Chat.create({
			chatName: req.body.name,
			users: users,
			isGroupChat: true,
			groupAdmin: req.userId,
		});

		const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
			"users",
			"-password"
		);

		res.json({
			payload: fullGroupChat,
		});
	} catch (e) {
		res.json({
			message: "failure",
			payload: `failed to creategroupchat ${e}`,
		});
	}
}

async function addToGroupChat(req, res, next) {
	try {
		const { chatId, userId } = req.body;

		//FINDING CHAT AND PUSHING NEW USER TO GROUP
		const added = await Chat.findByIdAndUpdate(
			chatId,
			{ $push: { users: userId } },
			{ new: true }
		)
			.populate("users", "-password")
			.populate("groupAdmin", "-password");

		if (!added) {
			res.status(404);
			throw new Error("Chat Not Found");
		} else {
			res.json({ payload: added });
		}
	} catch (e) {
		res.json({
			message: "failure",
			payload: `failed to addtogroup ${e}`,
		});
	}
}

async function removeFromGroupChat(req, res, next) {
	try {
		const { chatId, userId } = req.body;

		const removed = await Chat.findByIdAndUpdate(
			chatId,
			{ $pull: { users: userId } },
			{ new: true }
		)
			.populate("users", "-password")
			.populate("groupAdmin", "-password");

		if (!removed) {
			res.status(404);
			throw new Error("Chat Not Found");
		} else {
			res.json({
				payload: removed,
			});
		}
	} catch (e) {
		res.json({
			message: "failure",
			payload: `failed to addtogroup ${e}`,
		});
	}
}

module.exports = {
	accessChat,
	fetchChats,
	createGroupChat,
	addToGroupChat,
	removeFromGroupChat,
};
