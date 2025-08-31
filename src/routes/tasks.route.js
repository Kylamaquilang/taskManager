const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, 'Please provide title for the task'],
        trim: true
    },
    description:{
        type:String,
        required: [true, 'Please provide description for the task'],
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    }
}, {timestamps:true}) /** create a default updated and created at in your collection */

module.exports = mongoose.model('Task', TaskSchema);
const express = require('express')
const router = express.Router()
const tasksController  = require('../controllers/tasks.controller')

// Define routes with explicit patterns
router.post('/v1/tasks', tasksController.createTask);
router.get('/v1/tasks', tasksController.getAllTasks);
router.get('/v1/tasks/:task_id', tasksController.getTaskById);
router.patch('/v1/tasks/:task_id', tasksController.updateTask);
router.delete('/v1/tasks/:task_id', tasksController.deleteTask);

module.exports = router