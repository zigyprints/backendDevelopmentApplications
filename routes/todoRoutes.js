const express=require("express")
const app=express();
const router=express.Router();
const {createATodo,getAllTodo,deleteTodo,updateTodo}=require("../controllers/todoControllers")



router.post("/todo/new", createATodo);
router.get("/todo/getTodos",getAllTodo)
router.delete("/todo/:todoID",deleteTodo)
router.put("/todo/:todoID",updateTodo)
module.exports=router;