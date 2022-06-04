import { staticImages } from "@App/lib/imgix/data"
import Imgix, { Picture, Source } from "react-imgix"
import { LazyLoadImage } from "react-lazy-load-image-component"
import LazyImageBase from "./lazyImage-base"

interface IFeatureProps {
  featuredImage: ImageLookupReturn
  product: IProduct
}
const IpadFeatureImage = ({ featuredImage, product }: IFeatureProps) => {

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
        <LazyImageBase image={featuredImage} id={product.slug} />
      </div>

      {/* IPAD DEVICE */}
      <div className="relative z-10 ipad">
        <LazyLoadImage
          key={'iPadFeature'}
          alt={`Every Tuesday New Product: ${product.title}`}
          effect="blur"
          placeholderSrc={staticImages.assets.ipad.flat.placeholder}
          src={staticImages.assets.ipad.flat.src}
        />
      </div>

      {/* GREEN TEXTURE  */}
      <div className="absolute top-[-110px] left-[40px] z-0 w-[390px] tablet:w-[500px] laptop:rotate-[85deg] laptop:w-[740px] laptop:left-[-130px] laptop:top-[-160px] desktop:w-[950px] desktop:left-[-320px] desktop:top-[-250px]">
        <Picture >
          <Source
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes'
            }}
            src={staticImages.textures.greenLarge.src}
            width={1200}
            htmlAttributes={{ media: "(min-width: 1200px)" }}
          />
          <Source
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes'
            }}
            src={staticImages.textures.greenLarge.src}
            width={740}
            htmlAttributes={{ media: "(min-width: 1024px)" }}
          />
          <Source
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes'
            }}
            src={staticImages.textures.greenLarge.src}
            width={600}
            htmlAttributes={{ media: "(min-width: 320px)" }}
          />
          <Imgix
            className="lazyload"
            src={staticImages.textures.greenLarge.src}
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes'
            }}
            imgixParams={{ w: 100 }}
            htmlAttributes={{
              alt: 'Every Tuesday Texture Pack: Green',
              src: staticImages.textures.greenLarge.placeholder, // low quality image here
            }} />
        </Picture>
      </div>
    </div>
  )
}

export default IpadFeatureImage