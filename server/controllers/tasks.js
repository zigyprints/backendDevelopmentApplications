// We write logics of each route here which is in tasks.js file
const asyncWrapper=require('../middleware/async')
const Task=require('../models/Task')
const createCustomError=require('../errors/custom-error')
// reading the data from the database

//By using async wrapper i can remove try catch block
//try catch was made to handle synchronous tasks but we wanted to handel async

const getAllTasks = asyncWrapper(async(req,res) =>{
    
        const tasks=await Task.find({})  // see what query need to be used from docs
        res.status(200).json({tasks})//.json({status:"sucess",data:{tasks,nbHits:tasks.length}})
        
        //res.status(200).json({status:"sucess"})  -> We can also send this
    
})


// Adding data to database passed by the user
const createTask=asyncWrapper( async(req,res)=>{ 
    
        const task =await Task.create(req.body);  //jo input mila tha wo hi database me store karwadia using Task.create
        res.status(201).json({task})
    
})

const getTask=asyncWrapper( async(req,res,next)=>{
    
        const {id:taskID} =req.params // jo id milegi usse name dedia taskID
        const task=await Task.findOne({_id:taskID})

        if(!task){
            
            return next(createCustomError(`no task with ID ${taskID}`,404))
              // if the task is not created and u are trying to find it

        }

        res.status(200).json({task})
    
})



const deleteTask=asyncWrapper( async (req,res)=>{
   
        const {id:taskID} =req.params // jo id milegi usse name dedia taskID
        const task=await Task.findOneAndDelete({_id:taskID})

        if(!taskID){
            return next(createCustomError(`no task with ID ${taskID}`,404))
        }

        res.status(200).json({task})
    
})

const updateTask=asyncWrapper( async (req,res)=>{

    
        const {id:taskID}=req.params
    const task= await Task.findOneAndUpdate({_id:taskID},req.body,{
        new:true,
        runValidators:true
    })

    if(!taskID){
        return next(createCustomError(`no task with ID ${taskID}`,404))
    }
    res.status(200).json({task})
   
    
})

module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}