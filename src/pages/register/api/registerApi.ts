import { api } from '../../../api/api'

import { registerEndpoints } from '../config/registerEndpoints'
import { RegisterRequest, RegisterResponse } from '../types/registerTypes'

export const registerApi = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(registerEndpoints.register, data)

  return response.data
}
