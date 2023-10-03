import express, { Application, Request, Response } from 'express';
import http, { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

// Importing routers
import loginRouter from './routes/login';
import signUpRouter from './routes/signUp';
import { User } from './utils';
import { verifyToken } from './utils';

const app: Application = express();
const server: HTTPServer = http.createServer(app);
const io: SocketIOServer = new SocketIOServer(server, {cors: { origin: "*" }});

dotenv.config();
const PORT: number = parseInt(process.env.PORT);

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use("/chat", express.static('public'));

app.use("/api/signup", signUpRouter);
app.use("/api/login", loginRouter);

app.get("/", (req, res) => {
	res.status(200).send('<a href="/signup">Chat App</a>');
})

app.get("/signup", (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '../views/signUp.html'));
})

app.get("/login", (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '../views/login.html'));
})

app.get("/room", (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, '../views/joinRoom.html'));
})

// interface chatUser extends User {

// }

// Express middlewares 
io.use((socket, next) => {
  const token = socket.handshake.query.token;
  const tokenAuth: boolean | object = verifyToken(token.toString())
    .then((tokenAuth) => {
      if (tokenAuth === false) {
        next(new Error("Invalid Token"));
      } else {
        (socket as any).user = tokenAuth;
        next();
      }
    });
})

io.on('connection', (socket: Socket) => {
  const user = (socket as any).user;
  const room_id = socket.handshake.query.room_id;
  socket.join(room_id);
  console.log(`${user.username} has Connected!`);
  const payload = {
    "sender": "Server",
    "room_id": room_id,
    "message": `${user.username} has Connected!`
  }
  io.to(room_id).emit('chat-from-server', payload);

  socket.on('chat', (message: string) => {
    const payload = {
      "sender": user.username,
      "room_id": room_id,
      "message": message
    }
    io.to(room_id).emit('chat-from-server', payload);
  });

  socket.on('image-send', (image: any) => {
    const payload = {
      "sender": user.username,
      "room_id": room_id,
      "image": image
    }
    io.to(room_id).emit('image-from-server', payload);
  })

  socket.on('disconnect', () => {
    console.log(`${user.username} has disconnected!`);
    const payload = {
      "sender": "Server",
      "room_id": room_id,
      "message": `${user.username} has disconnected!`
    }
    io.to(room_id).emit('chat-from-server', payload);
  });
});

server.listen(PORT, () => {
  console.log(`Server Live on http://localhost:${PORT}/`);
});