import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (taskTitle: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter
                         }: PropsType) => {

    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const addTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            addTask(taskTitle.trim())
            setTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                       onKeyUp={addTaskOnKeyUpHandler}
                       className={error ? "error" : ""}/>
                <Button title='+'
                        onClick={addTaskHandler}/>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map(task => {
                            const removeTaskHandler = () => {
                                removeTask(task.id)
                            }

                            const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = event.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue)
                            }

                            return (
                                <li key={task.id} className={task.isDone ? 'is-done': ''}>
                                    <input type="checkbox"
                                           checked={task.isDone}
                                           onChange={changeTaskStatusHandler}/>
                                    <span>{task.title}</span>
                                    <Button title='x'
                                            onClick={removeTaskHandler}/>
                                </li>
                            )
                        })}
                    </ul>
            }
            <div>
                <Button title='All'
                        onClick={() => changeTaskFilterHandler('all')}
                        className={filter === 'all' ? 'active-filter' : ''}/>
                <Button title='Active'
                        onClick={() => changeTaskFilterHandler('active')}
                        className={filter === 'active' ? 'active-filter' : ''}/>
                <Button title='Completed'
                        onClick={() => changeTaskFilterHandler('completed')}
                        className={filter === 'completed' ? 'active-filter' : ''}/>
            </div>
        </div>
    )
}
