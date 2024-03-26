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

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)})
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        // const newTodolist = todolists.find(el => el.id === todolistId)
        // if (newTodolist) {
        //     newTodolist.filter = filter
        //     setTodolists([...todolists])
        // }

        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: filter} : el))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, taskStatus: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: taskStatus} : el)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists([...todolists.filter(el => el.id !== todolistId)])
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todolists.map(el => {
                    let tasksForTodolist = tasks[el.id]
                    if (el.filter === 'active') {
                        tasksForTodolist = tasks[el.id].filter(task => !task.isDone)
                    }

                    if (el.filter === 'completed') {
                        tasksForTodolist = tasks[el.id].filter(task => task.isDone)
                    }
                    return (
                        <Todolist
                            key={el.id}
                            todolistId={el.id}
                            title={el.title}
                            filter={el.filter}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            removeTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
