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

type TasksResponse = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
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
        return instance
            .get<TodolistType[]>(
                'todo-lists',
            )
    },
    createTodolist(title: string) {
        return instance
            .post<ResponseType<{ item: TodolistType }>>(
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
    },
    getTasks(todolistId: string) {
        return instance
            .get<TasksResponse>(
                `todo-lists/${todolistId}/tasks`
            )
    },
    createTask(todolistId: string, title: string) {
        return instance
            .post<TaskType[]>(
                `todo-lists/${todolistId}/tasks`,
                {
                    title
                },
            )
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance
            .put<TaskType[]>(
                `todo-lists/${todolistId}/tasks/${taskId}`,
                {
                    title
                }
            )
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance
            .delete<TaskType[]>(
                `todo-lists/${todolistId}/tasks/${taskId}`
            )
    }
}