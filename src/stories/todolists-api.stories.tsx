import {useEffect, useState} from "react";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then(res => {
                setState(res.data)
            })
    }, [])
    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('New Title')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '50f0ed97-1867-4e82-804c-93a1daf08406'
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, []);
    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'eacc19af-da37-4e38-85a2-eb6b89fa2769'
        todolistAPI.updateTodolist(todolistId, '12456zxc')
            .then(res => {
                setState(res.data)
            })
    }, []);
    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2997f5c7-a62f-4dbe-8670-b48a2b0f4220';

        todolistAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])
    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2997f5c7-a62f-4dbe-8670-b48a2b0f4220';

        todolistAPI.createTask(todolistId,'New Title123')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '2997f5c7-a62f-4dbe-8670-b48a2b0f4220'
        const taskId = '2f973a1f-1383-4a3c-8223-d83c22e4c2ab'

        todolistAPI.updateTask(todolistId, taskId, '12456zxc123')
            .then(res => {
                setState(res.data)
            })
    }, []);
    return (
        <div>{JSON.stringify(state)}</div>
    );
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '2997f5c7-a62f-4dbe-8670-b48a2b0f4220'
        const taskId = '2f973a1f-1383-4a3c-8223-d83c22e4c2ab'

        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
    }, []);
    return (
        <div>{JSON.stringify(state)}</div>
    );
}