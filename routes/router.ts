import express from "express";
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// importing the controllers of different CRUD features:


import { addTask } from "../controllers/controller.tAddask";
import { updateTask } from "../controllers/contoller.updateTask";
import { deleteTask } from "../controllers/contoller.deleteTask";
import  {getTasks} from '../controllers/contoller.getTasks';
import { createUser, authenticateUser  } from "../controllers/controller.auth";
import verifyToken from "../controllers/controller.auth";


//default route:

router.get("/", (req, res) => {
    res.send("API Working");
  });
  

//New Account 

router.post("/createUser", createUser);


// Signin

router.post("/signIn", authenticateUser);

//Add new task:

router.post("/addTask",verifyToken,addTask); // verifyToken function is to verify the token received in order to use this particular api on client side

//Update a task:

router.put("/updateTask",verifyToken,updateTask); // verifyToken function is to verify the token received in order to use this particular api on client side

//Delete a task:

router.delete("/deleteTask",verifyToken,deleteTask); // verifyToken function is to verify the token received in order to use this particular api on client side

//To retrieve the tasks:

router.get("/getTasks",verifyToken,getTasks); // verifyToken function is to verify the token received in order to use this particular api on client side


export default router;
