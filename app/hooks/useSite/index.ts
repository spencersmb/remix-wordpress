import { useContext, createContext, Dispatch } from 'react'
import { ISiteAction } from './useSiteReducer'

export interface IMenu{
  menuItems: IMenuItem[]
  name: string
  slug: string
}

interface IMenuCourse {
  details: {
    url: string
    name: string
  }
}

export interface IMenuItem {
  featured:{
    courses: IMenuCourse[]
  }
  childItems: {
    edges: {node: IMenuItem}[]
  }
  id: string
  label: string
  path: string
  target: string
  title: string
  parentId: string | null
}

export interface ISiteContextState {
  recentPosts?: IPost[]
  categories?: any[]
  metadata: IMetaData
  menu: IMenu[],
  user: null | {
    isLoggedIn: boolean
  }
}
interface ISiteContextType {
  state: ISiteContextState,
  dispatch: Dispatch<ISiteAction>
}

export const siteInitialState: ISiteContextState  = {
  recentPosts: [],
  categories:[],
  metadata: {
    domain: '',
    description: '',
    language: '',
    siteTitle: '',
    social: {
      youtube: "http://youtube.com/everytues",
      twitter: {
        username: "teelacunningham",
        cardType: "summary",
        url: ''
      },
      pinterest: "http://pinterest.com/teelac",
      instagram: "http://instagram.com/everytuesday",
      facebook: {
        url: "http://facebook.com/everytues",
        defaultImage: {
          altText: "Every-Tuesday Logo Black",
          sourceUrl: "http://etheadless.local/wp-content/uploads/2013/09/et-logo-black.png",
          mediaDetails: {
            "height": 143,
            "width": 510
          }
        }
      }
    },
    title: '',
  },
  menu:[],
  user: null
}
export const SiteContext = createContext<ISiteContextType>({
  state: siteInitialState,
  dispatch: () => null
})
SiteContext.displayName = 'SiteContext'

const useSiteContext = () => {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error('useEssGridAuthContext must be used within a Auth Provider app')
  }
  return context
}

/**
 * @Component useSite
 *
 * Primary context to contain global site data like users, site metadata, menus, etc.
 *
 * Currently used to track logged in Admin user as well as Resource Library user.
 *
 */
const useSite = () => {
  const {state, dispatch} = useSiteContext()

  return {
    state,
    dispatch
  }
}

export default useSite
