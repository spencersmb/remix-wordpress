import type { LicenseEnum } from "@App/enums/products"
import { BadgeCheckIcon, InformationCircleIcon, XCircleIcon } from "@heroicons/react/solid"

export interface LicenseTabContentProps {
  type: LicenseEnum,
  requirements: {
    icon: any,
    title: string,
    description: string
  }[]
  description: string
  usedFor: string[]
  cannotBeUsedFor: string[]
}

/**
 * 
 * @component LicenseTabContent
 * @tested 6-25-2022
 */
const LicenseTabLayout = ({ requirements, description, usedFor, cannotBeUsedFor }: LicenseTabContentProps) => {
  return (
    <>
      <div data-testid="requirements" className='flex flex-col items-center py-8 tablet:flex-row tablet:max-w-[740px] mx-auto'>

        {/* ITEMS */}
        {requirements.map((item, index) => {
          return (
            <div key={index} className="max-w-[250px] text-center flex flex-col items-center mb-10 last:mb-0 tablet:mb-0 tablet:px-4 tablet:max-w-none tablet:first:pl-0 tablet:last:pr-0">
              <div className='max-w-[43px] w-full mb-2'>{item.icon}</div>
              <div className='mb-2 text-2xl leading-7 text-success-700 font-sentinel__SemiBoldItal'>{item.title}</div>
              <div className='text-sm laptop:text-base'>{item.description}</div>
            </div>
          )
        })}
      </div>

      {/* DESCRIpTioN */}
      <div
        data-testid="description"
        className='flex flex-col p-6 mt-8 mb-16 tablet:flex-row bg-success-50 rounded-2xl'>
        <div className='max-w-[44px]'>
          <InformationCircleIcon />
        </div>
        <div className='pt-6 text-xl tablet:pl-6 tablet:pt-0'>
          {description}
        </div>
      </div>

      {/* USED FOR */}
      <div>
        <h3 className='mt-12 mb-8 text-3xl font-sentinel__SemiBoldItal text-sage-700'>Can be used for:</h3>
        <ul className='grid grid-cols-1 tablet:grid-cols-2'>
          {usedFor.map((item, index) => {
            return (
              <li key={index} className="relative mb-4 ml-8 tablet:flex-[0_1_50%] pr-8">
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
      <div>
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