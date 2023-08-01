/* 
## the following code performs querying from the database
## also the nodejs api is constructed to connect with the database and fetch the data
## these codes can create,update,read and delete the items of todo.
*/
import Express from 'express';
import db from '../db/database';
import Tasks from '../model/todo-tasks';

const router = Express.Router();

router.get('/tasks',(req:any,res:any) => { // this is the api to get the list of all the task to be done

    try{ 
        db.all("SELECT * FROM newtodo",(error:any,rows:any) => {
        if(error){
            return res.status(400).json({error:"Failed to retrieve from the database"}); // status code of 500 is given for internal error
        }
        res.json(rows); // when successful the api will return all the list.
    })
    }catch(err:any){
        return res.status(500).json({err:"Internal server error"})       
    }
   
})
router.post('/tasks/add',(req:any,res:any) => {// this api route create a new task in the todo list.
    try{
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
    }catch(err:any){
        return res.status(500).json({err:"Internal server error"});
    }
    
})
router.put('/tasks/:id',(req:any,res:any) => { // this updates a particular todo item
    try{const id = req.params.id;
        const {task,desc,completed} = req.body;
    
        db.run("UPDATE newtodo SET task = ?, desc = ?, completed = ? WHERE id = ?",[task,desc,completed ? 1 : 0,id], //sqlite query to update the task by getting the item through id.
        (error:any) => {
            if(error){
                return res.status(500).json({error:"Unable to update the task item!!"});
            }
            res.status(200).json({success:"Successfuly updated."})
        }
        )
    }catch(err){
        return res.status(500).json({err:"Internal server error"});
    }
    
})
router.delete("/tasks/:id",(req:any,res:any) => { // to delete a particular task
    try{
        const id = req.params.id;
    db.run("DELETE FROM newtodo WHERE id = ?",[id],(error:any) => { // sqlite query to delete the item from the table
        if(error){
            return res.status(500).json({error:"The task item does not exist."});
        }
        res.status(200).json("The item is deleted.")
    })
    }catch(err:any){
        return res.status(500).json({err:"Internal server error"});
    }
    
})
module.exports = router;