import {TasksStateType} from "../App";
import {v1} from "uuid";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    payload: {
        taskId: string
        todolistId: string
    },
}

type AddTaskActionType = {
    type: 'ADD-TASK',
    payload: {
        title: string
        todolistId: string
    },
}

type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS',
    payload: {
        taskId: string
        taskStatus: boolean
        todolistId: string
    },
}

type UpdateTaskType = {
    type: 'UPDATE-TASK',
    payload: {
        todolistId: string
        taskId: string
        title: string
    },
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusType
    | UpdateTaskType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'ADD-TASK': {
            const newTask = {
                id: v1(), title: action.payload.title, isDone: false,
            }
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    t => t.id == action.payload.taskId
                        ? {...t, isDone: action.payload.taskStatus}
                        : t
                )
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(
                    task => task.id === action.payload.taskId
                        ? {...task, title: action.payload.title}
                        : task
                )
            }
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string,
                             todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId,
        },
    } as const
}

export const addTaskAC = (title: string,
                          todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title,
            todolistId,
        },
    } as const
}

export const changeTaskStatusAC = (taskId: string,
                                   taskStatus: boolean,
                                   todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            taskId,
            taskStatus,
            todolistId,
        },
    } as const
}

export const updateTaskAC = (todolistId: string,
                             taskId: string,
                             title: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistId,
            taskId,
            title,
        },
    } as const
}