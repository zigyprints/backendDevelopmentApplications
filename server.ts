import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './src/routes/NoteRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
