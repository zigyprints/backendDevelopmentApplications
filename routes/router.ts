import express from "express";
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


import { addTask } from "../controllers/controller.tAddask";
import { updateTask } from "../controllers/contoller.updateTask";
import { deleteTask } from "../controllers/contoller.deleteTask";
import  {getTasks} from '../controllers/contoller.getTasks';


//default route:

router.get("/", (req, res) => {
    res.send("API Working");
  });
  

//Add new task:

router.post("/addTask",addTask);

//Update a task:

router.put("/updateTask",updateTask);

//Delete a task:

router.delete("/deleteTask",deleteTask);

//To retrieve the tasks:

router.get("/getTasks",getTasks);


export default router;
