import { useMutation } from '@tanstack/react-query'
import { loginApi } from '../api/loginApi'

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  })
}
