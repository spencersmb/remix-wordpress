import { useEffect, useRef } from "react"

/* @Component useHtmlEvent
Attach click handlers to an array of ids, then clean up after
*/
export function useEventListenerID(ids: string[], clickHandler: (e: MouseEvent) => void){
  const elemRef = useRef<null | (HTMLElement | null)[]>()
  useEffect(() => {
        elemRef.current = ids.map(id => {
          const el = document.getElementById(id)
          el?.addEventListener('click', clickHandler)
          return el
        });
    return () => {
      elemRef.current?.map(elemRef => {
        if(elemRef){
          elemRef.removeEventListener('click', clickHandler)
        }
      });
    }
  }, [])
  
}

/* @Component useEventListenerQueryAll
*
* Query Hook to attach event handler for all dom elements
*/
export function useEventListenerQueryAll(className: string, clickHandler: (event: any | null) => void){
  const elementsRef = useRef<NodeList>()
  useEffect(() => {
    elementsRef.current = document.querySelectorAll(className);
    
    [...elementsRef.current].map(el => {
      el?.addEventListener('click', clickHandler)
      return el
    });
    return () => {
      if(elementsRef.current){
        [...elementsRef.current].map(el => {
          el.removeEventListener('click', clickHandler)
          return el
        })
      }
    }
  }, [])
  
}