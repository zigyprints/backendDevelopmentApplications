import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import tasksRouter from './routes/taskRouter';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log("Received a request at /");
  res.status(200).send("Hello World");
});

app.use('/tasks', tasksRouter);


