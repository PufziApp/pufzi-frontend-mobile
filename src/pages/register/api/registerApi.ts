import { authApi } from '../../../api/authApi'

import { registerEndpoints } from '../config/registerEndpoints'
import type { RegisterRequest, RegisterResponse } from '../types/registerTypes'

export const registerApi = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await authApi.post<RegisterResponse>(registerEndpoints.register, data)

  return response.data
}
