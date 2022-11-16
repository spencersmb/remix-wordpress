import type { ISiteContextState } from './index'
import { consoleColors, consoleHelper } from '../../utils/windowUtils'
import type { IModalTemplate } from '../../components/modals/modalTypes'
import type { BreakpointEnums } from '@App/enums/breakpointEnums'

export enum ISiteTypes {
  MODAL_OPEN = 'MODAL_OPEN',
  MODAL_CLOSE = 'MODAL_CLOSE',

  LOGIN_RESOURCE_USER = 'LOGIN_RESOURCE_USER',
  LOGOUT_RESOURCE_USER = 'LOGOUT_RESOURCE_USER',

  SHOW_COMMENTS = 'SHOW_COMMENTS',
  HIDE_COMMENTS = 'HIDE_COMMENTS',
  ADD_COMMENT = 'ADD_COMMENT',
  ADD_COMMENT_REPLY = 'ADD_COMMENT_REPLY',
  FETCH_MORE_COMMENTS = 'FETCH_MORE_COMMENTS',

  UPDATE_BREAKPOINT = 'UPDATE_BREAKPOINT',
  TOGGLE_MOBILE_NAV = 'TOGGLE_MOBILE_NAV',
}
interface IOpenModal {
  type: ISiteTypes.MODAL_OPEN,
  payload: {
    template: IModalTemplate
  }
}

interface IAddComment {
  type: ISiteTypes.ADD_COMMENT,
  payload: {
    comment: IPostComment
  }
}

interface IAddCommentReply {
  type: ISiteTypes.ADD_COMMENT_REPLY,
  payload: {
    comment: IPostComment
  }
}

interface IShowComments {
  type: ISiteTypes.SHOW_COMMENTS,
  payload: {
    commentOn: number
    comments: IPostComment[],
    pageInfo: {
      hasNextPage: boolean
      endCursor: string
    }
  }
}

interface IFetchMoreComments {
  type: ISiteTypes.FETCH_MORE_COMMENTS,
  payload: {
    comments: IPostComment[],
    pageInfo: {
      hasNextPage: boolean
      endCursor: string
    }
  }
}

interface ILoginResourceUser{
  type: ISiteTypes.LOGIN_RESOURCE_USER,
  payload: {
    user: IResourceUser
  }
}

interface ILogoutResourceUser{
  type: ISiteTypes.LOGOUT_RESOURCE_USER,
}

interface IUpdateBreakpoint{
  type: ISiteTypes.UPDATE_BREAKPOINT,
  payload: {
    breakpoint: BreakpointEnums
  }
}

interface IToggleMobileNav{
  type: ISiteTypes.TOGGLE_MOBILE_NAV
}


export type ISiteAction =
| IOpenModal
| {type: ISiteTypes.MODAL_CLOSE}
| ILoginResourceUser
| IShowComments
| IAddComment
| IAddCommentReply
| {type: ISiteTypes.HIDE_COMMENTS}
| IFetchMoreComments
| IUpdateBreakpoint
| ILogoutResourceUser
| IToggleMobileNav


export const useSiteReducer = (state: ISiteContextState, action: ISiteAction): ISiteContextState => {
  consoleHelper('site reducer action', action, 'useSiteReducer()' , {bg: consoleColors.yellow, text: "#000"})
  switch (action.type) {

    case ISiteTypes.MODAL_OPEN :
      return {
        ...state,
        modal:{
          ...state.modal,
          component: action.payload.template,
          open: true,
        }
      }

    case ISiteTypes.MODAL_CLOSE :
      return {
        ...state,
        modal:{
          ...state.modal,
          open: false,
        }
      }

    case ISiteTypes.LOGIN_RESOURCE_USER : 
      return {
        ...state,
        user:{
          ...state.user,
          resourceUser: action.payload.user
        }
      }

    case ISiteTypes.LOGOUT_RESOURCE_USER : 
      return {
        ...state,
        user:{
          ...state.user,
          resourceUser: null
        }
      }
    
    case ISiteTypes.SHOW_COMMENTS:
      return {
        ...state,
        commentsModal:{
          show: true,
          commentOn: action.payload.commentOn,
          comments: action.payload.comments,
          pageInfo: action.payload.pageInfo
        }
      }

    case ISiteTypes.HIDE_COMMENTS:
      return {
        ...state,
        commentsModal:{
          show: false,
          commentOn: 0,
          comments: [],
          pageInfo: {
            hasNextPage: false,
            endCursor: ''
          }
        }
      }

    case ISiteTypes.ADD_COMMENT:{
      const comments = [
        action.payload.comment,
        ...state.commentsModal.comments
      ]
      return{
        ...state,
        commentsModal:{
          ...state.commentsModal,
          comments
        }
      }
    }

    case ISiteTypes.ADD_COMMENT_REPLY:{
      const comments = [
        action.payload.comment,
        ...state.commentsModal.comments
      ]
      const updatedComments = state.commentsModal.comments.map((comment: IPostComment) => {
          if(comment.databaseId === action.payload.comment.parent){
            const replies = comment.replies ? comment.replies : []
            const newReplies = [
              action.payload.comment,
              ...replies
            ]
            return {
              ...comment,
              replies: newReplies
            }
          }else{
            return comment
          }
      })

      // console.log('updated Comments', updatedComments)
      return{
        ...state,
        commentsModal:{
          ...state.commentsModal,
          comments: updatedComments
        }
      }
    }

    case ISiteTypes.FETCH_MORE_COMMENTS:{
      const comments = [
        ...state.commentsModal.comments,
        ...action.payload.comments
      ]
      return{
        ...state,
        commentsModal:{
          ...state.commentsModal,
          pageInfo: action.payload.pageInfo,
          comments
        }
      }
    }

    case ISiteTypes.UPDATE_BREAKPOINT:{
      return{
        ...state,
        breakpoint: action.payload.breakpoint
      }
    }

    case ISiteTypes.TOGGLE_MOBILE_NAV:{
      return{
        ...state,
        nav: {
          ...state.nav,
          mobileNav:{
            ...state.nav.mobileNav,
            isOpen: !state.nav.mobileNav.isOpen
          }
        }
      }
    }

    default: {
      // throw new Error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}
