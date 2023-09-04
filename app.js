const express=require("express")
const app =express()
const todoRoutes=require("./routes/todoRoutes")

app.get("/",(req,res)=>{
    res.status(200).json({message:"Welcome to TODO Application"})
})

app.use("/api",)

//PORT
const port=4000;


// STARTING SERVER
app.listen(port,()=>(
    console.log(`app is running at ${port}`)
))