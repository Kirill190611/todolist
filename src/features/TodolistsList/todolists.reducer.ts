import {
  TodolistType,
  handleServerNetworkError,
  clearTasksAndTodolists,
  createAppAsyncThunk,
  handleServerAppError,
} from 'common'
import { appActions, RequestStatusType } from 'app/app.reducer'
import { AppThunk } from 'app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistsAPI } from 'features/TodolistsList/Todolist/todolists-api'

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id)
      if (index !== -1) state.splice(index, 1)
      // return state.filter(tl => tl.id !== action.payload.id)
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      const newTodolist: TodolistDomainType = {
        ...action.payload.todolist,
        filter: 'all',
        entityStatus: 'idle',
      }
      state.unshift(newTodolist)
    },
    changeTodolistTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.title = action.payload.title
      }
    },
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.id)
      if (todo) {
        todo.entityStatus = action.payload.entityStatus
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearTasksAndTodolists, () => {
        return []
      })
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({
          ...tl,
          filter: 'all',
          entityStatus: 'idle',
        }))
      })
  },
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

// thunks
export const fetchTodolistsTC = createAppAsyncThunk<
  {
    todolists: TodolistType[]
  },
  void
>('todolists/fetch-task', async (arg, { dispatch, rejectWithValue }) => {
  try {
    const res = await todolistsAPI.getTodolists()
    return { todolists: res.data }
  } catch (e: any) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

export const removeTodolistTC = (id: string): AppThunk => {
  return (dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(
      todolistsActions.changeTodolistEntityStatus({
        id,
        entityStatus: 'loading',
      })
    )
    todolistsAPI.deleteTodolist(id).then((res) => {
      dispatch(todolistsActions.removeTodolist({ id }))
      //скажем глобально приложению, что асинхронная операция завершена
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    })
  }
}
export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }))
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    })
  }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(todolistsActions.changeTodolistTitle({ id, title }))
    })
  }
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
