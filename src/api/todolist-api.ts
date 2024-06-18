import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '28ec63a8-d063-4c27-98ca-c454eb54230d'
    }
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            {
                title: title
            },
            settings
        )
        return promise
    },
}