import TaskItem from './TaskItem.jsx';
function TaskList({ tasks, onToggleTask, onDeleteTask }) {
    return (
        <div>
            <h2>My Tasks</h2>

            {tasks.length === 0 ? (
                <p>No tasks added yet.</p>
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