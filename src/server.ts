import "dotenv/config";
import routes from "./routes/index";
import {initializeDatabase} from "./database/db";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializeDatabase();

app.get("/", (req, res)=>{
    res.send("welcome to todo app backend");
});

app.use("/api", routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
