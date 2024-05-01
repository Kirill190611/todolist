import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>


export type TasksActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistActionType
    | RemoveTodolistActionType

export let initialTasksState: TasksStateType = {}
export const tasksReducer = (state = initialTasksState, action: TasksActionsType): TasksStateType => {
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
        case 'ADD-TODOLIST': {
           return {
               ...state,
               [action.todolistId]: []
           }
        }
        case 'REMOVE-TODOLIST': {
            /*let copyState = {...state};
            delete copyState[action.id]
            return copyState;*/

            let {[action.id]: [], ...rest} = state
            return rest;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (id: string,
                             todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        id,
        todolistId,
    } as const
}

export const addTaskAC = (title: string,
                          todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId,
    } as const
}

export const changeTaskStatusAC = (id: string,
                                   isDone: boolean,
                                   todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id,
        isDone,
        todolistId,
    } as const
}

export const changeTaskTitleAC = (id: string,
                                  newTitle: string,
                                  todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        id,
        newTitle,
        todolistId,
    } as const
}
