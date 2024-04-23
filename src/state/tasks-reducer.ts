import {TasksStateType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    newTitle: string
    todolistId: string
}

export type AddNewTodolistType = {
    type: 'ADD-NEW-TODOLIST'
    newTitle: string
}

type TasksActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddNewTodolistType
export const tasksReducer = (state: TasksStateType, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [
                    {id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]
                ]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(t => (t.id === action.id
                        ? {...t, isDone: action.isDone}
                        : t)
                    )
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(t => (t.id === action.id
                        ? {...t, title: action.newTitle}
                        : t))
            }
        }
        case 'ADD-NEW-TODOLIST': {
            let newTodolistId = v1();
            return {
                ...state,
                [newTodolistId]: []
            }
        }
    }
}

export const removeTaskAC = (id: string,
                             todolistId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        id,
        todolistId,
    }
}

export const addTaskAC = (title: string,
                          todolistId: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId,
    }
}

export const changeTaskStatusAC = (id: string,
                                   isDone: boolean,
                                   todolistId: string): ChangeTaskStatusType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id,
        isDone,
        todolistId,
    }
}

export const changeTaskTitleAC = (id: string,
                                  newTitle: string,
                                  todolistId: string): ChangeTaskTitleType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        id,
        newTitle,
        todolistId,
    }
}

export const AddTodolistAC = (newTitle: string): AddNewTodolistType => {
    return {
        type: 'ADD-NEW-TODOLIST',
        newTitle,
    }
}