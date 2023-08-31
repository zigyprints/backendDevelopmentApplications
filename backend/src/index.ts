import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // Removed unnecessary import
import todoRouter from "./router/todoRouter";
import globalErrorHandler from "./controller/errorController";
import AppError from "./utils/appError";

const app = express();
dotenv.config();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
    credentials: true,
}));

// Parse JSON requests with a limit of 10kb
app.use(express.json({ limit: '10kb' }));

// Mount the todoRouter under the '/api' route
app.use('/api', todoRouter);

// If no route matches, create a 404 error using the AppError class
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});
