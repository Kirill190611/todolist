import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {TodolistHeader} from "./TodolistHeader";


function App() {

    const todoListTile_1 = "What to Learn"
    const todoListTile_2 = "What to buy"

    const tasks1: TaskType[] = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
    ]

    const tasks2: TaskType[] = [
    ]

    return (
        <div className="App">
            <TodoList title={todoListTile_1} tasks={tasks1}/>
            <TodoList title={todoListTile_2} tasks={tasks2}/>
        </div>
    );
}

export default App;
