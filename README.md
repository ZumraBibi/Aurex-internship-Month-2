React Task Manager – Week 1


Project Description

This project is a React-based Task Manager developed as part of the Aurex Full-Stack Internship Week 1 task.

The project converts a basic JavaScript Task Manager into a component-driven React application using Vite.

Technologies Used

- React
- Vite
- JavaScript
- JSX
- HTML
- CSS
- Node.js
- npm

Features

The Task Manager includes the following features:

- Add new tasks
- Display tasks dynamically
- Mark tasks as complete
- Undo completed tasks
- Delete tasks
- Prevent empty tasks from being added
- Controlled form input
- Component-based architecture

Component Structure

The project follows this component hierarchy:

App
├── Header
├── TaskForm
└── TaskList
    └── TaskItem

Components

App.jsx
Main parent component that manages the task state and passes data and functions to child components.

Header.jsx
Displays the Task Manager heading and description.

TaskForm.jsx
Handles the task input, controlled form state, validation, and task submission.

TaskList.jsx
Receives the task list through props and displays tasks using "map()".

TaskItem.jsx
Displays an individual task and provides Complete/Undo and Delete actions.

React Concepts Learned

During this project, I practiced:

- JSX syntax
- Functional components
- Component hierarchy
- Parent-child relationships
- Props
- "useState"
- Event handling
- Controlled inputs
- Form validation
- List rendering with "map()"
- Using "key" props
- Passing functions through props
- State management

How to Run the Project

First, install the project dependencies:

npm install

Then start the development server:

npm run dev

Open the local URL provided by Vite in the browser.

Learning Outcomes

This project helped me understand how a Vanilla JavaScript application can be converted into a React application using reusable components.

I learned how to manage UI state with "useState", pass data through props, handle user events, validate form input, and dynamically render lists in React.

Internship Task

Program: Aurex Full-Stack Internship
Month: 2
Week: 1
Project: React Task Manager – Part 1
