import LazyImgix from '@App/components/images/lazyImgix'
import LfmArrowSvg from '@App/components/svgs/lfmArrowSvg'

interface Props {
  fontLoadingState: string
  date: string
  form?: React.ReactNode
}

/**
 * 
 * @component MiniCourseHeader
 * @tested 07/07/2022
 */
function MiniCourseHeader(props: Props) {
  const { fontLoadingState, date, form } = props

  const introImages = [
    {
      src: 'https://et-website.imgix.net/et-website/images/lfm/fonts/whiskey-bite.jpeg',
      alt: "Learn Font Making Project by: Paperly Studio",
      width: 400,
      height: 267,
      placeholder: 'https://et-website.imgix.net/et-website/images/lfm/fonts/whiskey-bite.jpeg?w=20&fit=clip',
    },
    {
      src: 'https://et-website.imgix.net/et-website/images/lfm/fonts/bonjour-mon-ami.jpeg',
      alt: "Font Project by: Laura Bolter Design",
      width: 400,
      height: 267,
      placeholder: 'https://et-website.imgix.net/et-website/images/lfm/fonts/bonjour-mon-ami.jpeg?w=20&fit=clip',
    },
    {
      src: 'https://et-website.imgix.net/et-website/images/lfm/fonts/sweet-boy.jpeg',
      alt: "Learn Font Making Project by: Modest Designary",
      width: 400,
      height: 267,
      placeholder: 'https://et-website.imgix.net/et-website/images/lfm/fonts/sweet-boy.jpeg?w=20&fit=clip',
    },
    {
      src: 'https://et-website.imgix.net/et-website/images/lfm/fonts/honey-font.jpeg',
      alt: "Learn Font Making Project by: Dansie Design",
      width: 400,
      height: 267,
      placeholder: 'https://et-website.imgix.net/et-website/images/lfm/fonts/honey-font.jpeg?w=20&fit=clip',
    },
    {
      src: 'https://et-website.imgix.net/et-website/images/lfm/fonts/gingerbread.jpeg',
      alt: "Learn Font Making Project by: Studio Denmark",
      width: 400,
      height: 267,
      placeholder: 'https://et-website.imgix.net/et-website/images/lfm/fonts/gingerbread.jpeg?w=20&fit=clip',
    }
  ]
  return (
    <div className="et-grid-basic">
      <div className='hidden lfm-intro__cardsbg bg-lfm-pink-200 row-span-1 row-start-1 col-start-8 col-end-[-1] laptop:block'></div>

      {/* INTRO CARDS COMPONENT */}
      <div className="col-span-full lfm-intro__cards h-[300px] z-[2] relative bg-lfm-pink-200 tablet:h-[400px] laptop:bg-transparent laptop:h-[695px] laptop:row-span-2 laptop:row-start-1 laptop:col-start-8 laptop:col-end-[14]">

        <div
          data-testid="intro-header-fonts"
          className="lfm-intro__cardsContent">
          {introImages.map((image, index) => {
            return (
              <div key={index} className="lfm-intro__font">
                <LazyImgix
                  key={index}
                  image={image}
                  id={index}
                />
              </div>
            )
          })}
          {fontLoadingState === 'completed' &&
            <div className="hidden tablet:block tablet:absolute tablet:bottom-[-30px] tablet:right-[200px] tablet:rotate-[5deg] laptop:bottom-[-40px] laptop:right-[-20px] laptop:rotate-[-12deg]">
              <LfmArrowSvg className="absolute top-[-20px] left-[-50px] w-[42px] rotate-[-190deg] laptop:top-[-80px] laptop:rotate-[225deg] laptop:left-[62px] laptop:w-[60px]" />
              <p className="skinnyJeans">Actual fonts made by students</p>
            </div>
          }
        </div>

      </div>

      {/* INTRO HEADER */}
      <div className="lfm-intro__header">

        {/* DATE */}
        <div className="lfm-intro__enrollDate row-[date] flex flex-col text-center mt-9 self-end mb-7 text-lfm-blue-700 laptop:text-left laptop:m-[20px_0_20px_50px] desktop:m-[20px_0_20px_70px]">
          <span className="text-sm font-semibold text-lfm-blue-700">ENROLLMENT REOPENING</span>
          <span className="mb-2 text-4xl italic font-light font-sentinel__Book">{date}</span>
        </div>

        {/* TITLE */}
        <div className="lfm-intro__title bg-lfm-pink-200 relative mx-[-20px] row-[title] before:content-[''] before:bg-white before:absolute before:bottom-0 before:left-0 before:w-full before:h-[30px] tablet:before:h-[138px] laptop:bg-transparent laptop:before:bg-transparent laptop:mx-0 laptop:mb-8">
          <h1 className="text-display-1 font-sentinel__SemiBoldItal text-lfm-blue-700 my-0 mx-auto max-w-[375px] relative text-center tablet:max-w-[515px] tablet:text-8xl laptop:max-w-none laptop:text-left laptop:mb-4 laptop:text-[81px] desktop:text-8xl">Learn Font Making</h1>
        </div>

        {/* SUBTEXT */}
        <h2 className="px-[10px] mx-auto text-2xl font-semibold text-center text-lfm-pink-400 italic tablet:max-w-[570px] laptop:text-left laptop:max-w-[395px] laptop:p-0 laptop:m-[0_0_15px_50px] desktop:m-[0_0_15px_70px]">
          The proven step-by-step process to create professional and profitable hand lettered fonts.
        </h2>

        {/* CTA */}
        <p className="max-w-[625px] text-center text-lfm-blue-700 mt-5 mx-[10px] tablet:max-w-[570px] tablet:mt-5 tablet:mx-auto tablet:text-lg laptop:max-w-[395px] laptop:text-left laptop:m-[20px_0_5px_50px] desktop:m-[20px_0_5px_70px] desktop:max-w-[475px]">
          Sign up to get notified of the next public enrollment and take a free font making mini course while you wait!
        </p>

        {/* FORM */}
        <div className="pt-[25px] pb-[40px] tablet:max-w-[570px] tablet:mx-auto tablet:w-full laptop:max-w-[505px] laptop:ml-[50px] desktop:ml-[70px]">
          {form}
        </div>

      </div>
    </div>
  )
}

export default MiniCourseHeader
