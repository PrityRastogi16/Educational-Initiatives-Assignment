const express = require('express');
const taskRouter = express.Router();
const Task = require('../models/task.model');

// Route to add a new task
taskRouter.post('/', async (req, res) => {
    try {
        const { description, dueDate } = req.body;
        const task = new Task({ description, dueDate });
        await task.save();
        res.status(201).json({ message: 'Task added successfully', task });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to mark a task as completed
taskRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        task.completed = true;
        await task.save();
        res.status(200).json({ message: 'Task marked as completed', task });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete a task
taskRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get all tasks
taskRouter.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get completed tasks
taskRouter.get('/completed', async (req, res) => {
    try {
        const completedTasks = await Task.find({ completed: true });
        res.status(200).json(completedTasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get pending tasks
taskRouter.get('/pending', async (req, res) => {
    try {
        const pendingTasks = await Task.find({ completed: false });
        res.status(200).json(pendingTasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {taskRouter};
