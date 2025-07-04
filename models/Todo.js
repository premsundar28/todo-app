const mongoose = require('mongoose'); // Import mongoose for MongoDB interactions
const todoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model,
        ref: 'User', // Reference name for the User model
        required: true // User field is required
    },
    task: {
        type: String, // Task description
        required: true // Task field is required
    },
    isDone:{
        type: Boolean, // Status of the task
        default: false // Default value is false (not done)
    }
},{timestamps: true}); // Schema for Todo with timestamps

module.exports = mongoose.model('Todo', todoSchema); // Export the Todo model based on the defined schema