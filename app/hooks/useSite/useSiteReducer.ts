import { ISiteContextState } from './index'
import { consoleHelper } from '../../utils/windowUtils'
import { IModalTemplate } from '../../components/modals/modalTypes'

export enum ISiteTypes {
  MODAL_OPEN = 'MODAL_OPEN',
  MODAL_CLOSE = 'MODAL_CLOSE',
  LOGIN_RESOURCE_USER = 'LOGIN_RESOURCE_USER',
  SHOW_COMMENTS = 'SHOW_COMMENTS',
  HIDE_COMMENTS = 'HIDE_COMMENTS',
  ADD_COMMENT = 'ADD_COMMENT',
  ADD_COMMENT_REPLY = 'ADD_COMMENT_REPLY',
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
    comments: IPostComment[]
  }
}

interface ILoginResourceUser{
  type: ISiteTypes.LOGIN_RESOURCE_USER,
  payload: {
    user: IResourceUser
  }
}

export type ISiteAction =
| IOpenModal
| {type: ISiteTypes.MODAL_CLOSE}
| ILoginResourceUser
| IShowComments
| IAddComment
| IAddCommentReply
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
          ...state.user,
          resourceUser: action.payload.user
        }
      }
    
    case ISiteTypes.SHOW_COMMENTS:
      return {
        ...state,
        commentsModal:{
          show: true,
          commentOn: action.payload.commentOn,
          comments: action.payload.comments,
        }
      }

    case ISiteTypes.HIDE_COMMENTS:
      return {
        ...state,
        commentsModal:{
          show: false,
          commentOn: 0,
          comments: []
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
            const newReplies = [
              action.payload.comment,
              ...comment.replies
            ]
            return {
              ...comment,
              replies: newReplies
            }
          }else{
            return comment
          }
      })

      console.log('updated Comments', updatedComments)
      return{
        ...state,
        commentsModal:{
          ...state.commentsModal,
          comments: updatedComments
        }
      }
    }
    default: {
      // throw new Error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}
