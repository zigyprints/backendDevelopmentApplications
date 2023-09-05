import express from "express";

const router = express.Router(); 

router.get('/todos', (req, res) => {
    res.send("Get All Todos")
})


router.get('/todos/:id', (req, res) => {
    res.send("Get TODO with id" + req.params.id)
})

router.post("/todos", (req, res) => {
    res.send("Add new TODO")
})

router.put("/todos/:id", (req, res) => {
    res.send("Update TODO");
})

router.delete("/todos/:id", (req, res) => {
    res.send("Update TODO");
})


export default router;