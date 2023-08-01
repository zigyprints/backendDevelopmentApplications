import express from "express";
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes'

dotenv.config(); 


const app = express();

app.use(express.json());

//API Routes
app.use('/todo', todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
