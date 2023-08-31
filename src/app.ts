import express, { Express } from "express";
import { errorHandler } from "./errorHandler";
import routes from "./routes/routes";

// Define 'app' as an instance of Express
const app: Express = express(); 
// Define the port number to listen on
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000; 


// Middleware: Parse JSON requests
app.use(express.json());

// Middleware: Handle errors
app.use(errorHandler);

// Middleware: Use the defined routes for handling '/api/tasks' requests
app.use('/api/tasks', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
