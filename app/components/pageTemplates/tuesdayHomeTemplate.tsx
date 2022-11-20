import useSite from '@App/hooks/useSite'
import { GetAllFreebiesQuery } from '@App/lib/graphql/queries/resourceLibrary'
import { fetchAPIClientSide } from '@App/utils/fetch.cleint'
import { getGraphQLString } from '@App/utils/graphqlUtils'
import { createImgixSizes } from '@App/utils/imageHelpers'
import { consoleHelper } from '@App/utils/windowUtils'
import { Link, useActionData, useTransition } from '@remix-run/react'
import React, { useEffect } from 'react'
import TmSignupForm from '../forms/tuesdayMakers/tmSignupForm'
import IpadLongShadow from '../images/ipadLongShadow'
import LazyImgix from '../images/lazyImgix'
import DoubleBgImageLayout from '../layout/doubleBgImageLayout'
import IpadHeader1 from '../layout/headers/ipadHeader1'
import TmAuthor from '../layout/tuesdayMakers/tmAuthor'
import TmResourceLibraryModule from '../layout/tuesdayMakers/tmResourceLibraryModule'
import WygSubscriber from '../layout/tuesdayMakers/wygSubscriber'
import SignUpInstructionsPopUp from '../modals/signUpInstructionsPopUp'
import LfmArrowSvg from '../svgs/lfmArrowSvg'

interface Props { }

type MakersSignupActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
  };
  fields?: {
    email: string;
  }
  form?: string
};
function TuesdayHomeTemplate(props: Props) {
  const { openModal, closeModal } = useSite()
  const formRef: any = React.useRef()
  const transition = useTransition()
  let actionData = useActionData<MakersSignupActionData | undefined>();

  useEffect(() => {
    consoleHelper('actionData', actionData, 'tuesday-makers/index.tsx');
  }, [actionData]);

  /*
  ON page load prefetch data query to speed things up
   */
  useEffect(() => {
    async function prefetchData() {
      await fetchAPIClientSide(getGraphQLString(GetAllFreebiesQuery))
    }
    prefetchData().catch()

    // openModal({
    //   template: <SignUpInstructionsPopUp
    //     closeModal={closeModal}
    //   />
    // })
  }, [])


  React.useEffect(() => {
    if (transition.state === 'submitting') {
      formRef.current?.reset()
    }
  }, [transition])
  // consoleHelper('data.form !==', data.form, '/routes/tuesday-makers/index.tsx');

  const iPadArt = createImgixSizes({
    width: 1400,
    height: 1049,
    alt: `Every Tuesday IPad Art`,
    src: 'https://et-teachable.imgix.net/procreate601/class-projects.jpg',
    mobileSize: 800
  })
  const bgPaintStrokes = {
    width: 2000,
    height: 2921,
    alt: `Every Tuesday iPad watercolor paint streaks`,
    src: 'https://et-website.imgix.net/et-website/images/tuesday-makers/tm-bg-1_3.jpg?auto=format',
    placeholder: 'https://et-website.imgix.net/et-website/images/tuesday-makers/tm-bg-1_3.jpg?auto=format&w=100&fit=clip'
  }
  return (
    <div className='bg-cream-100 pt-[var(--nav-top-sm)] laptop:pt-[var(--nav-top-lg)]'>
      <div className='relative et-grid-basic'>

        {/* BG PAINTSTREAKS */}
        <div className='absolute left-[62%] top-[-470px] w-[500px] -translate-x-1/2 rotate-45 tablet:w-[1030px] tablet:left-[62%] tablet:top-[-820px] laptop:top-[-860px] laptop:w-[1050px] laptop:left-[57%] desktop:w-[1620px] desktop:top-[-1370px] desktopXl:left-[54%]'>
          <LazyImgix
            visibleByDefault={true}
            id={"iPadArt"}
            image={bgPaintStrokes}
            sizes="(max-width: 666px) 100w, (max-width: 1399px) 100vw, 1500px"
            srcSet={
              `
              ${bgPaintStrokes.src}&w=1200&fit=clip&auto=compress 1200w,
              ${bgPaintStrokes.src}&w=1400&fit=clip&auto=compress 1400w,
              ${bgPaintStrokes.src}&w=1600&fit=clip&auto=compress 1600w,
              ${bgPaintStrokes.src}&w=1800&fit=clip&auto=compress 1800w,
              ${bgPaintStrokes.src}&w=3000&fit=clip&auto=compress 3000w,
              `}
          />
        </div>

        {/* IPAD HEADER */}
        <div className='mt-40 mb-40 col-start-2 col-span-2 tablet:mt-80 tablet:mb-60 tablet:col-start-2 tablet:col-end-[14] laptop:px-0 laptop:col-start-3 laptop:col-end-13 desktop:mt-[550px] desktop:mb-72 desktop:col-start-2 desktop:col-span-12 tablet:justify-center flex flex-col relative'>

          <IpadHeader1>

            <div className='w-full tablet:max-w-[678px] tablet:mx-auto'>

              {/* SIGNUP FORM */}
              <TmSignupForm formName={'tm-landing-page'} inputBg={'bg-white hover:ring-offset-cream-100'} />

              {/* LOGIN LINK */}
              <div className='flex flex-row items-center justify-center mt-6 signup_wrapper'>
                <div className='mr-3'>Already a member?</div>
                <Link prefetch='intent' to={'/tuesday-makers/login'} className={'btn btn-primary btn-outline text-xs uppercase px-2 rounded-md flex-none leading-none'}>
                  Login
                </Link>
              </div>

            </div>

          </IpadHeader1>

        </div>

        {/* DUAL IPADS */}
        <div className='relative col-span-2 col-start-2 tablet:col-span-full laptop:col-start-4 laptop:col-span-9 desktop:col-start-5 desktop:col-span-9'>

          {/* IPAD 1 */}
          <div className='relative z-1 left-20 tablet:left-40'>

            {/* TOP QUOTE */}
            <div className='absolute top-[-110px] right-[75px] w-[200px] z-1 tablet:right-[50%]'>
              <div className='text-4xl -rotate-12 font-bonVivant'>Free Procreate color palettes</div>
              <div className='absolute top-[30px] right-[-10px] w-[42px] rotate-[45deg] laptop:w-[50px]'>
                <LfmArrowSvg />
              </div>
            </div>

            <IpadLongShadow imigixArt={iPadArt} />
          </div>

          {/* IPAD OVERLAP */}
          <div className='absolute w-full top-[-20%] -left-1/2 z-2'>
            <IpadLongShadow imigixArt={iPadArt} />

            {/* BOTTOM QUOTE */}
            <div className='hidden absolute bottom-[-32px] right-[80px] w-[200px] z-1 tablet:bottom-[-82px] laptop:block tablet:right-[29%] laptop:right-[36%]'>
              <div className='rotate-[15deg] text-4xl font-bonVivant'>Free Procreate color palettes</div>
              <div className='absolute top-[-50px] left-[-28px] w-[42px] rotate-[-118deg] laptop:w-[50px]'>
                <LfmArrowSvg />
              </div>
            </div>

          </div>
        </div>

        <div className='col-span-full bg-cream-300'>
          <WygSubscriber />
        </div>

        <div className='col-span-full bg-cream-100'>
          <TmResourceLibraryModule />
        </div>

        <div className='relative z-1 col-span-full bg-cream-300'>
          <TmAuthor />
        </div>

        <div className='relative z-2 col-span-full bg-cream-300'>
          <DoubleBgImageLayout
            form={<TmSignupForm
              flexRow={false}
              formName={'tmFooter'}
              inputBg={'bg-sage-100 hover:ring-offset-cream-100 tablet:mb-4'} />}
          />
        </div>

      </div>
    </div>
  )
}

export default TuesdayHomeTemplate
