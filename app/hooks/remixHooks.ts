import { useMatches } from "@remix-run/react"
import type { ISelectedMatch } from "~/interfaces/remix"

interface IProps {
  ENV: {
    APP_ROOT_URL: string, PUBLIC_WP_API_URL: string
  }
  menus: IMenu[]
  message: null | string
  metadata: ISiteMetaDataMapped
  user: {
    wpAdmin: boolean, 
    resourceUser: null | IResourceUser
  }
}
export const userStateMatches = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const matches = useMatches()
  let selectedMatchUser: undefined | ISelectedMatch = matches.find(match => match.data?.user)
  const state = selectedMatchUser?.data as IProps | undefined
  return {
    state
  }
}

export const metaDataMatches = ():{metadata: ISiteMetaDataMapped} => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const matches = useMatches()
  let selectedMatchMetaData: undefined | ISelectedMatch = matches.find(match => match.data?.metadata)
  if(!selectedMatchMetaData){
    throw new Error('no metadata found')
  }
  const {metadata} = selectedMatchMetaData?.data as IProps
  return {
    metadata
  }
}