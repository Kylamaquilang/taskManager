const Task = require('../models/tasks.model')
const validateRequest = require('../utils/RequestValidation')

exports.createTask = async (req, res) => {
    try{
        validateRequest(req.body, ['title', 'description'])

        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status || 'pending'
        })

        const new_task = await task.save();

        res.status(201).json({
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
        const { search, status } = req.query;
        let query = {};

        // Search by keyword in title or description
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by status
        if (status && ['pending', 'in-progress', 'completed'].includes(status)) {
            query.status = status;
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });
        
        res.status(200).json({
            message: "Success",
            data: tasks,
            count: tasks.length
        })
    }catch(error){
        console.log(error)
       res.status(400).json({
        message:error.message
       }) 
    }
}

exports.getTaskById = async (req, res) => {
    try{
        const task = await Task.findById(req.params.task_id)
        
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Success",
            data: task
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
        
        const is_delete = await Task.findByIdAndDelete(req.params.task_id)

        if(!is_delete) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task has been deleted successfully",
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

        if (!update) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task has been updated successfully",
            data: update
        })  

    }catch(error){
        console.log(error)
        res.status(400).json({
         message:error.message
        }) 
    }
}