/* 
## the following code performs querying from the database
## also the nodejs api is constructed to connect with the database and fetch the data
## these codes can create,update,read and delete the items of todo.
*/
import Express from 'express';
import db from '../db/database';
import Tasks from '../model/todo-tasks';

const router = Express.Router();

router.get('/todos',(req:any,res:any) => { // this is the api to get the list of all the task to be done
    db.all("SELECT * FROM newtodo",(error:any,rows:any) => {
        if(error){
            return res.status(500).json({error:"Failed to retrieve from the database"}); // status code of 500 is given for internal error
        }
        res.json(rows); // when successful the api will return all the list.
    })
})
router.post('/tasks/add',(req:any,res:any) => {// this api route create a new task in the todo list.
    const {task,desc} = req.body;
    if(!task || !desc){ // Both the title and description of the task is required.
        return res.status(400).json({error:"Title and Description are missing!"})
    }
    const newTodo : Tasks = { // the task to be added should be of same type as the Tasks interface.
        id: Math.random().toString(10).substring(2), //Math.random() is used to generate id of an item.
        task,
        desc,
        completed:false
    }
    db.run("INSERT INTO newtodo (id,task,desc,completed) VALUES(?,?,?,?)", //sqlite query to insert new item value into the table.
    [newTodo.id,newTodo.task,newTodo.desc,newTodo.completed ? 1 : 0],
    (error:any) => {
        if(error){
            return res.status(500).json({error:"Failed to create the task. Try again..."})
        }
        res.status(201).json(newTodo);
    }
    )
})
module.exports = router;