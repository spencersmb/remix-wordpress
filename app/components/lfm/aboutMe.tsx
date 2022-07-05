import LazyImgix from '../images/lazyImgix'

interface Props { }

// TODO: Test this
function AboutMe(props: Props) {
  const authorImage = {
    src: 'https://et-website.imgix.net/et-website/images/teela-profile.jpeg?w=450&fit=clip',
    alt: "Learn Font Making: Your Instructor Teela Cunninghamo",
    width: 390,
    height: 497,
    placeholder: 'https://et-website.imgix.net/et-website/images/teela-profile.jpeg?w=20&fit=clip',
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
    <div className="pb-10 tablet:py-20">
      <div className="et-grid-basic gap-y-0 grid-rows-[auto_auto_auto_1fr] tablet:gap-x-8">

        {/* PROFILE IMAGE */}
        <div className="relative row-start-2 lfm-about-me__profile profile col-span-full tablet:col-start-2 tablet:col-span-6 tablet:row-start-2 tablet:row-span-4 tablet:self-center laptop:col-start-2 laptop:col-span-5 laptop:row-start-1 desktopXl:col-start-3">

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
        <div className="lfm-about-me__subhead z-2 relative w-full mx-auto max-w-[400px] row-start-1 col-span-full top-[15px] tablet:col-start-8 tablet:col-span-6 tablet:top-0 laptop:col-start-7 laptop:col-span-7 laptop:mx-7 laptop:mt-5 laptop:mb-4 desktop:mt-9 desktop:mx-12 desktop:mb-4 desktopXl:col-start-8">
          <p className="relative ml-5 text-4xl font-sentinel__SemiBoldItal text-lfm-blue-700 z-1 tablet:text-base tablet:ml-0 laptop:text-lg">
            Your Instructor
          </p>
        </div>

        {/* lfm-about-me__hello */}
        <div className="relative col-span-2 col-start-2 row-start-3 mt-4 lfm-about-me__hello z-2 tablet:row-start-3 tablet:col-start-5 tablet:col-span-8 laptop:mb-8 desktop:ml-14 desktopXl:col-start-6">
          <p className="text-5xl text-lfm-blue-700 font-sentinel__SemiBoldItal tablet:text-[65px] laptop:text-[80px] laptop:col-start-5 laptop:col-span-9 laptop:ml-7">
            Hey, I'm Teela
          </p>
        </div>

        {/* lfm-about-me__desc */}
        <div className="relative col-span-2 col-start-2 row-start-4 lfm-about-me__desc z-2 tablet:col-start-8 tablet:col-span-6 laptop:col-start-7 laptop:col-span-7 laptop:ml-7 desktop:mx-12 desktopXl:col-start-8 desktopXl:col-span-5">
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
  )
}

export default AboutMe
