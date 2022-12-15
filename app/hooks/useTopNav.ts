import { useEffect, useRef } from "react";
import { toggleClass } from "@App/utils/pageUtils";

function useTopNav(){
  const navRef = useRef<null | HTMLDivElement>(null)
  let lastScrollTop: number = 0;
  // const [scrollDir, setScrollDir] = useState('none');
  function onScroll(){
    let navbar = navRef.current;
    // let lastScrollTop: number = 0;

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (!navbar){
        return
      }

      // if(scrollTop < 100 && isTuesdayPage){
      //   toggleClass(navbar, 'header-white', false)
      //   return
      // }

      if (scrollTop > lastScrollTop && Math.sign(scrollTop) > 0 && scrollTop > 100) {
        // console.log(navbar.children[0].children.length)
        // checkS if Mobile Nav is OPEN so you cant remove nav and mess up viewport
        // if(header && header.children[0].children.length > 1){
        //   return
        // }
        // remove class
        toggleClass(navbar, 'inView', false)
      }
      else {
        // add class
        toggleClass(navbar, 'inView', true)
      }

      lastScrollTop = scrollTop;
  }

  useEffect(() => {
    // let lastScrollTop: number = 0;
    // let navbar = navRef.current;
    // const header: HTMLElement | null = document.querySelector('#header');
    // const isTuesdayPage = header?.classList.contains('tuesdayMakers-page');
    // scrollNav();

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    } 
  }, [])

  return {navRef}
}

export default useTopNav