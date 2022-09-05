import type { LicenseEnum } from "@App/enums/products"
import { CursorClickIcon } from "@heroicons/react/outline"
import { BadgeCheckIcon, InformationCircleIcon, XCircleIcon } from "@heroicons/react/solid"

export interface LicenseTabContentProps {
  type: LicenseEnum,
  rights: string
  requirements: {
    icon: any,
    title: string,
    description: string
  }[]
  description: string
  usedFor: string[]
  cannotBeUsedFor: string[]
}

function capitalizeFirstLetter(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * 
 * @component LicenseTabContent
 * @tested 6-25-2022
 */
const LicenseTabLayout = ({ type, requirements, description, usedFor, cannotBeUsedFor, rights }: LicenseTabContentProps) => {
  return (
    <>
      <div data-testid="requirements" className='flex items-center tablet:items-stretch flex-col py-8 gap-8 tablet:flex-row tablet:max-w-[740px] mx-auto'>

        {/* ITEMS */}
        {requirements.map((item, index) => {
          return (
            <div key={index} className="max-w-[250px] text-center flex flex-col items-center mb-10 last:mb-0 tablet:mb-0 tablet:max-w-none tablet:flex-1">
              <div className='max-w-[43px] w-full mb-2'>{item.icon}</div>
              <div className='flex items-center flex-1 mb-2 text-2xl leading-7 text-success-700 font-sentinel__SemiBoldItal'>{item.title}</div>
              <div className='text-sm laptop:text-base'>{item.description}</div>
            </div>
          )
        })}
      </div>

      {/* DESCRIpTioN */}
      <div
        data-testid="description"
        className='flex flex-col p-6 mt-8 mb-16 tablet:flex-row bg-success-50 rounded-2xl'>
        <div className='max-w-[44px] text-sage-700'>
          <CursorClickIcon stroke="currentColor" />
        </div>
        <div className='pt-6 text-xl tablet:pl-6 tablet:pt-0'>
          {description}
        </div>
      </div>

      {/* RIGHTS */}
      <div className="px-4 pt-0 pb-4 tablet:px-0 desktop:pt-6">
        <div className="flex flex-col featureListItem laptop:flex-row">
          <div className="featureListItem__title tablet:mr-[10%] laptop:max-w-[200px] desktop:max-w-none">
            <h4 className="mb-4 text-3xl font-sentinel__SemiBoldItal">{capitalizeFirstLetter(type)} License Rights</h4>
          </div>
          <div className="flex-1 featureListItem__content">
            <p className="m-0 text-lg">
              {rights}
            </p>
          </div>
        </div>
      </div>

      {/* USED FOR */}
      <div className="px-4 laptop:px-0">
        <h3 className='mt-12 mb-8 text-3xl font-sentinel__SemiBoldItal'>Can be used for:</h3>
        <ul className='grid grid-cols-1 tablet:grid-cols-2'>
          {usedFor.map((item, index) => {
            return (
              <li key={index} className="relative mb-4 ml-8 tablet:flex-[0_1_50%] tablet:pr-8">
                <span className='absolute top-0 left-[-28px] w-[24px]'>
                  <BadgeCheckIcon fill='#699797' />
                </span>
                {item}
              </li>
            )
          })}
        </ul>
      </div>

      {/* CANNOT BE USED FOR */}
      <div className="px-4 laptop:px-0">
        <h3 className='mt-12 mb-8 text-3xl font-sentinel__SemiBoldItal text-sage-700'><span className='underline underline-offset-4'>Cannot</span> be used for:</h3>
        <ul className='grid grid-cols-1 tablet:grid-cols-2'>
          {cannotBeUsedFor.map((item, index) => {
            return (
              <li key={index} className="relative mb-4 ml-8 tablet:flex-[0_1_50%] tablet:pr-8">
                <span className='absolute top-0 left-[-28px] w-[24px]'>
                  <XCircleIcon fill='#F87171' />
                </span>
                {item}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default LicenseTabLayout