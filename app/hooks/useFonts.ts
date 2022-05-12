import { useEffect, useState } from "react";
import { fetchFontPreviewFile } from "~/utils/fetch";

interface FontState {
  status: string
  font: null | IFontFamily
  fontName: null | string
}
export type ISetFontFunction = (fontSlug: string | null) => (event: IClickEvent) => void;
export function useFonts(){
  const [state, setState] = useState<FontState>({
    status: 'idle',
    font: null,
    fontName: null
  })

  // function checkFonts(){
  //   const check = document.fonts.check(`12px ${fontSlug}`)
  //   return check
  // }

  function loadFont(fontSlug: string){
    setState((localState) =>{
      return {
      ...localState,
      fontName: fontSlug,
      }
    })
  }

  const setFontClickHandler: ISetFontFunction = (fontName) => (event) => {
    event.preventDefault();

    if (fontName) loadFont(fontName);
  }

  useEffect(() => {
    if(!state.fontName) return 
    
    console.log('Start')
    let myFonts: FontFace[] = []
      async function loadFonts() {
        try {
          setState({
            ...state,
            status: 'loading',
            font: null
          })

          if(!state.fontName){
            return
          }
          const data: { font: IFontFamily } = await fetchFontPreviewFile(state.fontName)
          
          data.font.files.map((file) => {
            const fontUrl = `.${file.url}`
            myFonts.push(new FontFace(file.family, `url(${fontUrl})`))
          })
          console.log('myFonts', myFonts);
          
          myFonts.forEach(async (item) => {
            
            try {
              const promise = await item.load()
              
              document.fonts.add(promise)
              
            } catch (e) {
              console.error('Font:', item);
              console.error('Font error', e);
            }
          })
          setState({
            ...state,
            status: 'completed',
            font: data.font
          })
          
        } catch (e) {
          setState({
            ...state,
            status: 'idle',
            font: null
          })
          console.error('Font Loading Error', e)
        }
      }

      loadFonts()

      return ()=>{
        // Optinally delete font
        myFonts.map(font => {
          document.fonts.delete(font)
        })
      }
  }, [state.fontName])

  return {
    setFontClickHandler,
    fontLoadingState: state
  }
}