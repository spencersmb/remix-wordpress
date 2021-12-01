
export const Auth = `
  mutation LOGIN ( $input: LoginInput!) {
      login(input: $input) {
          authToken
          refreshToken
          clientMutationId
          user {
              id
              username
              name
              email
              firstName
              lastName
          }
      }
  }
`

export const REFRESH_LOGIN = `
  mutation RefreshAuthToken( $input: RefreshJwtAuthTokenInput!) {
        refreshJwtAuthToken(input: $input) {
            authToken
        }
    }
`
