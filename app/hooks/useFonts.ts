import { useEffect, useState } from "react";
import { fetchFontPreviewFile } from "~/utils/fetch";

interface FontState {
  status: string
  font: null | IFontFamily
}
export function useFonts(fontSlug: string){
  const [state, setState] = useState<FontState>({
    status: 'idle',
    font: null
  })

  function checkFonts(){
    const check = document.fonts.check(`12px ${fontSlug}`)
    return check
  }

  useEffect(() => {
    console.log('Start')
    let myFonts: FontFace[] = []
      async function loadFonts() {
        try {
          setState({
            status: 'loading',
            font: null
          })
          const data: { font: IFontFamily } = await fetchFontPreviewFile(fontSlug)
          
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
            status: 'completed',
            font: data.font
          })
          
        } catch (e) {
          setState({
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
  }, [])
  return {
    fontLoadingState:state
  }
}