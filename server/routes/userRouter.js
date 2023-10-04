const express = require("express");
const router = express.Router();

//IMPORT DB FUNCTIONS LATER
const {
	registerUser,
	signIn,
	getUserProfile,
	searchAllUsers,
} = require("../controllers/userController");

const verifyJWT = require("../controllers/middleware/verifyJWT");

//USER ROUTES

router.post("/register", registerUser);

router.post("/login", signIn);

router.get("/getCurrentUser", verifyJWT, getUserProfile);

router.get("/getAllUsers", verifyJWT, searchAllUsers);

module.exports = router;
