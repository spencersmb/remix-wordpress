import Header1 from '@App/components/headers/header-1'
import Layout from '@App/components/layoutTemplates/layout'
import SimpleTabsProvider from "@App/components/tabs/SimpleTabs/simpleTabs"
import SimpleTabsHeader from '@App/components/tabs/SimpleTabs/simpleTabsHeader'
import Tab from '@App/components/tabs/SimpleTabs/tab'
import TabContent from '@App/components/tabs/SimpleTabs/tabContent'
import type { ReactNode } from 'react';
// import * as LottiePlayer from "@lottiefiles/lottie-player";
import { AnimatePresence } from 'framer-motion'
import { LicenseEnum } from '@App/enums/products'
import CloseSvg from '@App/components/svgs/closeSvg'
import { getBasicPageMetaTags, mdxPageMeta } from "@App/utils/seo";
import LicenseTabContent from '@App/components/tabs/licenseTabs/licenseTabContent'
import LicenseTabSlider from '@App/components/tabs/licenseTabs/licenseTabSlider'
import LicenseTabLayout from '@App/components/tabs/licenseTabs/licenseTabLayout'
import ContactUsV1 from '@App/components/layout/contactUsV1'
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import { cacheControl } from '@App/lib/remix/loaders'
import { DesktopComputerIcon, UserGroupIcon } from '@heroicons/react/solid'
import { CurrencyDollarIcon, TagIcon, UserIcon } from '@heroicons/react/outline'
import { getStaticPageMeta, navStyles } from '@App/utils/pageUtils'

const page = getStaticPageMeta({
  title: `License Details`,
  desc: `Three clear license options to take the guesswork out of choosing a license, so you can get back to designing.`,
  slug: `licenses`
})
// export let meta = mdxPageMeta

export let loader: LoaderFunction = async () => {
  return json({ page }, {
    headers: {
      // ...cacheControl
    }
  })
};
const BankNotesOutline = (props: any) => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>
)
/**
 * 
 * @component LicensesPage 
 * @description Page that displays the licenses for the app.
 * 
 */
interface Props { }
function LicensesPage(props: Props) {

  // useEffect(() => {
  //   import("@lottiefiles/lottie-player");
  // });

  return (
    <Layout disableNavStyles={true}>
      <SimpleTabsProvider>
        <div className={`${navStyles} bg-[#F7F6F7] grid grid-flow-row row-auto grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop`}>

          <div className='col-span-full'>
            <Header1>
              <div className='max-w-[500px] flex flex-col my-32'>
                <span className='pb-4 text-grey-700'>Every-Tuesday Licenses</span>
                <h1 className='pb-8 font-sentinel__SemiBoldItal text-heading-3 tablet:text-display-2 text-grey-700'>Licenses to bring your creative projects to life.</h1>
                <p className='text-xl text-grey-600'>With three clear options, we take the guesswork out of choosing a license so you can get back to designing.</p>
              </div>
            </Header1>
          </div>


          {/* LICENSE Options Box Wrapper */}
          <div className='flex flex-col items-center col-span-2 col-start-2 px-3 py-16 mb-16 bg-white shadow-lg tablet:px-12 tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 desktop:px-24 desktop:mx-10 rounded-xl'>
            <h2 className='mb-8 text-lg font-semibold text-sage-800'>License Options</h2>

            {/* LICENSE TOGGLE */}
            <SimpleTabsHeader
              startPosition={1}
              className="flex flex-row bg-[#F7F6F7] p-2 tablet:p-3 w-full max-w-[311px] tablet:max-w-[564px] rounded-2.5xl relative mb-4 tablet:mb-6">

              {licenseData.map((license, index) => {
                return (
                  <Tab
                    key={license.type}
                    name={license.type}
                    className="relative z-10 p-3 tablet:p-6 flex-[0_1_50%] hover:cursor-pointer">
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
                      index={index}
                      className='flex flex-col'>
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
  rights: string
  description: string
  usedFor: string[]
  cannotBeUsedFor: string[]
}
const licenseData: ILicense[] = [
  {
    type: LicenseEnum.FREE,
    requirements: [
      {
        icon: <DesktopComputerIcon fill={'var(--sage-500)'} />,
        title: 'One license per computer',
        description: 'If you have two computers, you need two licenses'
      },
      {
        icon: <UserIcon stroke={'var(--sage-500)'} />,
        title: 'For personal use only',
        description: 'No limit for personal work or work which is offered for free'
      },
      {
        icon: <CurrencyDollarIcon stroke={'var(--sage-500)'} />,
        title: 'Business usage not permitted',
        description: 'Can not be redistributed or sold as if they are your own'
      },
    ],
    description: 'This type grants you ongogin permission to use the item to create personal use end products that are not intended to be sold.',
    rights: 'The Standard License grants you ongoing permission to use the Item to create personal use end products that are not intended to be sold. For the purposes of this Standard License, ‘sold’ means you plan to sell, license, sub-license or distribute the end product for any type of fee or charge.',
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
        icon: <DesktopComputerIcon fill={'var(--sage-500)'} />,
        title: 'One license per computer',
        description: 'If you have two computers, you need two licenses'
      },
      {
        icon: <UserIcon stroke={'var(--sage-500)'} />,
        title: 'For personal use only',
        description: 'No limit for personal work or work which is offered for free'
      },
      {
        icon: <CurrencyDollarIcon stroke={'var(--sage-500)'} />,
        title: 'Business usage not permitted',
        description: 'Can not be redistributed or sold as if they are your own'
      },
    ],
    rights: 'The Standard License grants you ongoing permission to use the Item to create personal use end products that are not intended to be sold. For the purposes of this Standard License, ‘sold’ means you plan to sell, license, sub-license or distribute the end product for any type of fee or charge.',
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
        icon: <DesktopComputerIcon fill={'var(--sage-500)'} />,
        title: 'One license per computer',
        description: 'If you have two computers, you need two licenses'
      },
      {
        icon: <TagIcon stroke={'var(--sage-500)'} />,
        title: 'Making something to sell?',
        description: 'Then you\'ll need an extended license'
      },
      {
        icon: <BankNotesOutline stroke={'var(--sage-500)'} />,
        title: 'Are you freelancing or an owner?',
        description: 'You still need an extended license'
      },
    ],
    rights: 'An Extended License certificate comes with every Extended License purchase from Every Tuesday. For the purposes of this Extended License, ‘sold’ means you plan to sell, license, sub-license or distribute the end product for any type of fee or charge.',
    description: 'The Extended License grants you ongoing permission to use the Item to create end products that are intended to be sold or used for business purposes (e.g. advertising, promotions, packaging, etc.).',
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

