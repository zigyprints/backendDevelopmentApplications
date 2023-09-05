import express, {Request, Response} from "express";
import db from "../server";
import { error } from "console";
import uuid from "crypto";


const router = express.Router(); 

  

router.get('/todos', (req: Request, res: Response) => {

    db.all("SELECT * FROM TODOS", [], (err, rows) => {
        if (err) {
          console.error('Error while executing query:', err.message);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(rows);
        }
      });

})


router.get('/todos/:id', (req: Request, res: Response) => {
    db.all(`SELECT * FROM TODOS WHERE id = "${req.params.id}"`, (err, rows) => {
        if(rows.length == 0){
            res.status(404).json({error: "Entry doesn't exist"})
        }
        else{
            res.json(rows)
        }
    }
)
})

router.post("/todos", (req: Request, res: Response) => {

const { title, details, status} = req.body;
console.log(title, details, status)

if(title == null || details == null || status == null) {
    res.status(400).json({message: "Missing fields"})
}
else{
  db.run(`INSERT INTO TODOS VALUES("${uuid.randomUUID()}" , "${title}", "${details}", ${status})`
  , function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Todo created successfully' });
    }
  });

}

    
})

router.put("/todos/:id", (req, res) => {
    console.log(req.body);

const { title, details, status} = req.body;  
if(title == null || details == null || status == null) {
    res.status(400).json({message: "Missing fields"})
}
else{

    db.run(`UPDATE TODOS SET title = "${title}", details ="${details}", status = ${status} WHERE ID = "${req.params.id}"`, (err) => {
        if(err){
            res.status(500).json({error: "Internal Server Error" + err.message})
        }
        else{
        res.status(202).json({message: "successfully updated"})
    }
    })
}
})

router.delete("/todos/:id", (req, res) => {
    db.run(`DELETE FROM TODOS WHERE id = "${req.params.id}"`, (error)=> {
        if(error){
            res.status(500).json({error: "Internal Server Error"});
        }
        else{
            res.status(200).json({message: "todo deleted succesfully"});
        }
    })
})


export default router;