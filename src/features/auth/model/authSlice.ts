import {
  createSlice,
  isAnyOf,
  isFulfilled,
  PayloadAction,
} from '@reduxjs/toolkit'
import { appActions } from 'app/model/appSlice'
import { clearTasksAndTodolists } from 'common/actions'
import { ResultCode } from 'common/enums'
import {
  createAppAsyncThunk,
  handleServerAppError,
  thunkTryCatch,
} from 'common/utils'
import { authAPI, LoginParamsType } from 'features/auth/api/authApi'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(login.fulfilled, logout.fulfilled, initializeApp.fulfilled),
      (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn
      }
    )
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `${slice.name}/login`,
  (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.login(arg)
      if (res.data.resultCode === ResultCode.Success) {
        return { isLoggedIn: true }
      } else {
        const isShowAppError = !res.data.fieldsErrors.length
        handleServerAppError(res.data, dispatch, isShowAppError)
        return rejectWithValue(res.data)
      }
    })
  }
)

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/logout`,
  (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.logout()
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(clearTasksAndTodolists())
        return { isLoggedIn: false }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    })
  }
)

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/initializeApp`,
  async (_, { rejectWithValue, dispatch }) => {
    const res = await authAPI.me().finally(() => {
      dispatch(appActions.setAppInitialized({ isInitialized: true }))
    })
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

export const authReducer = slice.reducer
export const authThunks = { login, logout, initializeApp }
export const { selectIsLoggedIn } = slice.selectors
export const authPath = slice.reducerPath
