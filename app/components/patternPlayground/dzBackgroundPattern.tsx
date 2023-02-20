import DzBanner from "./dZbanner/dzBanner";
import DzPattern from "./dzBackgroundPattern/dzPattern";
import DzMaster from "./dzMaster/dzMaster";

const PatternDz = () => {

  /*
    dzBackgroundHeight is a class that sets the height of the background dropzone to the height of the window set in tailwindUtilities.js 
  */
  return (
    <div className='relative dzBackgroundHeight'>

      <DzBanner />

      <DzPattern />

      <DzMaster />

    </div>

  )
}

export default PatternDz