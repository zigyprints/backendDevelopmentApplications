import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import taskRoutes from "./routes/TaskRoutes";
import path from "path";

const app: Express = express();

// Serve the frontend EJS template and static files
app.use(express.static(path.join(__dirname, "./client")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./client/views"));

app.use(cors());
app.use(bodyParser.json());
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
    res.render("index");
  });

export default app;
