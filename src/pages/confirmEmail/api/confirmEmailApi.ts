import { api } from '../../../api/api'

import { confirmEmailEndpoints } from '../config/confirmEmailEndpoints'
import type { ConfirmEmailRequest, ConfirmEmailResponse } from '../types/confirmEmailTypes'

export const confirmEmailApi = async (data: ConfirmEmailRequest): Promise<ConfirmEmailResponse> => {
  const response = await api.post<ConfirmEmailResponse>(confirmEmailEndpoints.confirmEmail, data)

  return response.data
}
