import React from 'react';
import {TaskProps} from "../App";
import {Button} from "./Button";


type TodolistProps = {
    title: string
    tasks: TaskProps[]
    date?: string
}
export const Todolist = ({title, tasks, date}: TodolistProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {
                        tasks.map((task) => {
                            return (
                                <li key={task.id}>
                                    <input type="checkbox"
                                           checked={task.isDone}/>
                                    <span>{task.title}</span>
                                </li>
                            );
                        })
                    }
                </ul>
            )
            }
            <div>
                <Button title="All" />
                <Button title="Active" />
                <Button title="Completed" />
            </div>
            <div>{date}</div>
        </div>
    );
};
