import { useContext, createContext} from 'react'

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
  menu: IMenu[]
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
  menu:[]
}
export const SiteContext = createContext<ISiteContextState>(siteInitialState)
SiteContext.displayName = 'SiteContext'

/**
 * useSite
 */

export default function useSite() {
  const site = useContext(SiteContext);
  return site;
}

