import { ShopPlatformEnum } from "@App/enums/products"
import useSite from "@App/hooks/useSite"
import CheckCircleSvg from "../svgs/checkCircle"
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
function ExtendedLicenseUpsell(props: Props) {
  const { visible } = props
  const { state: { metadata: { serverSettings } } } = useSite()


  if (!visible) {
    return null
  }

  return (
    <>
      <div className='bg-neutral-100 col-span-full tablet:row-span-2'>
        <div className='mt-16 mb-28 laptop:mt-20 laptop:mb-20 desktop:mt-20'>
          <div className="grid-container">

            {/* SELL TEXT */}
            <div className="col-start-2 col-span-2 tablet:row-start-1 tablet:col-start-4 tablet:col-end-[12] laptop:col-start-2 laptop:col-end-[8] laptop:px-6 desktop:col-start-3 desktop:col-end-[8] flex flex-col relative z-10 justify-center">
              <h3 className="flex flex-col items-center mb-6 text-center tablet:mb-9 tablet:flex-row tablet:justify-center laptop:text-left laptop:justify-start" >
                <span className="mb-2 bg-success-600 w-[54px] h-[54px] rounded-full flex justify-center items-center p-[12px] mr-3 tablet:mb-2 laptop:mb-0">
                  <StarSvg stroke={'#fff'} />
                </span>
                <span className="text-5xl font-sentinel__SemiBoldItal text-success-600 tablet:leading-0">Upgrade License</span>
              </h3>
              <p className="mb-6 text-lg text-success-900 tablet:mb-9">
                When you join Tuesday Makers, you’ll receive instant access to the Resource Library, filled with textures, fonts, vectors, stationery, graphics, cheat sheets and more.
              </p>
            </div>

            {/* UPGRADE BUTTON */}
            <div className="relative flex flex-col mt-4 justify-center items-center max-w-[743px] w-full col-start-2 col-span-2 tablet:col-start-3 tablet:col-end-[13] tablet:mt-8 laptop:mt-0 laptop:row-start-1 laptop:col-start-8 laptop:col-end-[14] desktop:ml-auto desktop:col-start-8 desktop:col-end-13">

              <div className="w-[800px] absolute top-[80%] left-[60%] transform translate-x-[-50%] translate-y-[-50%] tablet:w-[1132px] tablet:top-[70%] laptop:top-[70%] laptop:left-[75%] desktop:left-[65%] desktop:top-[80%]">
                <StrokeOneSvg fill="#8FB1B1" opacity={'.7'} />
              </div>

              <div className="wrapper relaitve bg-white p-[35px] rounded-2.5xl z-10 shadow-xxl-teal desktop:p-[45px]">
                <div className="flex flex-col desktop:items-center">
                  <div className="flex-1 mb-8 text-center text-success-600">
                    <div className="text-success-500">Resource Library</div>
                    <div className="text-heading-3 font-sentinel__SemiBoldItal">Commercial License</div>
                  </div>
                  <div className="mb-8">
                    <ul className="max-w-[290px] m-auto">
                      {sellingPoints.map((point, index) => (
                        <li key={index} className="flex flex-row mb-6 text-success-700">
                          <span className="w-[24px] h-[24px] mr-2"><CheckCircleSvg stroke='currentColor' /></span>
                          <span className="flex-1 font-medium">{point.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    {serverSettings.productPlatform === ShopPlatformEnum.GUMROAD &&
                      <>
                        <a href="https://everytuesday.gumroad.com/l/freebie-license" className="flex flex-row items-center justify-center flex-none text-lg font-medium btn rounded-2xl btn-teal-600">
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
