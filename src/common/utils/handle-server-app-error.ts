import { Dispatch } from 'redux'
import { appActions } from 'app/app.reducer'
import { BaseResponse } from 'common/types/common.types'

/**
 * Обрабатывает ошибки сервера и обновляет состояние приложения.
 *
 * @template D - Тип данных, ожидаемых в ответе сервера.
 * @param data - Ответ от сервера, содержащий данные и сообщения об ошибках.
 * @param dispatch - функция для отправки действий (actions) в Redux хранилище.
 * @param isShowGlobalError - Флаг, указывающий, нужно ли показывать глобальную ошибку.
 * @returns nothing return
 */

export const handleServerAppError = <D>(
  data: BaseResponse<D>,
  dispatch: Dispatch,
  isShowGlobalError: boolean = true
): void => {
  if (isShowGlobalError) {
    const error = data.messages.length
      ? data.messages[0]
      : 'Some error occurred'
    dispatch(appActions.setAppError({ error: error }))
  }
  dispatch(appActions.setAppStatus({ status: 'failed' }))
}
