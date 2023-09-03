const data = require('./db/data');

exports.getAllTask = async(req,res,next) => {
    const tasks = await data.getAllTask();

    res.status(200).json({
        tasks
    })
}

exports.createTask = async (req,res,next) => {
    const result = await data.createTask(req.body);

    res.status(201).json({
        id: result[0]
    })
}

exports.getTask = async (req,res,next) => {
    const task = await data.getTask(req.params.id);

    res.status(200).json({
        task
    })
}

exports.updateTask = async (req,res,next) => {
    const id = await data.updateTask(req.params.id,req.body);

    res.status(200).json({
        id
    })
}

exports.deleteTask = async (req,res,next) => {
    const task = await data.deleteTask(req.params.id);

    res.status(200).json({
        status: "success"
    })
}