import { useMutation } from '@tanstack/react-query'

import { googleAuthApi } from '../api/googleAuthApi'

export const useGoogleAuth = () => {
  return useMutation({
    mutationFn: googleAuthApi,
  })
}
