import express, { Request, Response } from "express";
import taskRoutes from './routes/tasksRoutes';
import '../database/db'; 
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', taskRoutes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
