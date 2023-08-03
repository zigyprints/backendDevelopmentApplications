import express, { Request, Response } from "express";
import taskRoutes from './routes/tasksRoutes';
import '../database/db'; 
const app = express();
const port = 8001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next) => {
    console.log('Raw request body:', req.body);
    next();
  });  
app.use('/api', taskRoutes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
