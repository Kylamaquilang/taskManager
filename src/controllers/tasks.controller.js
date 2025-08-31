const Task = require('../models/tasks.model')
const validateRequest = require('../utils/RequestValidation')

exports.createTask = async (req, res) => {
    try{
        validateRequest(req.body, ['title', 'description'])

        const task = new Task({
            title:req.body.title,
            description: req.body.description
        })

        const new_task = await task.save();

        res.status(200).json({
            message: "Successfully created a new task",
            data: new_task
        })

    }catch(error){
       console.log(error)
       res.status(400).json({
        message:error.message
       }) 
    }
}

exports.getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find()
        res.status(200).json({
            message: "Success",
            data: tasks
        })
    }catch(error){
        console.log(error)
       res.status(400).json({
        message:error.message
       }) 
    }
}

exports.deleteTask = async (req, res) => {
    try{
        // res.json(req.params.task_id) --> access params in request url\
        const is_delete = await Task.findByIdAndDelete(req.params.task_id)

        // other way to execute deletion
        // const task = await Task.findById(req.params.task_id)
        // task.deleteOne()

        if(!is_delete) res.status(404).json({message: "No data found"})

        res.status(200).json({
            message: `${req.params.task_id} task has been deleted`,
        })    
        
    }catch(error){
        console.log(error)
        res.status(400).json({
         message:error.message
        }) 
    }
}

exports.updateTask = async (req, res) => {
    try{
        const update = await Task.findByIdAndUpdate(
            req.params.task_id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        )

        res.status(200).json({
            message: `Task has been updated`,
            data: update
        })  

    }catch(error){
        console.log(error)
        res.status(400).json({
         message:error.message
        }) 
    }
}