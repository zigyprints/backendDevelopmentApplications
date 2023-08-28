// Required modules ...
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Using modules ...
dotenv.config({ path: 'Backend/.env' });
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Export app for the server ...
export default app;