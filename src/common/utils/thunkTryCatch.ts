import { appActions } from 'app/app.reducer'
import { handleServerNetworkError } from 'common/utils/handle-server-network-error'
import { AppDispatch } from 'app/store'

type ThunkApi = {
  dispatch: AppDispatch
  rejectWithValue: any
}

export const thunkTryCatch = async (
  thunkAPI: ThunkApi,
  logic: () => Promise<any>
) => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppStatus({ status: 'loading' }))
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(appActions.setAppStatus({ status: 'idle' }))
  }
}
