# Chat App
A chat application which allows various users to connect at real time and allows them share messages and data within the chat room. Various chat rooms can be implemented in the chat app and can be increased if needed.

## Authentication
### API Endpoints
1. **POST /signup**
   - Get username and password from the request body and adds the user in the database.
   - Password will be stored in database in hashed form(using bcrypt).
   - Returns a 200 OK status response if the user is successfully signed up.

2. **POST /login**
   - Get username and password from the request body and searches the user in the database.
   - Returns a 200 OK status response when user is successfully logged in.
   - Returns cookies login with value of JWT token and username with username of user.

## Chat Room
### API Endpoints
All the routes other than /auth are protected with userProtect controller.

1. **GET /chatrooms**
   - Returns a JSON array consisting the name of chatrooms.

2. **GET /:roomname**
   - User enters the chatroom with roo name specified in URL.
   - User can interact with all other users in the room in real-time by sending messages and files in the chatroom.

## Socket Events
1. **socket.on(user-joined')**
   - Catches the event when a user joins the chatroom.
   - Gets the username of the user as parameter.
   - Emits the 'user-joined' message to all users within room.

2. **socket.on('chat-message')**
   - Will catch the event when some other user in the chatroom sends a message.
   - Gets the message sent by some other user within chatroom as parameter.
   - Emits the 'chat message' to all users within room.

3. **socket.on('file')**
   - Will catch the event when some other user in the chatroom sends a file.
   - Gets the filename and base64 data of the file sent by some other user within chatroom as parameter.
   - Stores the file on the server.
   - Sends the file to all users in the chatroom.

   4. **socket.on('disconnect')**
   - Will catch the event when user disconnects from the chatroom.
   - Gets the username of the user as parameter.
   - Disconnects the user from chatroom.
   - Updates the list of users present in the chatroom.

## Data Models
- Users in the application are represented using the following TypeScript interface:
```typescript
interface userModel {
  _id: string; // Unique ID assigned by MongoDB
  username: string; // username
  password: boolean; // password
}
```

- Chatrooms in the application are represented using the following TypeScript interface:
```typescript
interface chatroom {
  name: string;
  users: string[];
}
const chatrooms: chatroom[] = [{ name: "ROOM NAME", users: [] }];
```

## Challenge Faced
The primary challenge I encountered during the development process was related to sending files with the chat room. There are varius ways to send a file with websockets. For example- base64(currently used), Buffer(max. size limit is 1MB) and streams.

## Postman Collection
[https://www.postman.com/munishrukhaya/workspace/munish-assignment/collection/30129538-53e769e5-7259-40e9-bc49-907aa39f577c?action=share&creator=30129538]
