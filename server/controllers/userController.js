const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res, next) {
	try {
		//destructuring the sign up form
		const { username, password } = req.body;

		//bcrypt stuff
		let salt = await bcrypt.genSalt(10);
		let hashedPasssword = await bcrypt.hash(password, salt);

		//creating the new user document
		const createdUser = new User({
			username,
			password: hashedPasssword,
		});

		await createdUser.save();

		res.json({
			message: "success",
			payload: createdUser,
		});
	} catch (e) {
		res.json({
			message: "failure",
			payload: `failed to create user ${e}`,
		});
	}
}

async function signIn(req, res) {
	try {
		const user = await User.findOne({ username: req.body.username });

		if (!user) {
			///ERROR NO USER FOUND
			throw new Error("User not found please sign up");
		} else {
			let comparedPassword = await bcrypt.compare(
				req.body.password,
				user.password
			);

			if (!comparedPassword) {
				throw new Error("Incorrect password");
			} else {
				//ALL INFO IS CORRECT CONTINUE TO LOGIN
				//RETURNING JWT AS COOKIE WITH USER ID
				console.log(`logging in id ${user._id}`);
				const token = jwt.sign(
					{ id: user._id },
					process.env.ACCESS_TOKEN_SECRET,
					{
						expiresIn: "1d",
					}
					// (err, token) => {
					// 	if (err) throw err;
					// 	res.cookie("token", token).status(201).json({
					// 		id: user._id,
					// 	});
					// }
				);
				res.cookie("token", token).status(201).json({
					id: user._id,
				});
			}
		}
	} catch (e) {
		res.json({
			message: "failure",
			payload: `error logging in: ${e}`,
		});
	}
}

async function getUserProfile(req, res, next) {
	try {
		//USERID COMING FROM JWT TOKEN
		let user = await User.findById({ _id: req.userId });

		res.json({
			message: "success",
			payload: {
				username: user.username,
				id: user._id,
			},
		});
	} catch (e) {
		res.json({
			message: "failure",
			payload: `failed to create user ${e}`,
		});
	}
}

async function searchAllUsers(req, res, next) {
	try {
		//GRABBING QUERY FROM THE URL
		// const keyword = req.query.search;

		// const users = await User.find()
		// console.log(keyword);
		console.log(req.userId);
		const keyword = req.query.search
			? {
					username: { $regex: req.query.search, $options: "i" },
			  }
			: {};

		const users = await User.find(keyword).find({ _id: { $ne: req.userId } });
		res.json({
			message: "success",
			payload: users,
		});
	} catch (e) {
		res.json({
			message: "failure",
			payload: `failed to getallusers ${e}`,
		});
	}
}

module.exports = {
	registerUser,
	signIn,
	getUserProfile,
	searchAllUsers,
};
