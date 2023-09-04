const express=require("express")
const app =express();
const bodyParser=require("body-parser")
const todoRoutes=require("./routes/todoRoutes")
const mongoose=require("mongoose")
app.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome to TODO Application"})
})
app.use(bodyParser.json());
app.use("/api",todoRoutes)

//PORT
const port=4000;
mongoose.connect("mongodb://127.0.0.1:27017/todoData",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DB CONNECTED")
}).catch((err)=>{
    console.log(err)
})

// STARTING SERVER
app.listen(port,()=>(
    console.log(`app is running at ${port}`)
))