import React, { useState } from "react";

function TaskForm({ onAddTask }) {
    const [task, setTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() === "") {
            return;
        }
        onAddTask(task);
        setTask("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task"
                style={{ padding: '8px', width: '250px' }}
            />
            <button type="submit" style={{ padding: '8px 15px' }}>Add Task</button>
        </form>
    );
}

export default TaskForm;
