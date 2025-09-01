const express = require('express')
const router = express.Router()
const tasksController  = require('../controllers/tasks.controller')

// Define routes with explicit patterns
router.post('/v1/tasks', tasksController.createTask);
router.get('/v1/tasks', tasksController.getAllTasks);
router.get('/v1/tasks/:task_id', tasksController.getTaskById);
router.patch('/v1/tasks/:task_id', tasksController.updateTask);
router.patch('/v1/tasks/:task_id/status', tasksController.updateTaskStatus);
router.delete('/v1/tasks/:task_id', tasksController.deleteTask);

module.exports = router