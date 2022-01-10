import { useMatches } from "remix"
import { ISelectedMatch } from "~/interfaces/remix"

interface IProps {
  ENV: {
    APP_ROOT_URL: string, PUBLIC_WP_API_URL: string
  }
  menus: IMenu[]
  message: null | string
  metadata: IMetaData
  user: {
    wpAdmin: boolean, 
    resourceUser: null | IResourceUser
  }
}
export const userStateMatches = () => {
  const matches = useMatches()
  let selectedMatchUser: undefined | ISelectedMatch = matches.find(match => match.data?.user)
  const state = selectedMatchUser?.data as IProps | undefined
  return {
    state
  }
}