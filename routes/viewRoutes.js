const express=require('express')

const router=express.Router();

const {homePage}=require('../controller/viewControllers');

router.get('/',homePage);

module.exports=router;