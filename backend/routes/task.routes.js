const express = require('express');
const taskRouter = express.Router();
const TaskModel = require('../models/task.model');

class TaskController {
    // Route to add a new task
    async addTask(req, res) {
        try {
            const { description, dueDate } = req.body;
            const task = new TaskModel({ description, dueDate });
            await task.save();
            res.status(201).json({ message: 'Task added successfully', task });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Route to mark a task as completed
    async markTaskCompleted(req, res) {
        try {
            const { id } = req.params;
            const task = await TaskModel.findById(id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            task.completed = true;
            await task.save();
            res.status(200).json({ message: 'Task marked as completed', task });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Route to delete a task
    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const task = await TaskModel.findByIdAndDelete(id);
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Route to get all tasks
    async getAllTasks(req, res) {
        try {
            const tasks = await TaskModel.find();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Route to get completed tasks
    async getCompletedTasks(req, res) {
        try {
            const completedTasks = await TaskModel.find({ completed: true });
            res.status(200).json(completedTasks);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Route to get pending tasks
    async getPendingTasks(req, res) {
        try {
            const pendingTasks = await TaskModel.find({ completed: false });
            res.status(200).json(pendingTasks);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

const taskController = new TaskController();



// Assign route handlers to controller methods
taskRouter.post('/', taskController.addTask);
taskRouter.put('/:id', taskController.markTaskCompleted);
taskRouter.delete('/:id', taskController.deleteTask);
taskRouter.get('/', taskController.getAllTasks);
taskRouter.get('/completed', taskController.getCompletedTasks);
taskRouter.get('/pending', taskController.getPendingTasks);

module.exports = { taskRouter };
