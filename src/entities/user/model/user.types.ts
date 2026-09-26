export interface IUserDetails {
  id: number
  name: string
  username: string
  email?: string
  iso_639_1?: string
  iso_3166_1?: string
  avatar?: {
    gravatar?: {
      hash?: string
    }
    tmdb?: {
      avatar_path?: string | null
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
