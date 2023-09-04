import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import * as todoController from './controllers/todoController';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Define Swagger JSDoc options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Todo API',
      version: '1.0.0',
      description: 'API documentation for the Todo app',
    },
    basePath: '/',
  },
  apis: ['.src/controllers/todoController.ts'],
};

// Initialize Swagger JSDoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger documentation using Swagger UI Express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect('mongodb://localhost:27017/todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB Connection Error: ' + error);
  });

app.get('/todos', todoController.getTodos);
app.post('/todos', todoController.createTodo);
app.put('/todos/:id', todoController.updateTodo);
app.delete('/todos/:id', todoController.deleteTodo);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
