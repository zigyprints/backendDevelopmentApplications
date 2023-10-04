const express=require('express')
const app=express()
const port=5001
require('dotenv').config();
const rooms=['general','tech','finance','crypto'];
const cors=require('cors');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const connectDB = require('./connection');

const server=require('http').createServer(app);
const io=require('socket.io')(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST'],
    }
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

