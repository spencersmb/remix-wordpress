import { useFetcher, useTransition } from "@remix-run/react";
import { createImgixSizes } from "@App/utils/imageHelpers";
import { staticImages } from "@App/lib/imgix/data";
import MakersSignUpForm from "../forms/layout/makersSignUpForm";
import LazyImgix from "../images/lazyImgix";
import FormErrorMessage from "../forms/messages/ErrorMessage";
import { AnimatePresence } from "framer-motion";

const MakersFooterSignUp = () => {
  const tuesdayMakersSignUp = useFetcher();
  const transition = useTransition()
  const iPadImage = createImgixSizes({
    compress: true,
    height: 1049,
    width: 1400,
    alt: "Every Tuesday Makers Library",
    mobileSize: 400,
    src: 'https://et-website.imgix.net/et-website/images/footer-ipad-image_1.jpg'
  })
  const { data, state } = tuesdayMakersSignUp

  return (
    <div className="bg-emerald-800 rounded-2.5xl shadow-et_4 mb-[7rem] mx-auto py-9 px-9 max-w-[486px] tablet:max-w-[630px] tablet:pb-14 laptop:max-w-none desktop:px-20 desktop:py-14 relative">

      {/* CONTENT */}
      <div className="flex flex-col mt-[80%] ml-auto text-sage-50 max-w-[478px] mx-auto tablet:mt-96 laptop:mr-0 laptop:max-w-[53%] mb-[10px] laptop:mt-0 relative">

        {/* IMAGE */}
        <div className="absolute w-full top-[-60vw] left-[0px] max-w-[600px] mobileWide:top-[-360px] tablet:top-[-400px] tablet:left-[20px] laptop:max-w-[90%] laptop:top-[20px] laptop:left-[-96%] desktop:left-[-630px] desktop:top-[-69px] desktop:max-w-[600px] transform rotate-[349deg]">
          <IpadFooterImage
            id={"ETMK"}
            featuredImage={iPadImage}
            alt={iPadImage.image.alt}
          />
        </div>

        <p className="relative pb-4 font-sentinel__SemiBoldItal text-heading-3 tablet:text-display-2 laptop:z-2 text-tangerine-200">
          Grab 50+ Design and Lettering Files!
        </p>
        <p className="text-lg pb-11 text-sage-50">
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

    </div>
  )
}

export default MakersFooterSignUp

interface IFeatureProps {
  featuredImage: CreateImgixReturn
  alt: string
  id: string
}
const IpadFooterImage = ({ featuredImage, alt, id }: IFeatureProps) => {

  const applePencil = createImgixSizes({
    width: 84,
    height: 1012,
    src: staticImages.assets.applePencil.flat.src,
    alt: 'Apple Pencil',
    mobileSize: 28
  })
  const iPadDevice = createImgixSizes({
    width: 1000,
    height: 733,
    src: staticImages.assets.ipad.flat.src,
    alt,
    mobileSize: 400
  })
  const swatchCard = createImgixSizes({
    width: 400,
    height: 1312,
    src: staticImages.assets.swatchPalette.circles.src,
    alt: 'Every Tuesday Swatch Card',
    mobileSize: 120
  })
  const scribble = createImgixSizes({
    width: 1312,
    height: 1205,
    alt: 'Every-Tuesday hand drawn flat flower bouquet',
    src: 'https://et-website.imgix.net/et-website/images/flower-bouquet-1.2-min.png',
    mobileSize: 600
  })

  return (
    <div className="relative max-w-[1000px] z-20">

      {/* APPLE PENCIL */}
      <div className="absolute top-[30%] left-[70%] z-30 w-[5%] rotate-[52deg] origin-center">
        <LazyImgix
          id={'applePencil'}
          image={applePencil.image}
          sizes="(max-width: 666px) 2vw, (max-width: 1279px) 3vw, (min-width: 1280px) 3vw, 30px"
          srcSet={
            `
              ${applePencil.defaultSrc}&w=28&fit=clip 28w,
              ${applePencil.defaultSrc}&w=48&fit=clip 48w,
              ${applePencil.defaultSrc}&w=60&fit=clip 60w,
            `
          }
        />

      </div>

      {/* IPAD ART */}
      <div className="absolute top-[-2.8%] left-[-2.7%] scale-[.81] w-full overflow-hidden rounded-md tablet:rounded-xl art z-20">
        <LazyImgix
          id={id}
          image={featuredImage.image}
          sizes="(max-width: 666px) 40vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
          srcSet={
            `
              ${featuredImage.defaultSrc}&w=500&fit=clip 500w,
              ${featuredImage.defaultSrc}&w=900&fit=clip 900w,
              ${featuredImage.defaultSrc}&w=1200&fit=clip 1200w,
              `}
        />
      </div>

      {/* IPAD DEVICE */}
      <div className="relative z-10 ipad">
        <LazyImgix
          id={'iPadFeature'}
          image={iPadDevice.image}
          sizes="(max-width: 666px) 40vw, (max-width: 1023px) 60vw, (max-width: 1399px) 40vw, 1400px"
          srcSet={
            `
            ${iPadDevice.defaultSrc}&w=500&fit=clip 500w,
            ${iPadDevice.defaultSrc}&w=900&fit=clip 900w,
            ${iPadDevice.defaultSrc}&w=1200&fit=clip 1200w,
            `}
        />
      </div>

      {/* SWATCH CARD */}
      <div className="absolute z-[1] swatches top-0 w-[60px] right-[-20px] rotate-[25deg] tablet:w-[100px] tablet:right-[-40px] tablet:top-[40px] laptop:top-0 laptop:right-[-10px] laptop:rotate-[15deg] desktop:right-[-20px]">
        <LazyImgix
          id={'swatchCard'}
          image={swatchCard.image}
          sizes="(max-width: 666px) 4vw, 200px"
          srcSet={
            `
            ${swatchCard.defaultSrc}&w=120&fit=clip 120w,
            ${swatchCard.defaultSrc}&w=200&fit=clip 200w,
            `}
        />
      </div>

      {/* SCRIBBLE TEXTURE  */}
      <div className="absolute top-[-50px] left-[-50px] z-0 w-[301px] tablet:left-[-160px] tablet:top-[-110px] tablet:w-[500px] laptop:w-[550px] laptop:left-[-25px] laptop:top-[-58px] desktop:w-[650px] desktop:left-[20px] desktop:top-[-50px] h-full">
        <LazyImgix
          id={'ipadFlowerBg'}
          image={scribble.image}
          sizes="(max-width: 666px) 40vw, 1200px"
          srcSet={
            `
              ${scribble.defaultSrc}&w=600&fit=clip 600w,
              ${scribble.defaultSrc}&w=1200&fit=clip 1200w,
              `}
        />
        {/* <Picture >
          <Source
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes'
            }}
            src={staticImages.scribbles.scribble_3.src}
            width={650}
            htmlAttributes={{ media: "(min-width: 1280px)" }}
          />
          <Source
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes'
            }}
            src={staticImages.scribbles.scribble_3.src}
            width={550}
            htmlAttributes={{ media: "(min-width: 1024px)" }}
          />
          <Source
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes'
            }}
            src={staticImages.scribbles.scribble_3.src}
            width={500}
            htmlAttributes={{ media: "(min-width: 768px)" }}
          />
          <Source
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes'
            }}
            src={staticImages.scribbles.scribble_3.src}
            width={301}
            htmlAttributes={{ media: "(min-width: 320px)" }}
          />
          <Imgix
            className="lazyload"
            src={staticImages.scribbles.scribble_3.src}
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes'
            }}
            imgixParams={{ w: 100 }}
            htmlAttributes={{
              src: staticImages.scribbles.scribble_3.placeholder, // low quality image here
            }} />
        </Picture> */}
      </div>
    </div>
  )
}