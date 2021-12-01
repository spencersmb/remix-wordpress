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
