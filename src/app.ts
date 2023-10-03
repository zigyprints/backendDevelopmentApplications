import express, { Express } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { createServer } from 'http'

import AuthRoute from './routes/user.route.js'
import initializeSocket from './socket/initializeSocket.js';

dotenv.config()

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());

const httpServer = createServer(app)
const io = new Server(httpServer,{
  pingTimeout: 60000,
})

app.set('io', io)
initializeSocket(io)

mongoose.connect(process.env.DATABASE_URL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', AuthRoute)


