import { ISiteContextState } from './index'
import { consoleHelper } from '../../utils/windowUtils'
import { IModalTemplate } from '../../components/modals/modalTypes'

export enum ISiteTypes {
  MODAL_OPEN = 'MODAL_OPEN',
  MODAL_CLOSE = 'MODAL_CLOSE',
  LOGIN_RESOURCE_USER = 'LOGIN_RESOURCE_USER',
  SHOW_COMMENTS = 'SHOW_COMMENTS',
  HIDE_COMMENTS = 'HIDE_COMMENTS',
}
interface IOpenModal {
  type: ISiteTypes.MODAL_OPEN,
  payload: {
    template: IModalTemplate
  }
}
interface IShowComments {
  type: ISiteTypes.SHOW_COMMENTS,
  payload: {
    commentOn: number
    parent?: number
    comments: IPostComment[]
  }
}

export type ISiteAction =
| IOpenModal
| {type: ISiteTypes.MODAL_CLOSE}
| {type: ISiteTypes.LOGIN_RESOURCE_USER}
| IShowComments
| {type: ISiteTypes.HIDE_COMMENTS}

export const useSiteReducer = (state: ISiteContextState, action: ISiteAction): ISiteContextState => {
  consoleHelper('site reducer action', action)
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
          wpAdmin: state.user?.wpAdmin,
          resourceUser: true
        }
      }
    
    case ISiteTypes.SHOW_COMMENTS:
      return {
        ...state,
        commentsModal:{
          show: true,
          commentOn: action.payload.commentOn,
          comments: action.payload.comments,
          parent: action.payload.parent
        }
      }

    case ISiteTypes.HIDE_COMMENTS:
      return {
        ...state,
        commentsModal:{
          show: false,
          commentOn: 0,
          parent: undefined,
          comments: []
        }
      }
    default: {
      // throw new Error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}
