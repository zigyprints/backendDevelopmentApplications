# Chat App
A socketio chat app with user authentication through JWT tokens and image sharing.

---

### Building and running the server

After cloning the repo

```bash
make run
```

Alternatively,

```bash
npm install --save-dev && npm run build && npm start
```

---

### Usage

After the server is up and running, visit `localhost:4000/signup` to register a new user. This then will redirect you to the `/login` page which requires you to input your details again. Then you proceed to `/room` page where you may either input a room ID or generate one. After the room ID has been setup, you will be taken to the appropriate chat room. To share images, first add them and send hit `Send Image`.