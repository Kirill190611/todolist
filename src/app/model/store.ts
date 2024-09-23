import { configureStore } from '@reduxjs/toolkit'
import { appPath, appReducer } from 'app/model/appSlice'
import { authPath, authReducer } from 'features/auth/model/authSlice'
import {
  tasksPath,
  tasksReducer,
} from 'features/todolistsList/model/tasksSlice'
import {
  todolistsPath,
  todolistsReducer,
} from 'features/todolistsList/model/todolistsSlice'

export const store = configureStore({
  reducer: {
    [tasksPath]: tasksReducer,
    [todolistsPath]: todolistsReducer,
    [appPath]: appReducer,
    [authPath]: authReducer,
  },
})

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch