import { GoogleSignin } from '@react-native-google-signin/google-signin'

export const configureGoogleAuth = () => {
  GoogleSignin.configure({
    webClientId: '1065389661172-89djj99pj9c0nrgc0bpp2m8qjrvfohk3.apps.googleusercontent.com',
    offlineAccess: false,
  })
}
