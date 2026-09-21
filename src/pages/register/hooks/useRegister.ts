import { useMutation } from '@tanstack/react-query'

import { registerApi } from '../api/registerApi'

export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
  })
}
