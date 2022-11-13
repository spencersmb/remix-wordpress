import { ShopPlatformEnum } from "@App/enums/products"
import useSite from "@App/hooks/useSite"
import { staticImages } from "@App/lib/imgix/data"
import LazyImgix from "../images/lazyImgix"
import CheckCircleSvg from "../svgs/checkCircle"
import EucalyptusSvg from "../svgs/eucalyptusSvg"
import StarSvg from "../svgs/starSvg"
import StrokeOneSvg from "../svgs/strokes/stroke-1"

interface Props {
  visible: boolean
}

const sellingPoints = [
  {
    text: 'Access to use every resouce Item for commercial use'
  },
  {
    text: 'All current and future items'
  },
  {
    text: 'Infinite commerical usage'
  },
]

/**
 * @Component ExtendedLicenseUpsell Component
 * @tested - 6/3/2022
 * 
 * Members area of Tuesday Makers Upsell for Extended License
 *
 */
function ExtendedLicenseUpsell(props: Props) {
  const { visible } = props
  const { state: { metadata: { serverSettings } } } = useSite()

  if (!visible) {
    return null
  }

  return (
    <>
      <div className='relative mb-20 bg-cream-300 col-span-full tablet:row-span-2 z-[4]'>
        <div className='mt-16 mb-28 laptop:mt-20 laptop:mb-20 desktop:mt-20'>
          <div className="grid-container">

            {/* SELL TEXT */}
            <div className="col-start-2 col-span-2 tablet:row-start-1 tablet:col-start-4 tablet:col-end-[12] laptop:col-start-2 laptop:col-end-[8] laptop:px-6 desktop:col-start-3 desktop:col-end-[8] flex flex-col relative z-10 justify-center">
              <h3 className="flex flex-col items-center mb-6 text-center tablet:mb-9 tablet:flex-row tablet:justify-center laptop:text-left laptop:justify-start text-grey-700" >
                <span className="text-5xl font-sentinel__SemiBoldItal tablet:leading-0">Upgrade License</span>
              </h3>
              <p className="mb-6 text-lg text-success-900 tablet:mb-9">
                When you join Tuesday Makers, you’ll receive instant access to the Resource Library, filled with textures, fonts, vectors, stationery, graphics, cheat sheets and more.
              </p>
            </div>

            {/* UPGRADE BUTTON */}
            <div className="relative flex flex-col mt-16 justify-center items-center max-w-[370px] mx-auto w-full col-start-2 col-span-2 tablet:col-start-3 tablet:col-end-[13] tablet:mt-8 laptop:mt-0 laptop:row-start-1 laptop:col-start-8 laptop:col-end-[14] desktop:ml-auto desktop:col-start-8 desktop:col-end-13">

              {/* TOP SVG */}
              <div className="z-1 w-[240px] rotate-6 absolute top-[-100px] left-[-90px] tablet:left-[-70px] tablet:w-[410px] tablet:rotate-[-44deg] ">
                <EucalyptusSvg fill="#fff" />
              </div>

              {/* BOTTOM SVG */}
              <div className="z-1 w-[240px] rotate-45 absolute top-[60%] left-[40%] tablet:w-[380px] tablet:top-[20%] tablet:left-[40%]">
                <EucalyptusSvg fill="#fff" />
              </div>

              {/* CARD DESIGN */}
              <div className="wrapper relaitve bg-white p-[35px] z-2 shadow-xxl-grey desktop:p-[45px]">
                <div className="relative flex flex-col desktop:items-center">

                  <div className="absolute top-[-71px] left-[47%] -translate-x-1/2 w-[90px]">
                    <LazyImgix
                      id={'black-pin'}
                      image={{
                        ...staticImages.assets.pins.black_1,
                        alt: 'Every Tuesday Black Pin'
                      }}
                    />
                  </div>

                  <div data-testid="ext-card-title" className="flex-1 mb-8 text-center text-grey-700">
                    <div className="text-grey-700">Resource Library</div>
                    <div className="text-heading-3 font-sentinel__SemiBoldItal">Commercial License</div>
                  </div>

                  <div className="mb-8">
                    <ul data-testid="selling-points" className="max-w-[290px] m-auto">
                      {sellingPoints.map((point, index) => (
                        <li key={index} className="flex flex-row mb-6 text-grey-700">
                          <span className="w-[24px] h-[24px] mr-2 "><CheckCircleSvg stroke='currentColor' /></span>
                          <span className="flex-1 font-medium">{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {serverSettings.productPlatform === ShopPlatformEnum.GUMROAD &&
                      <>
                        <a
                          data-testid="gumroad-btn"
                          href="https://gum.co/freebie-license?wanted=true&locale=false" className="btn btn-primary btn-lg gumroad-btn-view">
                          <span className="flex-1 mr-9">
                            Buy Now!
                          </span>
                          <span className="text-2xl font-sentinel__SemiBoldItal">$30</span>
                        </a>
                      </>
                    }
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ExtendedLicenseUpsell
