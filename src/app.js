const express = require('express')
const cors = require('cors')
const tasksRoutes = require('./routes/tasks.route')
const connectDB = require('./config/db.config')

const app = express();

//check database connection
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// routes
app.use('/api',tasksRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Express API!')
})

module.exports = app;