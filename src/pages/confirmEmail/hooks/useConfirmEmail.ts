import { useMutation } from '@tanstack/react-query'

import { confirmEmailApi } from '../api/confirmEmailApi'

export const useConfirmEmail = () => {
  return useMutation({
    mutationFn: confirmEmailApi,
  })
}
