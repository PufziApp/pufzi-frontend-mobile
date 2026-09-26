import { authApi } from '../../../api/authApi'

import { loginEndpoints } from '../config/loginEndpoints'
import type { LoginRequest, LoginResponse } from '../types/loginTypes'

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await authApi.post<LoginResponse>(loginEndpoints.login, data)

  return response.data
}
