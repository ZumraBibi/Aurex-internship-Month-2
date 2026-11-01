import React from 'react';
import TaskItem from './TaskItem.jsx';

function TaskList({ tasks, onToggleTask, onDeleteTask }) {
    return (
        <div style={{ marginTop: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>My Tasks</h2>
            {tasks.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'gray' }}>No tasks added yet.</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleTask={onToggleTask}
                        onDeleteTask={onDeleteTask}
                    />
                ))
            )}
        </div>
    );
}

export default TaskList;
