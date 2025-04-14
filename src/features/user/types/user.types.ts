export interface IUserDetails {
  id: number
  username: string
  email: string
  name: string
  avatar?: {
    tmdb?: {
      avatar_path?: string
    }
  }
}

export interface IUserDetailsResponse {
  data: IUserDetails
}

export interface IUserDetailsError {
  status_code: number
  status_message: string
}
