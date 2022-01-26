import { MutableRefObject, useEffect, useRef } from "react";
import { toggleClass } from "~/utils/pageUtils";

function useTopNav(){
  const navRef = useRef<null | HTMLDivElement>(null)
  function scrollNav() {
    let lastScrollTop: number = 0;
    let navbar = navRef.current;
    
    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if ((scrollTop > lastScrollTop) && navbar) {
        toggleClass(navbar, 'inView', false)
      }
      else {
        if (navbar)
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