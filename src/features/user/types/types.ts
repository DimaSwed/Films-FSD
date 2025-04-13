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
