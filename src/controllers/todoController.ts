import { Request, Response } from 'express';
import Todo from '../models/todo';

class TodoController{
    public async getAllTodos( req: Request, res: Response): Promise<void> {
        try{
            const todos = await Todo.findAll();
            res.json(todos);
        } catch(error){
            res.status(500).json({error: `Internal server error`});
        }
    }

    public async createTodo(req: Request, res: Response): Promise<void>{
        const { text } = req.body; //bcause of body-parser we can parse the req
        if(!text){ // We're only checking for text cause its allowNull:false
            
            res.status(400).json({error: 'Cannot have empty text as todo!'});
            return;
        }

        try{
            //Performing any db action always returns promise so we await
            const newTodo = await Todo.create({text});
            res.json(newTodo);
        } catch(error){
            res.status(500).json({ error: 'Internal server error'});
        }
    }

    public async updateTodo(req: Request, res: Response): Promise<void>{
        const { id } = req.params; //req.params cause id would be in req search
        const { text, done, duedate} = req.body; // req.body cause fields will be json in form

        console.log(`${text}`)
        try{
            const todo = await Todo.findByPk(id);
            if(!todo){
                res.status(404).json({error: 'Todo not found'});
                return;
            }

            //if the given fields were empty/nothing updated
            todo.text = text || todo.text;
            todo.done = done || todo.done;
            todo.duedate = duedate || todo.duedate;
            await todo.save();

            res.json(todo);
        } catch(error){
            res.status(500).json({ error: 'Internal server error'});
        }
    }

    public async deleteTodo(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try{
            const todo = await Todo.findByPk(id);
            if(!todo){
                res.status(404).json({ error: 'Todo not found'});
                return;
            }

            console.log(todo);
            //Working but minor bug
            await Todo.destroy({
                where: {
                    id: id,
                },
            });
            console.log(todo);
            res.status(204);
        }catch (error){
            res.status(500).json({ error: 'Internal server error'});
        }
    }
}

export default new TodoController();