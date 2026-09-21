export type RootStackParamList = {
  Onboarding: undefined
  Login: undefined
  Register: undefined
  CheckEmail: {
    email: string
  }
  ConfirmEmail: {
    token: string
  }
  Home: undefined
}
