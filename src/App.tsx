import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: "What to learn", filter: "all",},
        {id: todolistId2, title: "What to buy", filter: "all",},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Angular', isDone: false},
            {id: v1(), title: 'TS', isDone: false},
        ]
    })

    const removeTask = (taskId: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId]
        const newTodolistTasks = todolistTasks.filter(task => task.id !== taskId)
        tasks[todolistId] = newTodolistTasks;
        setTasks({...tasks, newTodolistTasks})
    }

    const addTask = (taskTitle: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: taskTitle,
            isDone: false,
        }
        const newTodolistTasks = tasks[todolistId]
        tasks[todolistId] = [newTask, ... newTodolistTasks]
        setTasks({... tasks});
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const todolistTasks = tasks[todolistId]
        const newStatus = todolistTasks.map(t => (t.id === taskId ? {...t, isDone: taskStatus} : t))
        tasks[todolistId] = newStatus
        setTasks({...tasks})
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map(todolist => {
            return todolist.id === todolistId ? {...todolist, filter} : todolist
        })
        setTodolists(newTodolists)
    }

    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(todolist => todolist.id !== todolistId)
        setTodolists(newTodolists)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">

            {
                todolists.map(todolist => {
                    let tasksForTodolist = tasks[todolist.id]
                    if (todolist.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                    }

                    if (todolist.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                    }

                    return (
                        <Todolist key={todolist.id}
                                  title={todolist.title}
                                  todolistId={todolist.id}
                                  tasks={tasksForTodolist}
                                  filter={todolist.filter}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  removeTodolist={removeTodolist}/>
                    )
                })
            }

        </div>
    );
}

export default App;
