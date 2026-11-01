import Task from '../models/Task.js';

// @desc    Get current user's tasks only
// @route   GET /api/tasks
const getTasks = async (req, res) => {
    try {
        // Find tasks where user matches the authorized token owner ID
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new task under active profile
// @route   POST /api/tasks
const createTask = async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ message: 'Please add a text field' });
        }

        const task = await Task.create({
            user: req.user.id, // Links task entry to active user id
            text: req.body.text,
            completed: false
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user's task status
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Match checking verification: Verify task belongs to current token holder
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to update this entry' });
        }

        task.completed = req.body.completed !== undefined ? req.body.completed : !task.completed;
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user's task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Match checking verification: Verify task belongs to current token holder
        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to delete this entry' });
        }

        await task.deleteOne();
        res.status(200).json({ id: req.params.id, message: 'Task removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getTasks, createTask, updateTask, deleteTask };

