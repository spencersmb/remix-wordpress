import type { MutableRefObject } from "react";
import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 * https://stackoverflow.com/a/42234988/5794430
 */
export function useOutsideAlerter(ref: MutableRefObject<HTMLElement | null>, child: MutableRefObject<HTMLElement | null>, callback: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {

      if ((ref.current && !ref.current.contains(event.target)) && (child.current && !child.current.contains(event.target))) {
        // alert("You clicked outside of me!");
        callback()
      }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callback, child, ref]);
}