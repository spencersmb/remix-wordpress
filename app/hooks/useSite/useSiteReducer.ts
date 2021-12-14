import { ISiteContextState } from './index'
import { consoleHelper } from '../../utils/windowUtils'
import { IModalTemplate } from '../../components/modals/modalTypes'

export enum ISiteTypes {
  MODAL_OPEN = 'MODAL_OPEN',
  MODAL_CLOSE = 'MODAL_CLOSE',
  LOGIN_RESOURCE_USER = 'LOGIN_RESOURCE_USER',
}
interface IOpenModal {
  type: ISiteTypes.MODAL_OPEN,
  payload: {
    template: IModalTemplate
  }
}
export type ISiteAction =
  | IOpenModal
  | {type: ISiteTypes.MODAL_CLOSE}
  | {type: ISiteTypes.LOGIN_RESOURCE_USER}

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
    default: {
      // throw new Error(`Unhandled action type: ${action.type}`)
      return state
    }
  }
}
