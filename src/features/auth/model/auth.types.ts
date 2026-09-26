export interface IRequestTokenResponse {
  success: boolean
  expires_at: string
  request_token: string
}

export interface ICreateSessionRequest {
  request_token: string
}

export interface ICreateSessionResponse {
  success: boolean
  session_id: string
}
