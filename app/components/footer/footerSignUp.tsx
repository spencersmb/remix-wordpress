import { createImgixSizes } from "@App/utils/imageHelpers";
import { useFetcher, useTransition } from "@remix-run/react";
import { AnimatePresence } from "framer-motion";
import MakersSignUpForm from "../forms/layout/makersSignUpForm";
import FormErrorMessage from "../forms/messages/ErrorMessage";
import LazyImgix from "../images/lazyImgix";

const FooterSignUp = () => {
  const tuesdayMakersSignUp = useFetcher();
  const transition = useTransition()
  const bgImage = createImgixSizes({
    compress: true,
    height: 1256,
    width: 2000,
    alt: "Every Tuesday Makers Library",
    mobileSize: 400,
    src: 'https://et-website.imgix.net/et-website/images/tuesday-makers/footer-flowers.jpg'
  })
  const flowersLeft = createImgixSizes({
    compress: true,
    height: 654,
    width: 545,
    alt: "Every Tuesday Makers Library",
    mobileSize: 400,
    src: 'https://et-website.imgix.net/et-website/images/tuesday-makers/footer-flowers-left-min.png'
  })
  const flowerPink = createImgixSizes({
    compress: true,
    height: 761,
    width: 704,
    alt: "Every Tuesday Makers Library",
    mobileSize: 400,
    src: 'https://et-website.imgix.net/et-website/images/tuesday-makers/footer-flowers-pink-min.png'
  })
  const flowerTrio = createImgixSizes({
    compress: true,
    height: 573,
    width: 358,
    alt: "Every Tuesday Makers Library",
    mobileSize: 400,
    src: 'https://et-website.imgix.net/et-website/images/tuesday-makers/footer-flowers-trio-min.png'
  })
  const { data, state } = tuesdayMakersSignUp

  return (
    <div className="relative max-w-[486px] tablet:max-w-[630px] mx-auto ">
      {/* IMAGE */}
      <div className="absolute w-[1190px] top-[-318px] left-[45%] -translate-x-1/2 tablet:top-[-390px] tablet:w-[1500px] ">
        <LazyImgix
          threshold={400}
          id={'iPadFeature'}
          image={bgImage.image}
          sizes="(max-width: 666px) 100vw, (max-width: 1024px) 100vw, 1400px"
          blur={false}
          srcSet={
            `
            ${bgImage.defaultSrc}&w=500&fit=clip 500w,
            ${bgImage.defaultSrc}&w=900&fit=clip 900w,
            ${bgImage.defaultSrc}&w=2000&fit=clip 2000w,
            `}
        />
      </div>
      <div className="bg-cream-200 rounded-2.5xl shadow-et_4 mb-[7rem] mx-auto p-7 tablet:p-9 tablet:py-14 desktop:px-16 desktop:py-14 relative">

        {/* CONTENT */}
        <div className="flex flex-col ml-auto max-w-[478px] mx-auto mb-[10px] laptop:mt-0 relative z-2">

          <p className="relative pb-4 text-center text-grey-800 font-sentinel__SemiBoldItal text-heading-3 tablet:text-display-2 laptop:z-2">
            Grab 300+ Design and Lettering Files!
          </p>
          <p className="pb-6 text-lg text-grey-600">
            When you join the Tuesday Makers, you’ll receive special offers on courses + products and gain access to the Resource Library, stocked with over 50 design and lettering files!
          </p>
          {/*ERROR SUBMISSION*/}
          {/* @ts-ignore */}
          <AnimatePresence>
            {data?.formError && state === 'idle' &&
              <FormErrorMessage
                id={'subscriberError'}
                className='mb-4'
                message={data?.formError || ''} />
            }
            {data?.fieldErrors?.email && state === 'idle' &&
              <FormErrorMessage
                id={'emailError'}
                className='mb-4'
                message={data?.fieldErrors.email} />
            }
          </AnimatePresence>
          <div>
            <MakersSignUpForm
              Form={tuesdayMakersSignUp.Form}
              type={tuesdayMakersSignUp.type}
              transition={transition}
              data={tuesdayMakersSignUp.data}
            />
          </div>
        </div>

        {/* FLOWERS */}
        {/* White */}
        <div className="absolute bottom-[340px] left-[-210px] w-[290px] z-1 tablet:w-[340px] tablet:bottom-[229px] tablet:left-[-214px] desktop:bottom-[129px]">
          <LazyImgix
            threshold={400}
            id={'flowers-left'}
            image={flowersLeft.image}
            sizes="(max-width: 666px) 40vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
            blur={false}
            srcSet={
              `
            ${flowersLeft.defaultSrc}&w=600&fit=clip 600w,
            `}
          />
        </div>

        {/* Pink */}
        <div className="absolute top-[-250px] right-[-110px] w-[320px] z-1 tablet:w-[400px] tablet:top-[-279px] tablet:right-[-134px]">
          <LazyImgix
            threshold={400}
            id={'flowers-left'}
            image={flowerPink.image}
            sizes="(max-width: 666px) 40vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
            blur={false}
            srcSet={
              `
            ${flowerPink.defaultSrc}&w=500&fit=clip 500w,
            ${flowerPink.defaultSrc}&w=900&fit=clip 900w,
            `}
          />
        </div>

        {/* TRIO */}
        <div className="absolute bottom-[-130px] right-[-117px] w-[200px] z-1 tablet:right-[-127px] tablet:bottom-[-60px]">
          <LazyImgix
            threshold={400}
            id={'flowers-left'}
            image={flowerTrio.image}
            sizes="(max-width: 666px) 40vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
            blur={false}
            srcSet={
              `
            ${flowerTrio.defaultSrc}&w=500&fit=clip 500w,
            `}
          />
        </div>

      </div>
    </div>

  )
}

export default FooterSignUp
