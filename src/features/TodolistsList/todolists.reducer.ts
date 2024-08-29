import {
  TodolistType,
  handleServerNetworkError,
  clearTasksAndTodolists,
  createAppAsyncThunk,
  handleServerAppError,
} from 'common'
import { RequestStatusType } from 'app/app.reducer'
import { AppThunk } from 'app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistsAPI } from 'features/TodolistsList/Todolist/todolists-api'

const initialState: TodolistDomainType[] = []

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
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
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = {
          ...action.payload.todolist,
          filter: 'all',
          entityStatus: 'idle',
        }
        state.unshift(newTodolist)
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
>('todolists/fetch-todolists', async (arg, { dispatch, rejectWithValue }) => {
  try {
    const res = await todolistsAPI.getTodolists()
    return { todolists: res.data }
  } catch (e: any) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

export const removeTodolistTC = createAppAsyncThunk<
  {
    id: string
  },
  string
>('todolists/remove-todolist', async (id, { dispatch, rejectWithValue }) => {
  try {
    dispatch(
      todolistsActions.changeTodolistEntityStatus({
        id,
        entityStatus: 'loading',
      })
    )
    const res = await todolistsAPI.deleteTodolist(id)
    if (res.data.resultCode === 0) {
      return { id }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e: any) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

export const addTodolistTC = createAppAsyncThunk<
  {
    todolist: TodolistType
  },
  string
>('todolists/add-todolist', async (title, { dispatch, rejectWithValue }) => {
  try {
    const res = await todolistsAPI.createTodolist(title)
    if (res.data.resultCode === 0) {
      return { todolist: res.data.data.item }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (e: any) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  }
})

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
