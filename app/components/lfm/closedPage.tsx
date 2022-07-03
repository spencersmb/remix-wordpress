import { useFonts } from "@App/hooks/useFonts"
import LfmMiniCourseSignUpForm from "../forms/lfm/miniCourseSignUp"
import LazyImgix from "../images/lazyImgix"
import LfmArrowSvg from "../svgs/lfmArrowSvg"

interface Props {
  date: string
}

function LfmClosedPage(props: Props) {
  const { date } = props
  const { fontLoadingState } = useFonts('skinny')

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
  const firstYearImages = [
    {
      src: 'https://et-website.imgix.net/et-website/images/lfm/fonts/skinny-jeans.jpeg',
      alt: "Learn Font Making Project by: Teela - Skinny Jeans",
      width: 400,
      height: 267,
      placeholder: 'https://et-website.imgix.net/et-website/images/lfm/fonts/skinny-jeans.jpeg?w=20&fit=clip',
    },
    {
      src: 'https://et-website.imgix.net/et-website/images/lfm/fonts/espresso-roast.jpeg',
      alt: "Learn Font Making Project by: Teela - Espresso Roast",
      width: 400,
      height: 267,
      placeholder: 'https://et-website.imgix.net/et-website/images/lfm/fonts/espresso-roast.jpeg?w=20&fit=clip',
    },
    {
      src: 'https://et-website.imgix.net/et-website/images/lfm/fonts/tuesday-script.jpeg',
      alt: "Learn Font Making Project by: Teela - Tuesday Script",
      width: 400,
      height: 267,
      placeholder: 'https://et-website.imgix.net/et-website/images/lfm/fonts/tuesday-script.jpeg?w=20&fit=clip',
    },
  ]
  const authorImage = {
    src: 'https://et-website.imgix.net/et-website/images/teela-profile.jpeg?w=450&fit=clip',
    alt: "Learn Font Making: Your Instructor Teela Cunninghamo",
    width: 390,
    height: 497,
    placeholder: 'https://et-website.imgix.net/et-website/images/lfm/fonts/teela-profile.jpeg?w=20&fit=clip',
  }
  const authorWatercolor = {
    src: 'https://et-website.imgix.net/et-website/textures/watercolor-03.png?w=500&fit=clip',
    alt: "Learn Font Making: Watercolor Texture",
    width: 500,
    height: 512,
    placeholder: 'https://et-website.imgix.net/et-website/textures/watercolor-03.png?w=20&fit=clip',
  }
  const authorScribble = {
    src: 'https://et-website.imgix.net/et-website/textures/stroke-10.jpeg',
    alt: "Learn Font Making: Watercolor Texture",
    width: 609,
    height: 142,
    placeholder: 'https://et-website.imgix.net/et-website/textures/stroke-10.jpeg?w=20&fit=clip',
  }
  return (
    <>
      {/* < !--main intro sign up for mini course-- > */}
      <div className=''>

        {/* HEADER */}
        <div className="et-grid-basic">
          <div className='hidden lfm-intro__cardsbg bg-lfm-pink-200 row-span-1 row-start-1 col-start-8 col-end-[-1] laptop:block'></div>

          {/* INTRO CARDS COMPONENT */}
          <div className="col-span-full lfm-intro__cards h-[300px] z-[2] relative bg-lfm-pink-200 tablet:h-[400px] laptop:bg-transparent laptop:h-[695px] laptop:row-span-2 laptop:row-start-1 laptop:col-start-8 laptop:col-end-[14]">

            <div className="lfm-intro__cardsContent">
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
              {fontLoadingState.status === 'completed' && <IntroSvgText />}
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
              <LfmMiniCourseSignUpForm />
            </div>

          </div>
        </div>

        {/* $40k Intro */}
        <div className="et-grid-basic lfm-myFonts col-span-full">
          <div className="lfm-myFonts__fontsBg bg-lfm-pink-200 row-span-2 row-start-1 col-start-1 col-span-2 relative z-[1] tablet:col-start-1 tablet:col-span-9 laptop:col-start-1 laptop:col-span-6 desktop:col-start-1 desktop:col-span-5" />

          {/* FONT IMAGES */}
          <div className="lfm-myFonts__fontsContent w-full col-span-full row-start-2 row-span-1 relative z-[2] max-w-[375px] mx-auto tablet:max-w-[525px] tablet:col-start-3 tablet:col-span-10 tablet:mx-[30px] laptop:max-w-[501px] laptop:col-start-1 laptop:col-span-8 desktop:m-0 desktop:col-start-2 desktop:col-span-7">
            <div className="lfm-myFonts__fonts">
              {firstYearImages.map((image, index) => {
                return (
                  <div key={index}
                    className="lfm-myFonts__font">
                    <LazyImgix
                      key={index}
                      image={image}
                      id={index}
                    />
                  </div>
                )
              })}
            </div>
            {fontLoadingState.status === 'completed' && <div className="lfm-myFonts__quote absolute left-[15px] bottom-[-60px] rotate-[-15deg] tablet:bottom-auto tablet:top-[210px] tablet:left-auto tablet:right-[-30px]">
              <LfmArrowSvg
                className="w-[62px] rotate-[250deg] tablet:absolute tablet:bottom-[-50px] tablet:left-[-50px] tablet:rotate-[320deg] tablet:scale-[-1]"
              />
              <p className="text-lg text-lfm-blue-700 skinnyJeans">My Fonts</p>
            </div>}

          </div>

          <div className="lfm-myFonts__content row-start-3 col-start-2 col-span-2 mt-20 mx-0 mb-[30px] flex flex-col tablet:col-start-4 tablet:col-span-8 tablet:mb-6 tablet:mt-16 laptop:col-start-9 laptop:col-span-5 laptop:row-start-1 laptop:row-span-2">
            <h2 className="mt-5 mb-3 text-3xl font-sentinel__SemiBoldItal text-lfm-pink-400">
              In my first year creating and selling hand lettered fonts, I made $40,000
            </h2>
            <span className="mb-8 font-sentinel__SemiBoldItal text-lfm-pink-400">(that’s not a typo!)</span>
            <p className="text-lg">
              This is passive income at its finest. When you sell a digital product (like a font) online, you get paid and the buyer
              downloads it instantly. End of story. No restocking supplies, packing orders or trips to the post office. Make a font once, sell it forever.
            </p>
          </div>

        </div>

        {/* ABOUT ME */}
        <div className="pb-10 tablet:py-20">
          <div className="et-grid-basic gap-y-0 grid-rows-[auto_auto_auto_1fr] tablet:gap-x-8">

            {/* PROFILE IMAGE */}
            <div className="relative row-start-2 lfm-about-me__profile profile col-span-full tablet:col-start-2 tablet:col-span-6 tablet:row-start-2 tablet:row-span-4 tablet:self-center laptop:col-start-2 laptop:col-span-5 laptop:row-start-1">

              {/* PROFILE IMG CONTAINER */}
              <div className="profile__container bg-lfm-pink-200 p-12 relative max-w-[400px] mx-auto z-2 min-h-[400px] tablet:max-w-[334px] tablet:mr-0 tablet:p-9 tablet:min-h-[505px] laptop:max-w-[410px] laptop:mr-[-20px] laptop:min-h-[603px]">

                {/* PROFILE IMAGE WRAPPER*/}
                <div className="relative z-2 tablet:h-[435px] tablet:overflow-hidden tablet:max-w-[235px] tablet:mx-auto laptop:mx-auto laptop:max-w-[288px] laptop:overflow-hidden laptop:h-[533px]">
                  <div className="tablet:absolute tablet:bottom-auto tablet:left-1/2 tablet:right-auto tablet:top-1/2 tablet:translate-x-[-50%] tablet:translate-y-[-50%] tablet:w-[400px]">
                    <LazyImgix
                      key={'Author'}
                      image={authorImage}
                      id={'author_image'}
                    />
                  </div>
                </div>

                {/* WATERCOLOR */}
                <div className="absolute top-[-80px] left-[-290px] w-[480px] z-1 tablet:max-w-[480px] tablet:top-[-50px] tablet:left-[-51%]">
                  <div>
                    <LazyImgix
                      key={'Author'}
                      image={authorWatercolor}
                      id={'author_image'}
                    />
                  </div>
                </div>

              </div>

              {/* SCRIBBLE */}
              <div className="hidden z-1 tablet:absolute tablet:block tablet:bottom-[-10px] tablet:left-[-40px] tablet:rotate-[-15deg] img-child-w-auto">

                <LazyImgix
                  key={'Scribble'}
                  image={authorScribble}
                  id={'scribble_image'}
                />

              </div>

            </div>

            {/* lfm-about-me__subhead */}
            <div className="lfm-about-me__subhead z-2 relative w-full mx-auto max-w-[400px] row-start-1 col-span-full top-[15px] tablet:col-start-8 tablet:col-span-6 tablet:top-0 laptop:col-start-7 laptop:col-span-7 laptop:mx-7 laptop:mt-5 laptop:mb-4 desktop:mt-9 desktop:mx-12 desktop:mb-4">
              <p className="relative ml-5 text-4xl font-sentinel__SemiBoldItal text-lfm-blue-700 z-1 tablet:text-base tablet:ml-0 laptop:text-lg">
                Your Instructor
              </p>
            </div>

            {/* lfm-about-me__hello */}
            <div className="relative col-span-2 col-start-2 row-start-3 mt-4 lfm-about-me__hello z-2 tablet:row-start-3 tablet:col-start-5 tablet:col-span-8 laptop:mb-8 desktop:ml-14">
              <p className="text-5xl text-lfm-blue-700 font-sentinel__SemiBoldItal tablet:text-[65px] laptop:text-[80px] laptop:col-start-5 laptop:col-span-9 laptop:ml-7">
                Hey, I'm Teela
              </p>
            </div>

            {/* lfm-about-me__desc */}
            <div className="relative col-span-2 col-start-2 row-start-4 lfm-about-me__desc z-2 tablet:col-start-8 tablet:col-span-6 laptop:col-start-7 laptop:col-span-7 laptop:ml-7 desktop:mx-12">
              <div className="max-w-[400px] mx-auto laptop:max-w-none">
                <h3 className="my-4 text-2xl italic font-semibold text-lfm-pink-400">I help creatives build and improve their digital skills to open new opportunities.</h3>
                <p className="mb-4 text-lg">
                  If you’re familiar with Every Tuesday, then you know my love for lettering + design runs deep. In fact, in the last 6 years, I’ve taught over 200,000 students and my design + lettering videos on YouTube have accumulated over 19 million views
                </p>
                <p className="mb-4 text-lg">
                  I love sharing what I’ve learned over my career and motivating others to create something new every week.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default LfmClosedPage

const IntroSvgText = () => {
  return (
    <div className="hidden tablet:block tablet:absolute tablet:bottom-[-30px] tablet:right-[200px] tablet:rotate-[5deg] laptop:bottom-[-40px] laptop:right-[-20px] laptop:rotate-[-12deg]">
      <svg
        className="absolute top-[-20px] left-[-50px] w-[42px] rotate-[-190deg] laptop:top-[-80px] laptop:rotate-[225deg] laptop:left-[62px] laptop:w-[60px]"
        viewBox="0 0 57 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M45.597 43.4778C45.5737 43.2416 45.562 43.0011 45.5242 42.7683C45.4307 42.1883 45.3776 41.5924 45.2396 41.0211C45.1324 40.5665 44.8665 40.143 44.7959 39.6865C44.7726 39.3624 44.8617 39.0401 45.048 38.7739C45.1391 38.6399 45.4879 38.6822 45.7542 38.6371C45.6975 38.4998 45.8865 38.1856 45.5131 38.0419C45.4898 38.0339 45.4917 37.8587 45.5315 37.7961C45.6751 37.597 45.8598 37.4288 45.993 37.2238C46.0405 37.1498 45.98 37.01 45.9697 36.9005C45.8645 36.9225 45.7412 36.9124 45.6648 36.9769C45.5911 37.0666 45.538 37.1714 45.5093 37.2839C45.4607 37.4056 45.4171 37.5362 45.3711 37.6918C45.1126 37.4641 44.9517 37.28 45.1409 36.9868C45.4768 36.4669 45.4226 35.8857 45.3709 35.3172C45.3239 34.8732 44.9586 34.4614 45.2855 33.996C45.3094 33.9636 45.2366 33.8684 45.2566 33.8288C45.3841 33.5847 45.0368 33.1839 45.5233 33.054C45.4047 32.9611 45.2297 32.8932 45.1842 32.7755C44.9465 32.1737 44.7421 31.56 44.5109 30.9074L45.0874 30.8159C44.7871 30.419 44.9929 29.761 44.3861 29.5002L44.3407 29.6483L44.2281 29.9687C44.0766 29.8823 43.9372 29.7761 43.8138 29.6529C43.7865 29.6048 43.8816 29.4238 43.9586 29.3355C44.0118 29.2769 44.0764 29.2299 44.1484 29.1972C44.0436 28.8213 43.8433 28.4971 43.9018 28.2309C44.0019 27.7765 43.7595 27.5068 43.5431 27.2247C43.2869 26.9225 43.0124 26.6365 42.7209 26.3682L42.8812 25.8208C42.5405 25.4938 42.26 25.2316 41.9885 24.9643C41.9498 24.9251 41.9424 24.8539 41.9131 24.8023C41.8414 24.6759 41.7697 24.5494 41.6873 24.429C41.5119 24.1778 41.2784 23.9195 41.4504 23.5961C41.5695 23.3662 41.4992 23.2672 41.3755 23.0738C41.1959 22.7778 40.6695 22.6174 40.9084 22.2043C40.763 21.9478 40.5835 21.7601 40.5553 21.5525C40.5076 21.2484 40.3674 20.9663 40.1537 20.7447C39.9322 20.4867 39.7346 20.1963 39.7859 19.8095C39.7706 19.7046 39.7165 19.6093 39.6344 19.5423C39.3399 19.2387 39.0404 18.9637 38.7534 18.6651C38.7117 18.6205 38.757 18.5054 38.7344 18.4406C38.604 18.1027 38.7452 17.6296 38.2443 17.4641C38.195 17.434 38.1526 17.3939 38.12 17.3463C38.0873 17.2987 38.0651 17.2447 38.0547 17.1879C37.9911 16.8475 37.792 16.7038 37.3784 16.6842L37.8644 17.8442L37.8733 17.9804C37.4928 17.6289 37.5518 18.1273 37.4072 18.1129C37.2141 18.0061 37.0276 17.8879 36.8487 17.7588C36.7362 17.6747 36.651 17.5592 36.604 17.4268C36.4892 16.9836 36.4037 16.559 35.82 16.4593C35.4713 16.4005 35.5413 15.9678 35.3285 15.7542C35.1848 15.6004 35.0989 15.4655 34.8664 15.5244C34.7656 15.5372 34.6637 15.5373 34.5629 15.5247L34.6326 15.4193C34.4893 15.2389 34.3306 15.0714 34.1581 14.9187C33.7995 14.6514 33.6484 14.1275 33.1222 14.0587C33.1222 14.0587 33.1086 14.0099 33.0879 13.9982C32.982 13.8802 32.8583 13.7796 32.7212 13.7001C32.4374 13.5856 32.1915 13.5297 31.9762 13.2164C31.7242 12.8674 31.2521 12.6739 30.8682 12.4326C30.6406 12.2886 30.3962 12.173 30.0933 12.0082C30.0904 12.3559 30.0582 12.5647 29.7153 12.512C29.7737 12.3495 29.8298 12.2118 29.8788 12.0616C29.9585 11.8493 29.8205 11.8217 29.6657 11.7894C29.5109 11.7572 29.3706 11.7214 29.2148 11.6709C29.1874 11.6567 29.1606 11.6412 29.1345 11.6246C28.9116 11.5345 28.7007 11.4988 28.5812 11.8442C28.4549 11.7252 28.366 11.6391 28.2688 11.5506C28.0871 11.3878 27.9094 11.2155 27.7138 11.0699C27.6753 11.0556 27.6338 11.0512 27.5931 11.0571C27.5525 11.0629 27.5139 11.0787 27.4809 11.1031C27.1371 11.4722 27.0045 11.4791 26.7392 11.0694C26.6736 10.9536 26.6904 10.7841 26.6673 10.6395C26.2327 10.2881 25.6828 10.7835 25.2439 10.4369C25.2369 10.4244 25.1974 10.4421 25.1758 10.4496C24.9625 10.5259 24.8255 10.4294 24.835 10.2263C24.8446 10.0232 24.7214 9.96361 24.5562 9.94198L23.4754 9.80403C23.4565 9.89464 23.4276 9.98286 23.3892 10.0671C23.3301 10.1868 23.2447 10.2915 23.1393 10.3735C23.0948 10.3987 22.9448 10.3002 22.8714 10.2289C22.593 9.95368 22.4526 9.95093 22.1878 10.2352C22.1637 10.23 22.1335 10.2307 22.118 10.2159C21.6441 9.7951 21.1589 9.52888 20.5599 9.99563C20.5284 10.0121 20.4937 10.0215 20.4582 10.0234C20.4227 10.0252 20.3872 10.0194 20.3541 10.0064C19.9806 9.85809 19.523 10.2423 19.1923 9.82497C19.1771 9.79826 19.08 9.8345 19.0226 9.84116C18.4835 9.91147 17.9426 9.98279 17.3976 10.0259C17.2149 10.04 17.024 9.94823 16.8394 9.95878C16.5359 9.97554 16.2163 10.105 15.9333 10.0583C15.5564 10.0037 15.4061 10.0749 15.5196 10.5282C15.2781 10.5216 15.0816 10.4988 14.8648 10.49C14.7489 10.4904 14.6332 10.5001 14.5189 10.5191C14.3532 10.5424 14.1895 10.5857 14.025 10.5943C13.8604 10.6029 13.692 10.5384 13.5689 10.587C13.0576 10.8016 12.4479 10.7307 11.9968 11.1348C11.9555 11.1587 11.9099 11.1741 11.8626 11.1803L10.0471 11.7389C10.0168 11.7561 9.96453 11.7552 9.94845 11.7808C9.7583 12.0721 9.45984 12.0978 9.15356 12.1844C8.73382 12.333 8.32976 12.5227 7.94727 12.7507C7.33018 13.0653 6.73804 13.4363 6.09903 13.6998C5.56544 13.9189 5.05024 14.1803 4.55835 14.4815C4.27056 14.6588 3.94511 14.7822 3.6679 14.9864C3.16998 15.3535 2.71992 15.7592 2.24 16.1373C1.76007 16.5153 1.28833 16.8745 0.832985 17.2669C0.377642 17.6592 0.396277 17.8581 0.855466 18.1367C0.741445 18.5167 0.771025 18.5564 1.15796 18.5747C1.43089 18.587 1.75641 18.5178 1.96193 18.6437C2.31672 18.8543 2.56177 18.7013 2.87018 18.5852C3.49079 18.3557 4.12097 18.1514 4.75115 17.9471C5.17135 17.8124 5.61573 17.7369 6.01752 17.5656C6.73133 17.2597 7.41971 16.8882 8.12722 16.5671C9.05064 16.1494 9.9806 15.7516 10.9121 15.3482C11.0545 15.2839 11.1654 15.1433 11.3091 15.0854C11.8352 14.8718 12.3598 14.6473 12.9025 14.4879C13.4452 14.3285 14.0557 14.2224 14.6341 14.0968C14.9922 14.0185 15.3517 13.9512 15.7108 13.8747C16.2883 13.7519 16.8603 13.5571 17.4448 13.5128C18.2202 13.4646 18.998 13.4678 19.7731 13.5224C20.9856 13.5856 22.1851 13.6257 23.3474 14.061C24.5505 14.5226 25.7804 14.9361 26.8916 15.6216C28.1599 16.4016 29.4124 17.2118 30.3784 18.3844C30.7335 18.8114 31.1512 19.1912 31.4872 19.6385C32.1114 20.4613 32.5326 21.3992 33.1957 22.2117C33.6403 22.7551 33.9486 23.411 34.3026 24.0269C34.4278 24.2478 34.4802 24.5146 34.6202 24.72C34.6887 24.82 34.8894 24.8544 35.0331 24.8671C35.093 24.8731 35.1643 24.7457 35.2522 24.6558C35.7126 24.8866 35.2269 25.242 35.3064 25.5194C35.6558 25.6249 35.9992 25.7243 36.3371 25.8387C36.4194 25.8744 36.4859 25.9386 36.5244 26.0196C36.6129 26.2048 36.6899 26.4153 36.7646 26.6177C36.8157 26.7534 36.8551 26.8935 36.9207 27.0963L36.53 26.9178L36.6679 27.6798L36.7509 27.6892L36.9137 27.2251L37.0227 27.2056C37.0621 27.3718 37.1209 27.5328 37.1981 27.6851C37.448 28.0636 37.6658 28.4437 37.6612 28.917C37.6603 28.9693 37.7288 29.0363 37.7889 29.0799C37.9482 29.199 38.1162 29.3085 38.2733 29.4195L37.9836 29.8591L38.8035 29.9355C38.8085 29.9909 38.8101 30.0465 38.8085 30.1021C38.8042 30.149 38.794 30.1951 38.7781 30.2394C38.5916 30.7405 38.6764 31.189 39.1228 31.4866C39.4135 31.6795 39.4428 31.9264 39.4617 32.217C39.4849 32.4155 39.5181 32.6126 39.5613 32.8077C39.2745 32.9703 39.4578 33.3018 39.4913 33.5934C39.498 33.6508 39.7455 33.6847 39.9411 33.7432C39.9071 33.866 39.864 34.0223 39.8249 34.1692C39.7955 34.303 39.7854 34.4402 39.7948 34.5769C39.8112 34.7676 39.8623 34.9575 39.8952 35.1483C39.9083 35.356 39.9458 35.5615 40.0069 35.7604C40.1718 36.1259 40.4137 36.457 40.5633 36.8288C40.6751 37.109 40.6284 37.4626 40.7632 37.7251C40.9426 38.0238 41.0221 38.3719 40.9901 38.7189C41.0004 38.8133 41.0318 38.9041 41.0819 38.9846C41.1832 39.2379 41.221 39.4541 40.978 39.6813C40.6311 40.0075 40.651 40.1962 40.9248 40.4175L41.2493 40.1182L41.384 40.1689L41.4481 40.9586C40.8564 41.1105 40.8326 41.1805 41.1521 41.6818L41.4235 41.5586C41.4435 41.6437 41.4565 41.6999 41.4764 41.7639C41.5946 42.1841 41.7056 42.6083 41.8419 43.0229C41.8941 43.1101 41.9769 43.1747 42.0741 43.2042C42.1066 43.2019 42.1382 43.1923 42.1665 43.1763C42.1949 43.1602 42.2193 43.138 42.238 43.1113C42.2089 43.0222 42.1737 42.9352 42.1327 42.8509C42.097 42.7299 42.0201 42.5735 42.0669 42.4858C42.1136 42.3981 42.2824 42.3636 42.4617 42.2855C42.4449 42.5963 42.4269 42.7971 42.4227 42.9972C42.4193 43.4062 42.3706 43.4574 41.9744 43.4184C41.9159 43.6681 42.0012 43.8269 42.2627 43.8315C42.6345 43.8396 42.7727 44.1166 42.8845 44.3803C42.9347 44.4978 42.8206 44.6826 42.8081 44.7602L42.8276 45.5376L42.7023 45.578C42.6085 45.45 42.5086 45.3278 42.4219 45.1957C42.3353 45.0636 42.2393 44.9109 41.9956 44.9667C41.8978 44.9893 41.7169 44.8447 41.6404 44.7304C41.4554 44.454 41.4822 44.0364 41.0604 43.9108C41.022 43.88 40.9918 43.8403 40.9723 43.7951C40.9528 43.75 40.9447 43.7007 40.9487 43.6517C41.1046 43.4409 40.9253 43.3779 40.8159 43.2846C40.5024 43.0222 40.1749 42.7725 39.8762 42.4947C39.72 42.3479 39.6374 42.1359 39.4858 41.9889C38.7063 41.2283 37.903 40.4882 36.8798 40.0657C36.5488 39.9263 36.191 39.8623 35.8322 39.8784C35.4769 39.9033 35.1392 40.1254 34.7817 40.1798C34.3508 40.25 33.9258 40.2392 33.5237 40.4224C32.8983 40.7182 32.0956 40.6556 31.6846 41.3005C31.7769 41.7 32.6519 41.4086 32.3343 42.1558L32.6618 42.3184L32.8646 42.1282C33.294 42.5907 33.7146 43.0254 34.114 43.4767C34.5134 43.928 34.9175 44.4331 35.322 44.9098C35.8612 45.5455 35.9993 46.4697 36.8666 46.804C36.6772 47.2503 36.6838 47.2701 37.1222 47.7487L37.3017 47.4634L37.3996 47.4079C37.481 47.8959 38.1315 47.9931 38.0776 48.5579L38.4206 48.5611C38.0617 49.1317 38.068 49.147 38.4805 49.5674C38.7103 49.7875 38.9278 50.02 39.132 50.264C39.5647 50.8194 40.1945 51.1871 40.8909 51.2907C40.9861 51.3191 41.0783 51.3567 41.1663 51.4029L40.9447 51.6015C40.9646 51.7902 40.9374 51.9539 41.0036 52.0623C41.0985 52.2297 41.2539 52.4499 41.4103 52.4766C41.9911 52.5815 42.5802 52.6342 43.1705 52.6341C43.7322 52.6298 44.2913 52.5563 44.835 52.4152C45.8027 52.1463 46.7306 51.7508 47.5946 51.2388C48.006 51.0056 48.4512 50.7531 48.6777 50.3682C49.204 49.4908 50.1506 49.0435 50.7086 48.1929C51.0843 47.6104 51.7117 47.177 52.1926 46.6596C52.5825 46.2432 52.7285 45.6497 53.1912 45.2744C53.2321 45.2512 53.222 45.1628 53.2486 45.1101C53.2951 45.0178 53.35 44.9278 53.4021 44.8371C53.7546 44.2136 54.5551 43.7409 54.1452 42.8272C54.1038 42.7542 54.1827 42.6318 54.1589 42.5441C54.1391 42.4372 54.084 42.3399 54.0024 42.2681C53.6395 42.0431 53.2741 41.8761 52.8804 42.2194C52.8313 42.2614 52.7265 42.2384 52.6559 42.2384L52.7133 42.3189C52.6067 42.4381 52.504 42.5599 52.3934 42.672C52.0545 43.0124 51.7344 43.3775 51.3634 43.682C50.9274 44.0421 50.4338 44.3338 49.988 44.6807C49.1334 45.3441 48.2926 46.0279 47.4468 46.7028C47.2848 46.8323 47.1229 46.9618 46.9686 47.0799L45.9394 47.8588L45.7719 46.9159L45.8648 46.8514L46.3392 47.2108C46.5329 47.0751 46.6301 46.4787 46.4495 46.3387C46.3806 46.2836 46.2312 46.3189 46.1207 46.3274C46.0102 46.3359 45.8797 46.417 45.8052 46.3769C45.7306 46.3368 45.6981 46.1881 45.7109 46.082C45.7275 45.8373 45.6322 45.5571 45.8341 45.3321C45.8519 45.322 45.7852 45.2044 45.7391 45.1647C45.6654 45.1093 45.6101 45.0331 45.5803 44.9458C45.5506 44.8586 45.5478 44.7644 45.5724 44.6755C45.6219 44.3227 45.8311 43.957 45.5804 43.5979C45.5662 43.5729 45.5979 43.5126 45.6095 43.4708L45.597 43.4778ZM42.6369 31.977C42.6318 32.0552 42.7539 32.146 42.8011 32.2251C42.8483 32.3043 42.9305 32.4201 42.9049 32.4581C42.8734 32.4991 42.834 32.5333 42.7891 32.5588C42.7441 32.5843 42.6945 32.6005 42.6431 32.6065C42.5991 32.5984 42.5575 32.58 42.522 32.5526C42.4864 32.5253 42.4579 32.4899 42.4388 32.4494C42.3771 32.2709 42.3272 32.0885 42.2892 31.9035L41.8684 32.3774C41.7755 31.8441 41.6846 31.385 41.6183 30.9236C41.6023 30.872 41.5978 30.8176 41.6051 30.7641C41.6124 30.7106 41.6313 30.6594 41.6606 30.6141C41.6899 30.5687 41.7288 30.5304 41.7746 30.5017C41.8203 30.4731 41.8718 30.4548 41.9254 30.4482C42.0126 30.4318 42.1565 30.3784 42.1604 30.3315C42.1899 30.0182 42.3955 30.1982 42.5465 30.1573L42.7134 31.2817L42.6148 31.2906L42.4482 31.0673C42.212 31.1612 41.9662 31.23 42.0149 31.5483C42.0196 31.5857 42.1445 31.6067 42.2147 31.6351L42.333 31.2833C42.4303 31.3687 42.5076 31.4745 42.5594 31.5932C42.6112 31.7118 42.6363 31.8404 42.6328 31.9699L42.6369 31.977ZM42.4146 39.3634C42.291 39.2451 42.2071 39.1468 42.3197 38.9677C42.3536 38.9155 42.3113 38.8077 42.2897 38.7281C42.2682 38.6486 42.1746 38.5251 42.1957 38.4378C42.2423 38.3311 42.3088 38.2343 42.3917 38.1526C42.485 38.2049 42.5672 38.2751 42.6335 38.359C42.7649 38.6281 42.8579 38.9167 42.9875 39.1868C43.0208 39.2455 43.1413 39.2879 43.2238 39.2881C43.4508 39.2983 43.5086 39.4044 43.3945 39.5891C43.2804 39.7738 43.2038 39.9584 43.0627 40.0126C42.9493 40.0533 42.7564 39.8874 42.6061 39.8008L42.6648 39.6969C42.5901 39.5794 42.5065 39.4679 42.4146 39.3634ZM44.2384 34.785C44.3232 35.25 44.4389 35.728 43.9804 35.9903C43.8081 35.9356 43.6409 35.8658 43.4809 35.7817C43.3917 35.724 43.2766 35.5916 43.2888 35.5093C43.3416 35.2114 43.4101 34.9165 43.4939 34.6258L43.8963 34.9578L44.0852 35.0295L44.049 34.6335L44.1025 34.5867C44.1591 34.6443 44.2052 34.7114 44.2384 34.785ZM42.3179 36.827C42.3488 36.9272 42.3603 37.0595 42.432 37.1154C42.9071 37.4885 42.9155 37.5779 42.4491 38.0047L42.1775 37.6668L41.7956 38.0269L41.7488 37.9734L42.2413 36.5175C42.2738 36.6496 42.2905 36.7414 42.3189 36.8288L42.3179 36.827ZM41.0339 32.8482C41.109 33.0057 41.1671 33.1708 41.2072 33.3407C41.2081 33.4002 41.1941 33.459 41.1664 33.5116C41.1387 33.5643 41.0983 33.6093 41.0488 33.6423C40.9153 33.6603 40.7798 33.6292 40.6674 33.5549C40.6287 33.5322 40.6449 33.37 40.6706 33.2825C40.7209 33.1222 40.7994 32.9741 40.879 32.7784C40.6777 32.8384 40.5123 32.9369 40.4724 32.8913C40.2949 32.7401 40.0493 32.5851 40.2506 32.2427L40.3437 32.4983C40.7687 32.3679 40.8903 32.4331 41.0289 32.8393L41.0339 32.8482ZM43.3701 40.8079C43.327 40.8947 43.2631 40.9694 43.1841 41.0254C43.105 41.0814 43.0133 41.1169 42.9172 41.1287C42.821 41.1405 42.7234 41.1283 42.6332 41.0932C42.5429 41.058 42.4628 41.001 42.3999 40.9273C42.3678 40.8914 42.4016 40.7475 42.45 40.6918C42.4984 40.6361 42.6181 40.6106 42.6922 40.5545C43.0826 40.3049 43.0953 40.3024 43.5812 40.5493C43.5031 40.6282 43.4318 40.7135 43.3681 40.8043L43.3701 40.8079ZM41.3209 35.8697C41.3783 35.777 41.4619 35.7034 41.5611 35.6582C41.586 35.6441 41.7108 35.7687 41.7369 35.848C41.7934 36.0036 41.786 36.1752 41.7164 36.3253C41.6468 36.4755 41.5205 36.592 41.3653 36.6494C41.273 36.6735 41.0993 36.5248 41.0294 36.4139C41.0041 36.3694 41.1519 36.215 41.2287 36.1055L41.3183 36.1183C41.3128 36.0296 41.2819 35.9295 41.3189 35.8661L41.3209 35.8697ZM43.9141 34.2794C43.9034 34.3395 43.8523 34.432 43.8104 34.437C43.7685 34.4419 43.6277 34.4135 43.6012 34.3626C43.4366 34.0723 43.3069 33.7646 43.1326 33.3951C43.9001 33.5907 44.017 33.7221 43.913 34.2776L43.9141 34.2794ZM43.6255 36.6552C43.6771 36.586 43.7455 36.5311 43.8241 36.4956C43.9027 36.4601 43.9891 36.4451 44.0751 36.452C44.555 36.6342 44.113 36.9671 44.197 37.2772C43.8076 37.1756 43.5611 37.0024 43.6245 36.6534L43.6255 36.6552ZM40.8839 29.2878C40.9873 29.2528 41.0771 29.1862 41.1407 29.0975C41.2339 28.9872 41.3209 28.8719 41.4014 28.752L41.6689 29.0122L41.266 29.4595C41.0243 29.3612 40.8183 29.4545 40.7122 29.8111C40.4529 29.3745 40.4848 29.3188 40.8829 29.2861L40.8839 29.2878ZM41.4705 31.7794C41.3648 31.9499 41.2617 32.1001 41.0297 31.9234C40.6888 31.6625 40.9635 31.429 41.0365 31.1052L41.4705 31.7794ZM40.3344 35.4829C40.0818 35.0001 40.696 34.8755 40.7307 34.5216C40.9813 34.9844 40.7095 35.2397 40.3304 35.4758L40.3344 35.4829ZM41.6867 35.008C41.6869 34.7493 41.7222 34.4918 41.7916 34.2425C41.8034 34.1887 41.9287 34.1648 41.9999 34.1244C42.022 34.1966 42.0813 34.3136 42.0582 34.3267C41.7076 34.6008 42.0742 34.8448 41.9927 35.2158C41.8735 35.3375 41.712 35.2478 41.6867 35.008ZM41.5867 37.0981C41.2831 37.3926 41.2027 37.3464 41.1246 36.7976L41.5867 37.0981ZM44.2873 43.5214C44.3094 43.4689 44.412 43.4507 44.4743 43.4154L44.6972 43.9621L44.5798 44.0122C44.4586 43.8691 44.1657 43.8257 44.2945 43.5174L44.2873 43.5214ZM45.0893 42.4454L45.2412 42.5099L44.9361 43.2171L44.8461 43.1787C45.0109 42.9464 44.811 42.5938 45.1046 42.4391L45.0893 42.4454ZM40.9838 30.7468C40.9663 30.6238 40.9644 30.4992 40.9782 30.3757C41.0655 30.4134 41.1855 30.43 41.2292 30.4947C41.2729 30.5593 41.2616 30.6928 41.2855 30.8887C41.1164 30.8104 40.9944 30.7902 40.9838 30.7468ZM43.819 30.596C43.7276 30.6714 43.64 30.8034 43.545 30.8102C43.45 30.817 43.3408 30.6907 43.2442 30.6324L43.3359 30.4746L43.819 30.596ZM42.1088 29.4476C42.5411 29.3343 42.4363 29.6102 42.4109 29.8435C42.0306 29.8991 42.1015 29.6423 42.1037 29.4387L42.1088 29.4476ZM38.1805 28.7661C38.6055 28.7934 38.6573 28.8723 38.4632 29.2648L38.1805 28.7661ZM43.7507 42.4795L43.883 42.4845C43.9662 42.6562 44.0624 42.83 43.7288 43.0427L43.7507 42.4795Z" fill="#333F4F"></path>
      </svg>
      <p className="skinnyJeans">Actual fonts made by students</p>
    </div>
  )
}