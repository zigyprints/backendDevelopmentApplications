import express, { Express } from 'express';

import routes from './routes/routes';

const app: Express = express();
const PORT: number = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// API route for tasks
app.use('/api/task/', routes);

// Start the server on the defined PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
