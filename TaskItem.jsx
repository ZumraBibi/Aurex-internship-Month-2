import React from 'react';

function TaskItem({ task, onToggleTask, onDeleteTask }) {
    return (
        <div className="task-item">
            <span style={{ textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "#94a3b8" : "#334155" }}>
                {task.completed ? "✓ " : ""}
                {task.text}
            </span>
            <button onClick={() => onToggleTask(task.id)}>
                {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => onDeleteTask(task.id)}>
                Delete
            </button>
        </div>
    );
}

export default TaskItem;

