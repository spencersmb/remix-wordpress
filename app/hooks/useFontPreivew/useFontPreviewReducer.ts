import { consoleHelper } from "~/utils/windowUtils"
import { IFpState } from "."

export enum IFontPreviewEnums {
  ADD_FONT = 'ADD_FONT',
}

interface IAddFont {
  type: IFontPreviewEnums.ADD_FONT,
  payload: {}
}
export type IFontPreviewActions = 
  | IAddFont

export const useFontPreviewReducer = (fontPreview: IFpState, action: IFontPreviewActions): IFpState => {
  consoleHelper('site reducer action', action)
  switch (action.type) {
    default : 
      return fontPreview
  }
}