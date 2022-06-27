import { BreakpointEnums } from "@App/enums/breakpointEnums";
import useSite from "@App/hooks/useSite";
import { motion } from "framer-motion";
import { useSimpleTabs } from "../SimpleTabs/simpleTabsContext";

/**
 * 
 * @component LicenseTabSlider 
 * @description Slider button behind options for license type
 * 
 */
const LicenseTabSlider = () => {
  const { state: { breakpoint } } = useSite();
  const { state } = useSimpleTabs()

  const selectPosition = (tab: string) => {

    switch (tab) {
      case 'freebie':
        return 'left'
      case 'standard':
        return 'center'
      case 'extended':
        return 'right'
      default:
        return 'left'
    }
  }

  return (
    <motion.div
      // custom is used to set the position of the tab based on window size
      custom={breakpoint === BreakpointEnums.mobile}
      animate={selectPosition(state.selectedTab)}
      variants={tabVarients}
      className='z-[1] absolute w-[98.34px] h-[94px] tablet:w-[180px] tablet:h-[160px] bg-white shadow-lg rounded-xl' />
  )
}

// mobile width 98.34
// tablet width 180
const tabVarients = {
  left: (custom: boolean) => ({
    left: custom ? 8 : 12,
  }),
  center: (custom: boolean) => ({
    left: custom ? 106.34 : 192,
  }),
  right: (custom: boolean) => ({
    left: custom ? 204.68 : 372,
  }),
}

export default LicenseTabSlider