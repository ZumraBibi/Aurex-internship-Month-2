import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
    // Auth & User States
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [isRegistering, setIsRegistering] = useState(false);
    const [authUsername, setAuthUsername] = useState("");
    const [authPassword, setAuthPassword] = useState("");

    // Task Management States
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    // Local Base URLs
    const API_TASKS_URL = "http://localhost:5000/api/tasks";
    const API_AUTH_URL = "http://localhost:5000/api/users";

    // 1. FETCH PROFILE SPECIFIC TASKS (Runs automatically when token updates)
    useEffect(() => {
        if (!token) return;

        const fetchTasks = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(API_TASKS_URL, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}` // Passes the secure JWT token
                    }
                });

                if (!response.ok) {
                    throw new Error("Could not load your secure task profiles.");
                }

                const data = await response.json();
                const formattedTasks = data.map(item => ({
                    id: item._id,
                    text: item.text,
                    completed: item.completed
                }));

                setTasks(formattedTasks);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [token]);

    // 2. REGISTER OR LOGIN ACTION HANDLER
    const handleAuth = async (e) => {
        e.preventDefault();
        if (!authUsername.trim() || !authPassword.trim()) {
            alert("Please fill in all authorization fields.");
            return;
        }

        const endpoint = isRegistering ? `${API_AUTH_URL}/register` : `${API_AUTH_URL}/login`;

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: authUsername, password: authPassword })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Authentication processing failed.");
            }

            // Save access credentials locally
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            setToken(data.token);
            setUsername(data.username);

            // Clear input boxes
            setAuthUsername("");
            setAuthPassword("");
        } catch (err) {
            alert(err.message);
        }
    };

    // 3. LOGOUT CLEANUP CLOSURE
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setToken(null);
        setUsername("");
        setTasks([]);
    };

    // 4. CREATE A USER LOCKED TASK
    const addTask = async (taskText) => {
        try {
            const response = await fetch(API_TASKS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ text: taskText })
            });

            if (!response.ok) throw new Error("Failed to save entry.");

            const newTask = await response.json();
            setTasks([{ id: newTask._id, text: newTask.text, completed: newTask.completed }, ...tasks]);
        } catch (err) {
            alert(err.message);
        }
    };

    // 5. UPDATE (TOGGLE) TASK COMPLETION
    const toggleTask = async (id) => {
        try {
            const targetTask = tasks.find(task => task.id === id);
            const response = await fetch(`${API_TASKS_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ completed: !targetTask.completed })
            });

            if (!response.ok) throw new Error("Failed to sync change.");

            setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
        } catch (err) {
            alert(err.message);
        }
    };

    // 6. DELETE TASK REMOVAL
    const deleteTask = async (id) => {
        try {
            const response = await fetch(`${API_TASKS_URL}/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Failed to remove item.");

            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            alert(err.message);
        }
    };

    // Dynamic Search & Filtering Calculations
    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase());
        if (filterStatus === "completed") return matchesSearch && task.completed;
        if (filterStatus === "pending") return matchesSearch && !task.completed;
        return matchesSearch;
    });

    // --- CONDITIONALLY RENDER AUTHENTICATION FORM IF NOT LOGGED IN ---
    if (!token) {
        return (
            <div style={{ padding: "20px" }}>
                <header>
                    <h1>Secure Tasks</h1>
                    <p>{isRegistering ? "Create your new account portal" : "Sign in to access your dashboard"}</p>
                </header>

                <form onSubmit={handleAuth} style={{ flexDirection: "column", gap: "15px" }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={authUsername}
                        onChange={(e) => setAuthUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password (Min 6 characters)"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                    />
                    <button type="submit">{isRegistering ? "Register Account" : "Login"}</button>
                </form>

                <p style={{ cursor: "pointer", color: "#4f46e5", fontWeight: "600" }} onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? "Already have an account? Login here" : "Don't have an account? Register here"}
                </p>
            </div>
        );
    }

    // --- MAIN PROTECTED APPLICATION DASHBOARD INTERFACE ---
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={{ fontWeight: "700", color: "#64748b" }}>👋 Welcome, {username}!</span>
                <button onClick={handleLogout} style={{ padding: "8px 16px", backgroundColor: "#ef4444", fontSize: "14px" }}>Logout</button>
            </div>

            <Header />
            <TaskForm onAddTask={addTask} />

            <div style={{ display: "flex", gap: "10px", marginBottom: "25px", width: "100%" }}>
                <input
                    type="text"
                    placeholder="Search your tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "12px 16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "12px",
                        fontSize: "15px",
                        outline: "none"
                    }}
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{
                        padding: "12px 16px",
                        border: "2px solid #e2e8f0",
                        borderRadius: "12px",
                        fontSize: "15px",
                        backgroundColor: "white",
                        cursor: "pointer",
                        outline: "none",
                        color: "#475569",
                        fontWeight: "600"
                    }}
                >
                    <option value="all">All Tasks</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            {loading && <p style={{ fontWeight: "bold", color: "#4f46e5" }}>Loading your protected records...</p>}
            {error && <p style={{ color: "#ef4444" }}>⚠️ Secure Error: {error}</p>}

            {!loading && !error && (
                <TaskList
                    tasks={filteredTasks}
                    onToggleTask={toggleTask}
                    onDeleteTask={deleteTask}
                />
            )}
        </div>
    );
}

export default App;

