const express=require("express")
const app=express();
const router=express.Router();
const {createATodo}=require("../controllers/todoControllers")



router.post("/todo/new", createATodo);


module.exports=router;