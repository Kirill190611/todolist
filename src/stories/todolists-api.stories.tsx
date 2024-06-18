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