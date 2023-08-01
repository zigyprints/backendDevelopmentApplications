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
