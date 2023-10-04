## Chat Application Backend

### Introduction

This documentation summarizes the approach taken for building the backend for a chat application using Node.js, Express, and Socket.IO. The chat application allows users to connect, join rooms, send messages, and leave rooms. This document explains the high-level architecture, the choice of technologies, and key implementation details.

### Technologies Used

- Node.js: Chosen for its server-side capabilities, scalability, and extensive package ecosystem.
- Express.js: Used as the web application framework for handling HTTP requests.
- Socket.IO: A WebSocket library for real-time, bidirectional communication between clients and the server.
- Cors: Middleware for enabling Cross-Origin Resource Sharing, allowing communication with different domains.
- TypeScript: Used for server-side scripting and for type safety.
- High-Level Architecture

The chat application backend follows a server-client architecture. It uses WebSocket technology to enable real-time communication between clients (users) and the server.

Server: The backend server is responsible for handling HTTP requests, managing WebSocket connections, and facilitating communication between users.
Clients: Users connect to the server via WebSocket connections and interact with each other in real-time.

### Key Features and Implementation

Socket.IO Integration: Socket.IO is integrated into the Express.js application to handle WebSocket connections. When a client connects to the server, a WebSocket connection is established.

### User Management:

- Users are identified by a unique identifier (id) and a chosen username.

![username](https://imgur.com/yM1wYvo.jpg)

![username](https://imgur.com/luqrSwN.jpg)

---

Message Handling

- Users can add their username by emitting the "add_user" event. If the username is taken, they receive a notification.

![username](https://imgur.com/eyKZfVu.jpg)

![username](https://imgur.com/PuKPTmk.jpg)

![username](https://imgur.com/D1Pesks.jpg)

![username](https://imgur.com/Ivk231x.jpg)

---

- Users can join rooms by emitting the "join_room" event. If a user attempts to join a room they're already in, they receive a notification.

![join_room](https://imgur.com/7oXrlZW.jpg)

![join_room](https://imgur.com/iWVDQ6M.jpg)

---

- Users can send messages to rooms by emitting the "send_message" event. Messages can include text and optional images.
- Messages are broadcast to all users in the same room.

![send_message](https://imgur.com/1ksXWsL.jpg)

![send_message](https://imgur.com/xp1wOYt.jpg)

![send_message](https://imgur.com/5fxVw1s.jpg)

![send_message](https://imgur.com/0DnQPTU.jpg)

![send_message](https://imgur.com/ipJzxMf.jpg)

---

- Leaving Rooms:
- Users can leave rooms by emitting the "leave_room" event. When a user leaves a room, a message is broadcast to inform others.

![leave](https://imgur.com/fGVm11X.jpg)

![leave](https://imgur.com/BFDCytf.jpg)

![leave](https://imgur.com/7UWfLtE.jpg)

---

### Error Handling:

The application handles potential errors, such as joining a non-existing room or leaving a room the user never joined which shown in the above images.

## Conclusion

The chat application backend provides real-time communication capabilities for users. It's built using Node.js, Express.js, and Socket.IO, making it suitable for chat applications requiring low-latency communication. Proper error handling ensures a smooth user experience, and the application can be easily scaled to accommodate a growing user base.

This documentation provides an overview of the approach used to build the chat application backend, including technologies, architecture, key features, and deployment considerations. It serves as a reference for developers and stakeholders involved in the project.

## Additional Features to Implement in Future:

Frontend Implementaion:

Implement frontend using Reactjs or Nextjs.

User Authentication:

Implement user authentication to ensure that only registered users can access the chat.
Add features like user registration, login, and password reset functionality.

Private Messaging:

Enable users to send private messages to specific users within a room.
Implement a feature for users to create private rooms for one-on-one conversations.

Message History:

Store and retrieve chat message history so that users can view previous messages when joining a room.
Implement pagination or infinite scroll for browsing through older messages.

Notifications:

Implement push notifications to alert users to new messages or mentions when they are not actively using the application.
Provide notification settings to allow users to customize their notification preferences.

User Profiles:

Create user profiles where users can set profile pictures and update their personal information.
Allow users to view the profiles of other users.

User Status:

Display the online/offline status of users in the chat.
Implement a feature to show when a user was last active.

Database:
Setting database for storing messages, users profiles, status etc.
