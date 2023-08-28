import express, { Express } from "express"
import mongoose from "mongoose"
// import cors from "cors"
import todoRoutes from "./routes/routes"
import { json } from "stream/consumers"

const app: Express = express()

const PORT: string | number = process.env.PORT || 5050

// app.use(cors())
app.use(json)

app.use(todoRoutes)

// app.use((req, res, next) => {
//     if (req.err) {
//       res.status(500).send({ error: req.err });
//     } else {
//       res.status(404).send({ error: 'Nothing Found' });
//     }
//   });

app.listen(PORT, (): void => {
    console.log(`This is working on ${PORT}`);
});

export default {app}