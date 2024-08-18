import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { authAPI, LoginParamsType } from 'api/todolists-api'
import { setAppStatus } from 'app/app-reducer'
import {
  handleServerAppError,
  handleServerNetworkError,
} from 'utils/error-utils'

type AuthInitialState = {
  isLoggedIn: boolean
}

const initialState: AuthInitialState = {
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions

// thunks
export const loginTC =
  (data: LoginParamsType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedIn(true))
          dispatch(setAppStatus('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus('loading'))
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn(false))
        dispatch(setAppStatus('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
