import LazyImageBase from "../images/lazyImage-base"

interface Props { }

function SpecialDeals(props: Props) {
  const { } = props
  const iPadImg: IMediaDetailSize = {
    width: '1000',
    height: '733',
    altTitle: 'Nab special deals on Every-Tuesday Courses + Products',
    placeholder: '/images/makers-ipad.png',
    sizes: '',
    sourceUrl: '/images/makers-ipad.png',
    srcSet: '',
  }
  return (
    <div className="bg-primary-400 relative flex flex-col-reverse tablet:rounded-2.5xl tablet:mt-80 laptop:flex-row px-5 py-16 mt-16 tablet:p-16 tablet:my-20 laptop:py-20 laptop:px-20 laptop:mt-8 laptop:mb-20 desktop:px-24 desktop:py-28 desktop:mt-24 desktop:mb-40">

      <div className="relative z-10 flex flex-col mt-6 text-neutral-50 tablet:text-center tablet:mt-60 tablet:mx-20 laptop:mx-0 laptop:text-left laptop:flex-[1_1_50%] laptop:max-w-[50%] laptop:mt-0 desktop:max-w-[36%]">
        <h3 className="mb-5 text-4xl tablet:text-5xl font-sentinel__SemiBoldItal">
          Nab special deals on Courses + Products
        </h3>
        <p className="mb-5 text-xl font-semibold">
          It’s all free to you for being a part of this supportive community!
        </p>
        <p className="text-lg">
          When you join Tuesday Makers, you’ll receive instant access to the Resource Library, filled with textures, fonts, vectors, stationery, graphics, cheat sheets and more.
        </p>

      </div>

      <div className="relative flex-auto tablet:absolute tablet:top-[5%] tablet:left-[40px] laptop:top-[50%] tablet:translate-y-[-50%] laptop:left-[50%] tablet:w-[690px] desktop:w-[760px] desktop:left-[43%] ">
        <div className="relative z-10 transform rotate-3 laptop:rotate-[-10deg]">
          <LazyImageBase id={'specialDealsIPad'} image={iPadImg} />
        </div>

      </div>
    </div>
  )
}

export default SpecialDeals
