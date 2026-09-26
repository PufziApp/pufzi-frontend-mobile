import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin'
import { Platform } from 'react-native'

export const signInWithGoogle = async (): Promise<string | null> => {
  try {
    if (Platform.OS === 'android') {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      })
    }

    console.log('GOOGLE: starting sign in')

    const response = await GoogleSignin.signIn()

    console.log('GOOGLE RESPONSE:', response)

    if (!isSuccessResponse(response)) {
      console.log('GOOGLE: sign in was not successful')
      return null
    }

    const idToken = response.data.idToken

    if (!idToken) {
      throw new Error('Google nu a returnat un ID token')
    }

    console.log('GOOGLE: sign in successful')

    return idToken
  } catch (error) {
    if (isErrorWithCode(error)) {
      console.log('GOOGLE ERROR CODE:', error.code)
      console.log('GOOGLE ERROR:', error)
    } else {
      console.log('GOOGLE UNKNOWN ERROR:', error)
    }

    throw error
  }
}
