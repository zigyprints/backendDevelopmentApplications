import express, { Application } from 'express'
import dotenv from 'dotenv'
import connectDB from './config/config';
import router from './routes/routes';
const app: Application = express();

//configuring our node environment variables
dotenv.config({ path: './src/config.env' })

//calling connectDB function to connect database
connectDB()

//middleware for handling incomming json data
app.use(express.json())

//middleware for handling  all routes
app.use('/todoapi', router)
app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT} at server started`)
});