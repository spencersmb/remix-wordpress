import LazyImgix from '@App/components/images/lazyImgix'
import LfmArrowSvg from '@App/components/svgs/lfmArrowSvg'
import React from 'react'

interface Props {
  fontLoadingState: string
}

// TODO: TEST THIS
function MiniCourse40k(props: Props) {
  const { fontLoadingState } = props

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

  return (
    <div className="et-grid-basic lfm-myFonts col-span-full">
      <div className="lfm-myFonts__fontsBg bg-lfm-pink-200 row-span-2 row-start-1 col-start-1 col-span-2 relative z-[1] tablet:col-start-1 tablet:col-span-9 laptop:col-start-1 laptop:col-span-6 desktop:col-start-1 desktop:col-span-6" />

      {/* FONT IMAGES */}
      <div className="lfm-myFonts__fontsContent w-full col-span-full row-start-2 row-span-1 relative z-[2] max-w-[375px] mx-auto tablet:max-w-[525px] tablet:col-start-3 tablet:col-span-10 tablet:mx-[30px] laptop:max-w-[501px] laptop:col-start-1 laptop:col-span-8 desktop:m-0 desktop:col-start-3 desktop:col-span-8">
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
        {fontLoadingState === 'completed' && <div className="lfm-myFonts__quote absolute left-[15px] bottom-[-60px] rotate-[-15deg] tablet:bottom-auto tablet:top-[210px] tablet:left-auto tablet:right-[-30px]">
          <LfmArrowSvg
            className="w-[62px] rotate-[250deg] tablet:absolute tablet:bottom-[-50px] tablet:left-[-50px] tablet:rotate-[320deg] tablet:scale-[-1]"
          />
          <p className="text-lg text-lfm-blue-700 skinnyJeans">My Fonts</p>
        </div>}

      </div>

      <div className="lfm-myFonts__content row-start-3 col-start-2 col-span-2 mt-20 mx-0 mb-[30px] flex flex-col tablet:col-start-4 tablet:col-span-8 tablet:mb-6 tablet:mt-16 laptop:col-start-9 laptop:col-span-5 laptop:row-start-1 laptop:row-span-2 desktop:col-start-8 desktop:col-span-5">
        <h2 className="mt-5 mb-3 text-3xl font-sentinel__SemiBoldItal text-lfm-pink-400 laptop:text-4xl">
          In my first year creating and selling hand lettered fonts, I made $40,000
        </h2>
        <span className="mb-8 font-sentinel__SemiBoldItal text-lfm-blue-700 laptop:text-lg">(that’s not a typo!)</span>
        <p className="text-lg">
          This is passive income at its finest. When you sell a digital product (like a font) online, you get paid and the buyer
          downloads it instantly. End of story. No restocking supplies, packing orders or trips to the post office. Make a font once, sell it forever.
        </p>
      </div>

    </div>
  )
}

export default MiniCourse40k
