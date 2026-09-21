import axios from 'axios'

import { api } from '../../../api/api'
import { googleAuthEndpoints } from '../config/googleAuthEndpoints'
import { GoogleAuthRequest, GoogleAuthResponse } from '../types/googleAuthTypes'

export const googleAuthApi = async (data: GoogleAuthRequest): Promise<GoogleAuthResponse> => {
  try {
    console.log('PUFZI GOOGLE: sending request')

    const response = await api.post<GoogleAuthResponse>(googleAuthEndpoints.google, data)

    console.log('PUFZI GOOGLE: request successful')

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('PUFZI GOOGLE STATUS:', error.response?.status)
      console.log('PUFZI GOOGLE ERROR:', error.response?.data)
      console.log('PUFZI GOOGLE URL:', error.config?.baseURL, error.config?.url)
    } else {
      console.log('PUFZI GOOGLE UNKNOWN ERROR:', error)
    }

    throw error
  }
}
