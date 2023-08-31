import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv, { config } from "dotenv";
import todoRouter from "./router/todoRouter";
import globalErrorHandler from "./controller/errorController"
import AppError from "./utils/appError";

const app = express();

dotenv.config({ path: "./../config.env" });

app.use(cors({
    credentials: true,
}));

app.use(express.json({ limit: '10kb' }));       

app.use(bodyParser.json());

// if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
// }

app.use('/api', todoRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
})

app.use(globalErrorHandler);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log("Listening to port 8080");
})

