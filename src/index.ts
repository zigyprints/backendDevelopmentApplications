require('dotenv').config();

import express from "express";
import cors from 'cors';
import todoRouter from './routes/todoRouter'
import connectDBWithRetry from "./utils/connectDB"; 
import {MONGO_USER, MONGO_PASSWORD, PORT} from './utils/config'
import swaggerDocs from "./utils/swagger";

const mongoURL: string = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster1.vfhauiq.mongodb.net/?retryWrites=true&w=majority`

const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

connectDBWithRetry(mongoURL);
swaggerDocs(app, PORT);

app.use('/api', todoRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
}) 


