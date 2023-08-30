import express from "express";
import cors from 'cors';
import todoRouter from './routes/todoRouter'
import mongoose from "mongoose";

import swaggerDocs from "./utils/swagger";

const mongoURL: string = "mongodb+srv://rigveddesai:fFpo8HWgryA31FTR@cluster1.vfhauiq.mongodb.net/?retryWrites=true&w=majority"

const app = express();
const PORT: number = 8080;

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

const connectWithRetry = () => {
    mongoose
        .connect(mongoURL)
        .then(() => console.log("Successfully connected to DB"))
        .catch((e) => {
            console.log(e)
            setTimeout(connectWithRetry, 5000)
});
}

connectWithRetry();

app.use('/api', todoRouter)

swaggerDocs(app, PORT);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
}) 


