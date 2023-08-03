const express=require('express');

require('dotenv').config();

const authRoutes=require('./routes/userAuth')
const TaskRoutes=require('./routes/task')

const port=process.env.PORT || 8080;

const connectdb=require('./mongodb/connect');
const app=express();
app.use(express.json({ limit: '50mb' }))
app.use('/auth',authRoutes)
app.use('/task',TaskRoutes)

const startServer = async () => {
    try {
      connectdb.connectdb(process.env.MONGO_URL);
      app.listen(port, () => console.log('Server started on port 8080'));
    } catch (error) {
      console.log(error);
    }
  };

  startServer();


app.get('/',(req,res)=>{
    res.send('hello world')
})