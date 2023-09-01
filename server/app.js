const express= require('express');
const app=express();

const tasks=require('./routes/tasks');
const connectDB=require('./db/connect')
const notFound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')

require('dotenv').config()
//middleware

app.use(express.static('./public'))
app.use(express.json())   // If we dont use this we will not have data in req.body()

//routes


// app.get('api/v1/tasks') ->get all the tasks  [1] kind of route i need here jhsjceb

app.use('/api/v1/tasks',tasks)

// app.post('api/v1/tasks')  ->create a new task

// When the route doesnot exist
app.use(notFound)
app.use(errorHandlerMiddleware)

const port=process.env.PORT || 3000;

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server listening on port ${port} ...`))
    }catch(error){
        console.log(error)
    }

}

start();

