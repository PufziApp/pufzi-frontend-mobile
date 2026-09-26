import { authApi } from '../../../api/authApi'

import { authEndpoints } from '../config/authEndpoints'

export const logoutApi = async (refreshToken: string): Promise<void> => {
  await authApi.post(authEndpoints.logout, {
    refreshToken,
  })
}
