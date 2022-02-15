import { useEffect } from "react";

function useGumroad() {
  // https://dev.to/oleggromov/observing-style-changes---d4f
  function checkDiff(el: any) {
    console.log('this.subscriber', el);
    const computedStyle = window.getComputedStyle(el[0].target).getPropertyValue('width')
    console.log('computedStyle', computedStyle);


    // const newStyle = this.getStyle()
    // const diff = getDiff(this.style, newStyle)

    // if (Object.keys(diff).length) {
    //   if (this.subscriber) {
    //     this.subscriber(diff)
    //   }
    //   this.style = newStyle
    // }
  }
  function checkGumroadOverlay() {
    console.log('start Check');

    let el = document.querySelector('.gumroad-scroll-container')
    if (!el) {
      window.setTimeout(checkGumroadOverlay, 300); /* this checks the flag every 100 milliseconds*/
    } else {
      console.log('gumroad laoded');

      let mutationObserver = new window.MutationObserver(checkDiff)
      mutationObserver.observe(el, {
        attributes: true,
        attributeFilter: ['style', 'class']
      })
    }
  }

  useEffect(() => {
    checkGumroadOverlay()


  }, [])
}

export default useGumroad;