import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types/types"

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<BaseResponse<{ userId?: number }>>("auth/login", data)
  },
  logout() {
    return instance.delete<BaseResponse<{ userId?: number }>>("auth/login")
  },
  me() {
    return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me")
  },
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}
