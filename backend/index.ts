import express from "express";
import http from "http";
import cors from "cors";
import { Socket, Server } from "socket.io";

// Import the function to handle socket connections
import { handleSocketConnection } from "./actions/socket";

// Create an Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Create an HTTP server using Express
const server = http.createServer(app);

// Create a Socket.IO server instance, configuring CORS settings
const io = new Server(server, {
  cors: {
    origin: true, // You can specify the allowed origins here
    // origin: "http://locahost:3000",
    methods: ["GET", "POST"],
  },
});

// Handle incoming socket connections
io.on("connection", (socket: Socket) => {
  handleSocketConnection(socket);
});

// Define the server's port, using the specified environment variable or a default value
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
