import { useContext, createContext, Dispatch } from 'react'
import { ISiteAction } from './useSiteReducer'

// CREATE A NEW CONTEXT JUST FOR MODALS

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
// export const SiteContext = createContext<ISiteContextState>(siteInitialState)

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
 * useSite
 */
const useSite = () => {
  const {state, dispatch} = useSiteContext()
  // const logUserIn = (options: { modal: boolean } = {modal: false} ) => {
  //   //close modal
  //   if(options?.modal){
  //     // dispatch({type: EssAuthTypes.MODAL_CLOSE})
  //   }
  //   dispatch({
  //     type: EssAuthTypes.LOGIN
  //   })
  // }
  // const logoutAction = () => {
  //   dispatch({
  //     type: EssAuthTypes.LOGOUT
  //   })
  // }

  return {
    // logUserIn,
    // logoutAction,
    // getLogOutBtnProps,
    // getOpenModalProps,
    // openModal,
    // closeModal,
    // loginAction,
    state,
    dispatch
  }
}
// export default function useSite() {
//   const site = useContext(SiteContext);
//   return site;
// }

export default useSite
