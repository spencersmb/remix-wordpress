import { classNames } from "@App/utils/appUtils"
import { useSimpleTabs } from "../SimpleTabs/simpleTabsContext"

interface ITabContent {
  type: string
}

/**
 * 
 * @component LicenseTabContent
 * @tested 6-25-20 
 */
const LicenseTabContent = ({ type }: ITabContent) => {
  const { state } = useSimpleTabs()
  return (
    <div
      role="tab">
      <div className='text-sm text-grey-400 tablet:text-base'>Type</div>
      <div
        className={classNames(state.selectedTab === type
          ? 'text-sage-800'
          : 'text-grey-500',
          'transition-colors mb-3 tablet:mb-6 tablet:text-3xl capitalize font-sentinel__SemiBoldItal')}>
        {type}
      </div>
      <span className={classNames(state.selectedTab === type
        ? 'bg-success-500'
        : 'bg-grey-300',
        'w-[40px] h-[14px] tablet:w-[73px] tablet:h-[28px] rounded-lg flex transition-all')}></span>
    </div>
  )
}

export default LicenseTabContent