import { api } from '../../../api/api'
import { loginEndpoints } from '../config/loginEndpoints'
import { LoginRequest, LoginResponse } from '../types/loginTypes'

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  console.log('LOGIN API START', data.email)
  const response = await api.post<LoginResponse>(loginEndpoints.login, data)
  console.log('LOGIN API SUCCESS', response.status)
  return response.data
}
