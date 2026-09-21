export type GoogleAuthRequest = {
  idToken: string
}

export type GoogleAuthResponse = {
  accessToken: string
  refreshToken: string
  accessTokenExpiresAt: string
}
