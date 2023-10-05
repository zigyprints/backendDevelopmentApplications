# Real-Time Chat Application

This is a real-time chat application that combines HTTP and WebSocket approaches to provide real-time messaging, message history, and seamless chat experiences. It includes features for one-on-one chat rooms, group chats, image uploads, JWT authentication, and error handling.

## Features

### 1. Real-Time Messaging and Message History

- Utilizes a hybrid approach combining HTTP and WebSocket to support real-time messaging.
- Provides message history so users can view past messages.

### 2. Chat Room Flexibility

- Supports both one-on-one chat rooms and group chats.
- Seamlessly switch between different chat rooms while maintaining message history.

### 3. Image Upload Functionality

- Allows users to upload images within the chat.
- Images are stored on the server, and a URL is generated for easy sharing during file uploads.

### 4. JWT Authentication and Cookie Management

- Implements JWT (JSON Web Token) authentication for secure user authorization.
- Manages user sessions using cookies to ensure authenticated access.

### 5. Seamless Error Handling

- Properly handles errors with appropriate HTTP response codes.
- Utilizes nested try-catch blocks to ensure robust error handling.

## Getting Started

To get started with this chat application, follow these steps:

1. Clone the repository to your local machine.
2. Install the necessary dependencies using `npm install`.
3. Configure your environment variables for authentication and database settings.
4. Start the application using `npm start`.
5. Open the application in your web browser and create an account or log in.

## Usage

1. Create one-on-one or group chat rooms.
2. Send and receive messages in real-time.
3. Upload and share images with other users.
4. Enjoy seamless authentication and error handling.

## Technologies Used

- Node.js
- Express.js
- WebSocket (Socket.io)
- Multer for image uploads
- JSON Web Tokens (JWT) for authentication

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
