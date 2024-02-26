import React from "react";
import {Button} from "./Button";
import {TodolistHeader} from "./TodolistHeader";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListProps = {
    title: string
    tasks: TaskType[]
}
export const TodoList = ({title, tasks}: TodoListProps) => {
    return (
        <div className="todolist">
            <TodolistHeader title={title}/>
            <div>
                <input/>
                <Button title="+"/>
            </div>
            {
                tasks.length === 0 ? (
                    <p>Tasks are absent</p>
                ) : (
                    <ul>
                        {
                            tasks.map((task) => {
                                return (
                                    <li key={task.id}>
                                        <input type="checkbox" checked={task.isDone}/>
                                        <span>{task.title}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
            <div>
                <Button title="All"/>
                <Button title="Active"/>
                <Button title="Completed"/>
            </div>
        </div>
    )
}