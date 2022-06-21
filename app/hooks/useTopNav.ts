import { MutableRefObject, useEffect, useRef } from "react";
import { toggleClass } from "@App/utils/pageUtils";

function useTopNav(){
  const navRef = useRef<null | HTMLDivElement>(null)
  function scrollNav() {
    let lastScrollTop: number = 0;
    let navbar = navRef.current;
    
    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (!navbar){
        return
      }
      if (scrollTop > lastScrollTop && Math.sign(scrollTop) > 0 ) {
        // remove class
        toggleClass(navbar, 'inView', false)
      }
      else {
        // add class
        toggleClass(navbar, 'inView', true)
      }
      lastScrollTop = scrollTop;
    });
  }

  useEffect(() => {
    scrollNav();
  }, [])

  return {navRef}
}

export default useTopNav