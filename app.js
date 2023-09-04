const express=require("express")
const app =express()


const todoCreate=app.post("/")

//PORT
const port=4000;


// STARTING SERVER
app.listen(port,()=>(
    console.log(`app is running at ${port}`)
))