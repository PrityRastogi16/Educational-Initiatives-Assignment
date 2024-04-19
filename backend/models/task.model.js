// models/Task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    dueDate: { type: Date, default: Date.now },
    completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', taskSchema);
