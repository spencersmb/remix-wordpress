import { useFetcher, useTransition } from "@remix-run/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyImageBase from "../images/lazyImage-base";
import Imgix, { Picture, Source } from "react-imgix";
import { defaultImages, ImageSizeEnums, loadImageSrc } from "@App/utils/imageHelpers";
import { staticImages } from "@App/lib/imgix/data";
import MakersSignUpForm from "../forms/layout/makersSignUpForm";

const MakersFooterSignUp = () => {
  const tuesdayMakersSignUp = useFetcher();
  const transition = useTransition()
  const heroImage: IFeaturedImage = {
    altText: "Every Tuesday Makers Library",
    id: "ETMK",
    sizes: "",
    mimeType: "image/jpeg",
    sourceUrl: '/images/feature-image.jpg',
    srcSet: "",
    mediaDetails: {
      height: 1049,
      width: 1400,
      sizes: [
        {
          name: ImageSizeEnums.PLACEHOLDER,
          width: "20px",
          file: 'feature-image.jpg',
          height: "15px",
          sourceUrl: '/images/feature-image.jpg',
          mimeType: "image/jpeg",
        }
      ]
    }
  }
  const featuredImage = loadImageSrc({
    imageSizeName: ImageSizeEnums.SOURCE, // image name to try and get
    imageObject: heroImage, // the featured image object
    fallbackSize: ImageSizeEnums.FULL, // fallback size to use if the image name doesn't exist
    fallbackImage: defaultImages.featured
  })

  return (
    <div className="bg-sage-600 rounded-2.5xl shadow-et_4 mb-[7rem] mx-auto py-9 px-9 max-w-[486px] tablet:max-w-[630px] tablet:pb-14 laptop:max-w-none desktop:px-20 desktop:py-14 relative">

      {/* CONTENT */}
      <div className="flex flex-col mt-48 ml-auto text-primary-50 max-w-[478px] mx-auto tablet:mt-96 laptop:mr-0 laptop:max-w-[53%] mb-[10px] laptop:mt-0 relative">

        {/* IMAGE */}
        <div className="absolute w-full top-[-250px] left-[0px] max-w-[600px] tablet:top-[-400px] tablet:left-[20px] laptop:max-w-[90%] laptop:top-[20px] laptop:left-[-96%] desktop:left-[-630px] desktop:top-[-69px] desktop:max-w-[600px] transform rotate-[349deg]">
          <IpadFooterImage
            id={heroImage.id}
            featuredImage={featuredImage}
            alt={heroImage.altText}
          />
        </div>

        <h4 className="pb-4 font-sentinel__SemiBoldItal text-heading-3 tablet:text-display-2">
          Grab 50+ Design and Lettering Files!
        </h4>
        <p className="text-lg pb-11">
          When you join the Tuesday Makers, you’ll receive special offers on courses + products and gain access to the Resource Library, stocked with over 50 design and lettering files!
        </p>
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
  featuredImage: ImageLookupReturn
  alt: string
  id: string
}
const IpadFooterImage = ({ featuredImage, alt, id }: IFeatureProps) => {

  return (
    <div className="relative max-w-[1000px] z-20">

      {/* APPLE PENCIL */}
      <div className="absolute top-[30%] left-[70%] z-30 w-[5%] rotate-[52deg] origin-center">
        <LazyLoadImage
          key={'applePencil'}
          alt={'Every Tuesday Apple 2 Pencil'}
          effect="blur"
          placeholderSrc={staticImages.assets.applePencil.flat.placeholder}
          src={staticImages.assets.applePencil.flat.src}
        />
      </div>

      {/* IPAD ART */}
      <div className="absolute top-[-2.8%] left-[-2.7%] scale-[.81] w-full overflow-hidden rounded-md tablet:rounded-xl art z-20">
        <LazyImageBase image={featuredImage} id={id} />
      </div>

      {/* IPAD DEVICE */}
      <div className="relative z-10 ipad">
        <LazyLoadImage
          key={'iPadFeature'}
          alt={alt}
          effect="blur"
          placeholderSrc={staticImages.assets.ipad.flat.placeholder}
          src={staticImages.assets.ipad.flat.src}
        />
      </div>

      {/* SWATCH CARD */}
      <div className="absolute z-[1] swatches top-0 w-[60px] right-[-20px] rotate-[25deg] tablet:w-[100px] tablet:right-[-40px] tablet:top-[40px] laptop:top-0 laptop:right-[-10px] laptop:rotate-[15deg] desktop:right-[-20px]">
        <LazyLoadImage
          key={'iPadFeature'}
          alt={alt}
          effect="blur"
          placeholderSrc={staticImages.assets.swatchPalette.circles.placeholder}
          src={staticImages.assets.swatchPalette.circles.src}
        />
      </div>

      {/* SCRIBBLE TEXTURE  */}
      <div className="absolute top-[-50px] left-[-50px] z-0 w-[301px] tablet:left-[-200px] tablet:top-[-110px] tablet:w-[500px] laptop:w-[550px] laptop:left-[-130px] laptop:top-[-58px] desktop:w-[650px] desktop:left-[-190px] desktop:top-[-90px]">
        <Picture >
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
        </Picture>
      </div>
    </div>
  )
}