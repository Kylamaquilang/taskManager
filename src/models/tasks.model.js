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
    task_status: {
        type:Boolean,
        default:false
    }
}, {timestamps:true}) /** create a default updated and created at in your collection */

module.exports = mongoose.model('Task', TaskSchema);