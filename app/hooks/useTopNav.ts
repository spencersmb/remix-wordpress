import { MutableRefObject, useEffect, useRef } from "react";
import { toggleClass } from "@App/utils/pageUtils";

function useTopNav(){
  const navRef = useRef<null | HTMLDivElement>(null)
  function scrollNav() {
    let lastScrollTop: number = 0;
    let navbar = navRef.current;
    const header: HTMLElement | null = document.querySelector('#header');
    window.addEventListener('scroll', function () {
      
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (!navbar){
        return
      }
      if (scrollTop > lastScrollTop && Math.sign(scrollTop) > 0 ) {

        // checkS if Mobile Nav is OPEN so you cant remove nav and mess up viewport
        if(header && header.children[0].children.length > 1){
          return
        }
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