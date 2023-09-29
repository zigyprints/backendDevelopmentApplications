# Chat App
A chat application which allows various users to connect at real time and allows them share messages and data within the chat room. Various chat rooms can be implemented in the chat app and can be increased if needed.

### Authentication
## API Endpoints

1. **POST /signup**
   - Get username and password from the request body and adds the user in the database.
   - Password will be stored in database in hashed form(using bcrypt).
   - Returns a 200 OK status response if the user is successfully signed up.

2. **POST /login**
   - Get username and password from the request body and searches the user in the database.
   - Returns a 200 OK status response when user is successfully logged in.
   - Returns cookies login with value of JWT token and username with username of user.

### Chat Room
## API Endpoints
All the routes other than /auth are protected with userProtect controller.

1. **GET /chatrooms**
   - Returns a JSON array consisting the name of chatrooms.

2. **GET /:roomname**
   - User enters the chatroom with roo name specified in URL.
   - User can interact with all other users in the room in real-time by sending messages and files in the chatroom.

### Data Models
Users in the application are represented using the following TypeScript interface:

```typescript
interface userModel {
  _id: string; // Unique ID assigned by MongoDB
  username: string; // username
  password: boolean; // password
}
```

### Challenge Faced
The primary challenge I encountered during the development process was related to sending files with the chat room. There are varius ways to send a file with websockets. For example- base64(currently used), Buffer(max. size limit is 1MB) and streams.

