import { useState } from "react";

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a task"
            />

            <button type="submit">Add Task</button>
        </form>
    );
}

export default TaskForm;