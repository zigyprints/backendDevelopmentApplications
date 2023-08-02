import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes'


dotenv.config(); 


const app = express();

//Adding a list of allowed origins for cors
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

//Then passing the option(allowed origins) to cors 
app.use(cors(options));

app.use(express.json());

//API Routes
app.use('/todo', todoRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
