import { useContext, createContext, Dispatch, ReactElement, FunctionComponent } from 'react'
import { ISiteAction, ISiteTypes } from './useSiteReducer'
import { IModalTemplate } from '../../components/modals/modalTypes'

export interface ISiteContextState {
  recentPosts?: IPost[]
  categories?: any[]
  metadata: IMetaData
  menu: IMenu[],
  user: null | {
    wpAdmin: boolean | undefined
    resourceUser: boolean | undefined
  }
  modal: {
    open: boolean,
    component: IModalTemplate
  },
  commentsModal:{
    show: boolean,
    comments: any // TODO: FILL OUT
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
  user: null,
  modal:{
    open: false,
    component: null
  },
  commentsModal:{
    show: false,
    comments: []
  }
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

  const openModal = ({template}: {template: FunctionComponent | ReactElement}) => {
    dispatch({
      type: ISiteTypes.MODAL_OPEN,
      payload: {template}
    })
  }

  const closeModal = () => {
    dispatch({
      type: ISiteTypes.MODAL_CLOSE,
    })
  }

  const resourecLibraryLogin = () => {
    dispatch({
      type: ISiteTypes.LOGIN_RESOURCE_USER,
    })
  }

  const showComments = (data: IPostComments) => {
    dispatch({
      type: ISiteTypes.SHOW_COMMENTS,
      payload: data
    })
  }

  return {
    openModal,
    closeModal,
    resourecLibraryLogin,
    showComments,
    state,
    dispatch
  }
}

export default useSite
