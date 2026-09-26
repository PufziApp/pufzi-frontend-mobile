import { authApi } from '../../../api/authApi'

import { googleAuthEndpoints } from '../config/googleAuthEndpoints'
import type { GoogleLoginRequest, GoogleLoginResponse } from '../types/googleAuthTypes'

export const googleAuthApi = async (data: GoogleLoginRequest): Promise<GoogleLoginResponse> => {
  const response = await authApi.post<GoogleLoginResponse>(googleAuthEndpoints.google, data)

  return response.data
}
