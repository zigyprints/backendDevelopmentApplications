import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { createServer } from 'http';
import AuthRoute from './routes/user.route.js';
import ChatRoute from './routes/chat.route.js';
import initializeSocket from './socket/initializeSocket.js';
dotenv.config();
const app = express();
const PORT = 3000;
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    pingTimeout: 60000,
});
app.set('io', io);
initializeSocket(io);
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use('/api/user', AuthRoute);
app.use('/api/chat', ChatRoute);
//# sourceMappingURL=app.js.map