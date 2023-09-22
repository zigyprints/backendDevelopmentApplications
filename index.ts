import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Your updated Swagger JSON file
import multer from 'multer';

const app = express();

app.use(cors());
app.use(express.json());




app.use('/api', todoRoutes);

// Set up the Swagger UI route using the updated Swagger JSON file
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(multer);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
