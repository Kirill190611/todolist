import { createSlice } from '@reduxjs/toolkit'
import { appActions } from 'app/app.reducer'
import { authAPI, LoginParamsType } from 'features/auth/auth.api'
import { clearTasksAndTodolists } from 'common/actions'
import { createAppAsyncThunk, handleServerAppError } from 'common/utils'
import { Simulate } from 'react-dom/test-utils'
import error = Simulate.error
import { thunkTryCatch } from 'common/utils/thunkTryCatch'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
})

// thunks
export const login = createAppAsyncThunk<
  { isLoggedIn: boolean },
  LoginParamsType
>(`${slice.name}/login`, (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.login(arg)
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      return { isLoggedIn: true }
    } else {
      const isShowAppError = !res.data.fieldsErrors.length
      handleServerAppError(res.data, dispatch, isShowAppError)
      return rejectWithValue(res.data)
    }
  })
})

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/logout`,
  (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.logout()
      if (res.data.resultCode === 0) {
        dispatch(clearTasksAndTodolists())
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
        return { isLoggedIn: false }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    })
  }
)

export const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/initializeApp`,
  (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.me()
      if (res.data.resultCode === 0) {
        return { isLoggedIn: true }
      } else {
        handleServerAppError(res.data, dispatch, false)
        return rejectWithValue(null)
      }
    }).finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }))
    })
  }
)

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = { login }
