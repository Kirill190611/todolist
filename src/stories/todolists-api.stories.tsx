import {useEffect, useState} from "react";
import axios from "axios";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '28ec63a8-d063-4c27-98ca-c454eb54230d'
    }
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios
            .get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
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
        axios
            .post(
                'https://social-network.samuraijs.com/api/1.1/todo-lists',
                {title: 'newTodolist'},
                settings
            )
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = 'c6ff757c-e401-4630-b6c7-58333da23278'

    useEffect(() => {
        axios
            .delete(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
                settings)
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

    const todolistId = 'b594baaa-89c5-4421-b8d0-740f4f247301'

    useEffect(() => {
        axios
            .put(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
                {
                    title: 'React'
                },
                settings
            )
            .then(res => {
                setState(res.data)
            })
    }, []);
    return (
        <div>{JSON.stringify(state)}</div>
    );
}