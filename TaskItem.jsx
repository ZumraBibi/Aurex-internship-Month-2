 
function TaskItem({ task, onToggleTask, onDeleteTask }) {
    return (
        <div>
            <span>
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
