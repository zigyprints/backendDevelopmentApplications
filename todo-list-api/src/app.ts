import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router  from './routes/index'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';


const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.evgfd47.mongodb.net/todolist?retryWrites=true&w=majority',).then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Routes
app.use('/api/todo', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
