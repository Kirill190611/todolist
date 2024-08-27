import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  todolistsAPI,
} from 'api/todolists-api'
import { AppThunk } from 'app/store'
import {
  handleServerAppError,
  handleServerNetworkError,
} from 'utils/error-utils'
import { todolistsActions } from 'features/TodolistsList/todolists.reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearTasksAndTodolists } from 'common/actions/common.actions'
import { createAppAsyncThunk } from 'hooks/use-app-async-thunk'

const initialState: TasksStateType = {}

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    removeTask: (
      state,
      action: PayloadAction<{ taskId: string; todolistId: string }>
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) tasks.splice(index, 1)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(clearTasksAndTodolists, () => {
        return {}
      })
      .addCase(fetchTasksTC.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.model }
        }
      })
  },
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

// thunks
export const fetchTasksTC = createAppAsyncThunk<
  {
    tasks: TaskType[]
    todolistId: string
  },
  string
>('tasks/fetch-task', async (todolistId, { rejectWithValue, dispatch }) => {
  try {
    const res = await todolistsAPI.getTasks(todolistId)
    return { tasks: res.data.items, todolistId }
  } catch (e: any) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

export const addTaskTC = createAppAsyncThunk<
  {
    task: TaskType
  },
  {
    todolistId: string
    title: string
  }
>(
  'tasks/add-task',
  async ({ todolistId, title }, { dispatch, rejectWithValue }) => {
    try {
      const res = await todolistsAPI.createTask(todolistId, title)
      if (res.data.resultCode === 0) {
        return { task: res.data.data.item }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)

export const removeTaskTC =
  (taskId: string, todolistId: string): AppThunk =>
  (dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then(() => {
      dispatch(tasksActions.removeTask({ taskId, todolistId }))
    })
  }

type UpdateTaskThunk = {
  taskId: string
  model: UpdateDomainTaskModelType
  todolistId: string
}

export const updateTaskTC = createAppAsyncThunk<
  UpdateTaskThunk,
  UpdateTaskThunk
>(
  'tasks/update-task',
  async (
    { taskId, todolistId, model },
    { dispatch, getState, rejectWithValue }
  ) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => t.id === taskId)
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn('task not found in the state')
      return rejectWithValue(null)
    }

    try {
      const res = await todolistsAPI.updateTask(todolistId, taskId, {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...model,
      })
      if (res.data.resultCode === 0) {
        return { taskId, model: model, todolistId }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  }
)

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
