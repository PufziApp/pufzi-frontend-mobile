import { authApi } from '../../../api/authApi'

import { authEndpoints } from '../config/authEndpoints'
import type { RefreshRequest, RefreshResponse } from '../types/refreshTypes'

export const refreshApi = async (data: RefreshRequest): Promise<RefreshResponse> => {
  const response = await authApi.post<RefreshResponse>(authEndpoints.refresh, data)

  return response.data
}
