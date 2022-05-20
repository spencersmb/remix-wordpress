import type { Dispatch, ReactElement, FunctionComponent } from 'react';
import { useContext, createContext } from 'react'
import type { ISiteAction} from './useSiteReducer';
import { ISiteTypes } from './useSiteReducer'
import type { IModalTemplate } from '../../components/modals/modalTypes'
import type { IWPMenu} from '~/lib/wp/site';
import { siteInfo, socialUrls } from '~/lib/wp/site'
import { ShopPlatformEnum } from "../../enums/products";
import { BreakpointEnums } from '../useWindowResize';

export interface ISiteContextState {
  recentPosts?: IPost[]
  categories?: any[]
  metadata: ISiteMetaDataMapped
  menu: IWPMenu[],
  user: {
    wpAdmin: boolean
    resourceUser: IResourceUser | null
  }
  modal: {
    open: boolean,
    component: IModalTemplate
  },
  commentsModal:{
    show: boolean,
    commentOn: number
    comments: IPostComment[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string
    }
  },
  breakpoint: BreakpointEnums
}
interface ISiteContextType {
  state: ISiteContextState,
  dispatch: Dispatch<ISiteAction>
}

export const siteInitialState: ISiteContextState  = {
  recentPosts: [],
  categories:[],
  metadata: {
    ...siteInfo,
    domain: '',
    social: {
      youtube: socialUrls.youtube,
      twitter: {
        username: "teelacunningham",
        cardType: "summary",
        url: socialUrls.twitter
      },
      pinterest: socialUrls.pinterest,
      instagram: socialUrls.instagram,
      facebook: socialUrls.facebook,
    },
    serverSettings:{
      productPlatform: ShopPlatformEnum.GUMROAD,
    },
    courseLaunchBanners:{
      basicBanner:{
        showBanner: false,
        color: 'null',
        endDate: 'null',
        title: 'null',
        url: 'null'
      },
      lfmBanner:{
        showBanner: false,
        endDate: 'null'
      }
    }
  },
  menu:[],
  user: {
    resourceUser: null,
    wpAdmin: false
  },
  modal:{
    open: false,
    component: null
  },
  commentsModal:{
    show: false,
    commentOn: 0,
    comments: [],
    pageInfo: {
      hasNextPage: false,
      endCursor: ''
    }
  },
  breakpoint: BreakpointEnums.mobile
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

  const resourecLibraryLogin = (data: {user: IResourceUser}) => {
    dispatch({
      type: ISiteTypes.LOGIN_RESOURCE_USER,
      payload:{
        user: data.user
      }
    })
  }

   const resourecLibraryLogout = () => {
    dispatch({
      type: ISiteTypes.LOGOUT_RESOURCE_USER,
    })
  }

  const showComments = (data: {
    commentOn: number
    comments: IPostComment[]
    pageInfo:{
      hasNextPage: boolean
      endCursor: string
    }
  }) => {
    dispatch({
      type: ISiteTypes.SHOW_COMMENTS,
      payload: data
    })
  }

  const hideComments = () => {
    dispatch({
      type: ISiteTypes.HIDE_COMMENTS,
    })
  }

  const addComment = (data: {
    comment: IPostComment
  }) => {
    dispatch({
      type: ISiteTypes.ADD_COMMENT,
      payload: data
    })
  }

  const addCommentReply = (data: {
    comment: IPostComment
  }) => {
    dispatch({
      type: ISiteTypes.ADD_COMMENT_REPLY,
      payload: data
    })
  }


  const fetchMoreComments = (data: {comments: IPostComment[], pageInfo: {hasNextPage: boolean, endCursor: string}}) => {
    dispatch({
      type: ISiteTypes.FETCH_MORE_COMMENTS,
      payload: data
    })
  }

  const updateBreakpoint = (breakpoint: BreakpointEnums) => {
     dispatch({
      type: ISiteTypes.UPDATE_BREAKPOINT,
      payload: {
        breakpoint
      }
    })
  }

  return {
    openModal,
    closeModal,
    resourecLibraryLogin,
    resourecLibraryLogout,
    showComments,
    hideComments,
    addComment,
    addCommentReply,
    fetchMoreComments,
    updateBreakpoint,
    state,
    dispatch
  }
}

export default useSite
