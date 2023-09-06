import express, {Request, Response, Router} from "express";
import db from "../server";
import uuid from "crypto";


const router: Router = express.Router(); 

//GET ALL TODOS

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


//GET ONE TODO

router.get('/todos/:id', (req: Request, res: Response) => {
    const id: String = req.params.id; 
    db.all(`SELECT * FROM TODOS WHERE id = "${id}"`, (err, rows) => {
        if(rows.length == 0){
            res.status(404).json({message: "todo doesn't exist"})
        }
        else{
            res.json(rows)
        }
    }
)
})


//POST a TODO in DB.

router.post("/todos", (req: Request, res: Response) => {

const title: String = req.body.title; 

const details: String = req.body.details; 

const status: Number = req.body.status; 
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

//UPDATE A TODO in DB.

router.put("/todos/:id", (req, res) => {
    console.log(req.body);

const title: String = req.body.title; 

const details: String = req.body.details; 

const status: Number = req.body.status; 

const id: String = req.params.id; 


if(title == null || details == null || status == null) {
    res.status(400).json({message: "Missing fields"})
}
else{

    db.run(`UPDATE TODOS SET title = "${title}", details ="${details}", status = ${status} WHERE id = "${id}"`, (err) => {
        if(err){
            res.status(500).json({error: "Internal Server Error" + err.message})
        }
        else{
        res.status(202).json({message: "successfully updated"})
    }
    })
}
})


//DELETE a TODO from the DB

router.delete("/todos/:id", (req, res) => {
    const id: String = req.params.id; 
    console.log(id);
    db.run(`DELETE FROM TODOS WHERE id="${id}"`, (error)=> {
        if(error){
            res.status(500).json({error: "Internal Server Error"});
        }
        else{
            res.status(200).json({message: "todo deleted succesfully"});
        }
    })
})


export default router;