const express = require('express');
const { userValidator, signInValidator } = require('../middlewares/user');
const { signIn, create } = require('../controllers/user');
const router = express.Router();


router.post("/create",userValidator,create);
router.post("/signin",signInValidator,signIn);


module.exports = router;