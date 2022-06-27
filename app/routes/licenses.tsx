import Header1 from '@App/components/headers/header-1'
import Layout from '@App/components/layoutTemplates/layout'
import SimpleTabsProvider from "@App/components/tabs/SimpleTabs/simpleTabs"
import SimpleTabsHeader from '@App/components/tabs/SimpleTabs/simpleTabsHeader'
import Tab from '@App/components/tabs/SimpleTabs/tab'
import TabContent from '@App/components/tabs/SimpleTabs/tabContent'
import type { ReactNode } from 'react';
import * as LottiePlayer from "@lottiefiles/lottie-player";
import { AnimatePresence, motion } from 'framer-motion'
import { LicenseEnum } from '@App/enums/products'
import CloseSvg from '@App/components/svgs/closeSvg'
import { ChatIcon } from '@heroicons/react/solid'
import { Link } from 'remix'
import LicenseTabContent from '@App/components/tabs/licenseTabs/licenseTabContent'
import LicenseTabSlider from '@App/components/tabs/licenseTabs/licenseTabSlider'
import LicenseTabLayout from '@App/components/tabs/licenseTabs/licenseTabLayout'
import ContactUsV1 from '@App/components/layout/contactUsV1'
interface Props { }

/**
 * 
 * @component LicensesPage 
 * @description Page that displays the licenses for the app.
 * 
 */
function LicensesPage(props: Props) {

  // useEffect(() => {
  //   import("@lottiefiles/lottie-player");
  // });

  return (
    <Layout>
      <SimpleTabsProvider>
        <div className='bg-[#F7F6F7] grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>

          <div className='col-span-full'>
            <Header1>
              <div className='max-w-[500px] flex flex-col my-32'>
                <span className='pb-4 text-grey-500'>Every-Tuesday Licenses</span>
                <h1 className='pb-8 font-sentinel__SemiBoldItal text-heading-3 tablet:text-display-2 text-grey-700'>Licenses to bring your creative projects to life.</h1>
                <p className='text-xl text-grey-600'>With three clear options, we take the guesswork out of choosing a license so you can get back to designing.</p>
              </div>
            </Header1>
          </div>


          {/* LICENSE Options Box Wrapper */}
          <div className='flex flex-col items-center col-span-2 col-start-2 px-3 py-16 mb-16 bg-white shadow-lg tablet:px-12 tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 desktop:px-24 desktop:mx-10 rounded-xl'>
            <h2 className='mb-8 text-2xl font-semibold text-sage-800'>License Options</h2>

            {/* LICENSE TOGGLE */}
            <SimpleTabsHeader className="flex flex-row bg-[#F7F6F7] p-2 tablet:p-3 w-full max-w-[311px] tablet:max-w-[564px] rounded-2.5xl relative mb-4 tablet:mb-6">

              {licenseData.map((license, index) => {
                return (
                  <Tab key={license.type} name={license.type} className="relative z-10 p-3 tablet:p-6 flex-[0_1_50%] hover:cursor-pointer">
                    <LicenseTabContent type={license.type} />
                  </Tab>
                )
              })}

              <LicenseTabSlider />
            </SimpleTabsHeader>

            {/* REQUIREMENTS DIVIDER */}
            {/* <div className='relative flex items-start w-full max-w-[311px] tablet:max-w-none'>
              <div className='relative z-10 flex flex-row py-3 pr-3 font-semibold leading-4 bg-white tablet:text-xl tablet:pr-6'>
                <span className='bg-success-500 w-[14px] h-auto mr-3 rounded-[4px]' />
                <span>Requirements</span>
              </div>
              <span className='z-[2] absolute h-[1px] bg-grey-300 w-full top-[50%] translate-y-[-50%]'></span>
            </div> */}

            {/* LICENSE CONTENT */}
            <div className='flex justify-center w-full'>
              {/* @ts-ignore */}
              <AnimatePresence>

                {licenseData.map((license, index) => {
                  return (
                    <TabContent
                      initial={'initial'}
                      exit={'exit'}
                      animate={'enter'}
                      variants={tabVariants}
                      key={license.type}
                      id={license.type}
                      className=''>
                      <LicenseTabLayout {...license} />
                    </TabContent>
                  )
                })}
              </AnimatePresence>

            </div>

          </div>

          <ContactUsV1 />
        </div>
      </SimpleTabsProvider>

    </Layout>
  )
}
const tabVariants = {
  initial: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
}
export default LicensesPage

interface ILicenseRequirement {
  icon: ReactNode,
  title: string
  description: string
}
interface ILicense {
  type: LicenseEnum,
  requirements: ILicenseRequirement[]
  description: string
  usedFor: string[]
  cannotBeUsedFor: string[]
}
const licenseData: ILicense[] = [
  {
    type: LicenseEnum.FREE,
    requirements: [
      {
        icon: <CloseSvg stroke={'#000000'} />,
        title: 'One license per computer',
        description: 'If you have two computers, you need two licenses'
      },
      {
        icon: <CloseSvg stroke={'#000000'} />,
        title: 'For personal use only',
        description: 'If you have two computers, you need two licenses'
      },
      {
        icon: <CloseSvg stroke={'#000000'} />,
        title: 'Business usage not permitted',
        description: 'If you have two computers, you need two licenses'
      },
    ],
    description: 'This type grants you ongogin permission to use the item to create personal use end products that are not intended to be sold.',
    usedFor: [
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.'
    ],
    cannotBeUsedFor: [
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.'
    ]
  },
  {
    type: LicenseEnum.STANDARD,
    requirements: [
      {
        icon: '',
        title: 'One license per computer',
        description: 'If you have two computers, you need two licenses'
      }
    ],
    description: 'This type grants you ongogin permission to use the item to create personal use end products that are not intended to be sold.',
    usedFor: [
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.'
    ],
    cannotBeUsedFor: [
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.'
    ]
  },
  {
    type: LicenseEnum.EXTENDED,
    requirements: [
      {
        icon: '',
        title: 'One license per computer',
        description: 'If you have two computers, you need two licenses'
      }
    ],
    description: 'This type grants you ongogin permission to use the item to create personal use end products that are not intended to be sold.',
    usedFor: [
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.'
    ],
    cannotBeUsedFor: [
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.',
      'Can be used without limit for personal work, or work which is offered for free.'
    ]
  }
]