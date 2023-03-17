import DzBanner from "./dZbanner/dzBanner";
import DzPattern from "./dzBackgroundPattern/dzPattern";
import DzMaster from "./dzMaster/dzMaster";
import { useEffect } from "react";

const PatternDz = () => {

  useEffect(() => {
    const appHeight = () => {
      const doc = document.querySelector(':root');
      function getfontfamily() {
        // @ts-ignore
        var value = getComputedStyle(doc);

        alert("Initial font family: " + value.getPropertyValue('--app-height'));

      }
      // getfontfamily();
      // @ts-ignore
      doc?.style.setProperty('--app-height', `${window.innerHeight}px`);
      console.log('appHeight', window.innerHeight)
      // const height = `${window.innerHeight}px`
      // console.log('appHeight', height)
      // doc?.style.setProperty(`—-app-height`, height)
    }
    window.addEventListener('resize', appHeight)
    appHeight()
  }, [])

  /*
    dzBackgroundHeight is a class that sets the height of the background dropzone to the height of the window set in tailwindUtilities.js 
  */
  return (
    <div className='relative overflow-hidden dzBackgroundHeight z-1'>

      <DzBanner />

      <DzPattern />

      <DzMaster />

    </div>

  )
}

export default PatternDz