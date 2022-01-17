import { useEffect, useState } from "react";
import { fetchFontPreviewFile } from "~/utils/fetch";

export function useFonts(fontSlug: string){
  const [state, setState] = useState('idle')

  useEffect(() => {
      async function loadFonts() {
        try {
          setState('loading')
          const data: { font: IFontFamily } = await fetchFontPreviewFile(fontSlug)

          let myFonts: FontFace[] = []
          data.font.files.map((file) => {
            const fontUrl = `.${file.url}`
            myFonts.push(new FontFace(file.family, `url(${fontUrl})`))
          })

          myFonts.forEach(async (item) => {
            console.log('load font', item);
            
            try {
              const promise = await item.load()
              document.fonts.add(promise)
            } catch (e) {
              console.error('Font:', item);
              console.error('Font error', e);
            }
          })
          setState('completed')
          
        } catch (e) {
          setState('idle')
          console.error('Font Loading Error', e)
        }
      }
      const font = loadFonts();
  }, [])
  return {
    fontLoadingState:state
  }
}