const express=require("express")
const app=express();
const router=express.Router();
const {createATodo,getAllTodo,deleteTodo}=require("../controllers/todoControllers")



router.post("/todo/new", createATodo);
router.get("/todo/getTodos",getAllTodo)
router.delete("/todo/:todoID",deleteTodo)
module.exports=router;