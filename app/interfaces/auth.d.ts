interface IAuthToken {
  token: string
  refresh: string
  cmid: string
  expires: number
}
interface IAuthRefreshResponse{
  data:{
    refreshJwtAuthToken:{
      authToken: string
    }
  }
}

interface IUser {
  id: string
  username: string
  name: string
  email: string
  firstName: string | null
  lastName: string | null
}
