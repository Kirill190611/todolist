import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (taskTitle: string) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: PropsType) => {

    const [taskTitle, setTaskTitle] = useState("");
    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle("")
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }
    const changeTaskFilterHandler = (filter: FilterValuesType) => {
        changeFilter(filter);
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}/>
                <Button title={'+'}
                        onClick={addTaskHandler}/>
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map(task => {
                            const removeTaskHandler = () => {
                                removeTask(task.id)
                            }

                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title={'x'} onClick={removeTaskHandler}/>
                                </li>
                            )
                        })}
                    </ul>
            }
            <div>
                <Button title={'All'} onClick={() => changeTaskFilterHandler('all')}/>
                <Button title={'Active'} onClick={() => changeTaskFilterHandler('active')}/>
                <Button title={'Completed'} onClick={() => changeTaskFilterHandler('completed')}/>
            </div>
        </div>
    )
}
