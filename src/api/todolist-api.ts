import axios from "axios";

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type FieldErrorType = {
    error: string
    field: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: D
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '28ec63a8-d063-4c27-98ca-c454eb54230d'
    }
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {
                title
            }
        )
    },
    getTodolists() {
        return instance.get<TodolistType[]>(
            'todo-lists',
        )
    },
    createTodolist(title: string) {
        return instance
            .post<ResponseType<{item: TodolistType}>>(
                'todo-lists',
                {
                    title
                },
            )
    },
    deleteTodolist(todolistId: string) {
        return instance
            .delete<ResponseType>(
                `todo-lists/${todolistId}`
                )
    }
}