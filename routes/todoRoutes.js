const express=require("express")
const app=express();
const router=express.Router();
const {createATodo,getAllTodo}=require("../controllers/todoControllers")



router.post("/todo/new", createATodo);
router.get("/todo/getTodos",getAllTodo)


module.exports=router;