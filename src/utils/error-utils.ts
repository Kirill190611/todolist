import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";
import {setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType} from "../app/app-reducer";

type ErrorUtilsDispatchTypes = Dispatch<SetAppErrorType | SetAppStatusType>

export const handleServerAppError = <T,>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchTypes) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchTypes) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}