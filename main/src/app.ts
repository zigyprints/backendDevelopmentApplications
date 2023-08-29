import express, { Express } from "express"
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors"
import todoRoutes from "./routes/routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 3000

const uri: string = 'mongodb+srv://babrerushabh1:J3pKvyZdaNsm9dQ4@todos.zrml53b.mongodb.net/'

mongoose 
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then((res) => {
        console.log(
          'Connected to Database - Initial Connection'
        );
      })
      .catch((err) => {
        console.log(
          `Database connection error occured -`,
          err
        );
});

app.use(cors())
app.use(express.json())

// Main routers
app.use(todoRoutes)

app.listen(PORT, (): void => {
    console.log(`This is working on ${PORT}`);
});

export default app