import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import taskRoutes from './routes/routes';
import db from './models/models';
import config from './config/connect'
const app = express();
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://avitdesai2002:TWGwEpCrVFrT0H2U@cluster0.v6zy3km.mongodb.net/?retryWrites=true&w=majority";
// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully');
     
  }).then((res) => {
    console.log(res); 
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  }); 

// SQLite Database Initialization
db.serialize(() => {
  db.run(
    'CREATE TABLE IF NOT EXISTS tasks (id VARCHAR(50), title TEXT, description TEXT, status TEXT, dueDate TEXT)'
  );
});

// API Routes
app.use('/api', taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
