import app from './index'; // Assuming index.ts
import mongoDB from '../Database/connection' // Assuming connection.ts

// connect to mongoDB
mongoDB()

// start the server ...
const server = app.listen(3000, () => {
    console.log("Server is connected on port 3000 .....")
})