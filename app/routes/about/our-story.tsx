import LazyImgix from "@App/components/images/lazyImgix";
import PolaroidImg from "@App/components/images/polaroidImg";
import ImageTextHeader1 from "@App/components/layout/imageTextHeader1";
import StaggerImages1 from "@App/components/layout/staggerImages1";
import Layout from "@App/components/layoutTemplates/layout";
import useSite from "@App/hooks/useSite";
import { breakpointConvertPX } from "@App/utils/appUtils";
import { getBasicPageMetaTags } from "@App/utils/seo";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useEffect } from "react";

const description = `Every-Tuesday is an education resource for ambitious graphic designers and hand letterers.`;
const title = 'About Every Tuesday'
const pageInfo = {
  title,
  slug: 'about',
  description,
  seo: {
    title,
    opengraphModifiedTime: '',
    metaDesc: description
  }
}

export let meta: MetaFunction = (metaData): any => {

  /*
  metaData gets passed in from the root metadata function
   */
  const { data, location, parentsData } = metaData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  /*
  Build Metadata tags for the page
   */
  return getBasicPageMetaTags(metaData, {
    title,
    desc: description,
    slug: pageInfo.slug
  })
};

export let loader: LoaderFunction = async ({ request }) => {
  return json({ page: pageInfo }, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate" } })
};

export default function About() {
  const { state: { breakpoint } } = useSite()

  useEffect(() => {
    function getTop(): number {
      if (breakpoint === 'tablet') {
        return 500
      } else if (breakpoint === 'laptop') {
        return 500
      } else if (breakpoint === 'desktop') {
        return 500
      } else {
        return 800
      }
    }
    const top = getTop()
    window.scrollTo({
      top,
    })
  }, [breakpoint])

  const headerImage = {
    src: 'https://et-website.imgix.net/et-website/images/teela-spencer-house-1.jpg',
    placeholder: 'https://et-website.imgix.net/et-website/images/teela-spencer-house-1.jpg?w=20&fit=clip',
    width: 806,
    height: 910,
    alt: 'Teela Spencer House',
  }
  const wideImageLarge = {
    src: 'https://et-website.imgix.net/et-website/images/about-bg-wide.jpg',
    placeholder: 'https://et-website.imgix.net/et-website/images/about-bg-wide.jpg?w=20&fit=clip',
    width: 2234,
    height: 822,
    alt: 'Teela Spencer House',
  }
  const wideImageMobile = {
    src: 'https://et-website.imgix.net/et-website/images/about-bg-wide.jpg?w=768&fit=clip',
    placeholder: 'https://et-website.imgix.net/et-website/images/about-bg-wide.jpg?w=20&fit=clip',
    width: 768,
    height: 283,
    alt: 'Teela Spencer House',
  }
  const babyImage = {
    src: 'https://et-website.imgix.net/et-website/images/baby-photo-1.jpg',
    placeholder: 'https://et-website.imgix.net/et-website/images/baby-photo-1.jpg?w=20&fit=clip',
    width: 1274,
    height: 898,
    alt: 'Tuesday\'s birthday photos',
  }
  return (
    <Layout bgColor="bg-cream-100">
      <ImageTextHeader1 imgixImage={headerImage} />
      <StaggerImages1 />

      <div className="et-grid-basic">

        {/* TITLE */}
        <h4 className="flex flex-col col-span-2 col-start-2 mb-8 text-4xl text-gray-700 font-sentinel__SemiBoldItal tablet:col-start-3 tablet:col-span-10 tablet:text-5xl tablet:text-center laptop:mb-16 desktopXl:text-left laptop:text-6xl desktop:text-7xl desktopXl:text-8xl desktopXl:col-start-2 desktopXl:col-span-12">
          <span className="block desktop:ml-16">
            Motivating others to create
          </span>
          <span className="block laptop:ml-20 desktopXl:ml-60">
            something new every week
          </span>
        </h4>

        {/* IMAGE */}
        <div className="mb-8 col-span-full laptop:col-start-3 laptop:col-span-10 laptop:mb-16">

          {breakpointConvertPX(breakpoint) >= 1024 &&
            <LazyImgix
              id={'about-desk'}
              image={wideImageLarge}
            />
          }

          {breakpointConvertPX(breakpoint) < 1024 &&
            <LazyImgix
              id={'about-desk'}
              image={wideImageMobile}
            />
          }
        </div>

        <div className="col-span-2 col-start-2 mb-8 tablet:col-start-3 tablet:col-span-10 laptop:col-start-4 laptop:col-span-8 desktop:col-start-4 desktop:col-span-8 desktop:mx-16 laptop:mb-16">

          <h5 className="mb-4 text-2xl text-primary-400 font-sentinel__SemiBoldItal desktop:text-3xl">
            About Every Tuesday
          </h5>

          <p className="mb-4 text-lg">
            My name is Teela, I’m the second oldest of 4 and I grew up on 30 acres in Upstate NY. The harsh winters got the most of me, so after I completed my associates degree in Graphic Design, I transferred to (much warmer) SCAD in Savannah, GA. I completed my Bachelor of Fine Arts degree in Graphic Design in 2008.
          </p>

          <p className="text-lg">
            Over the next 6 years, I worked as a designer at a startup children’s gaming company, a boutique home furnishings business and a design studio in Atlanta, GA. While at the studio, I had the pleasure of working on many large projects with Coca-Cola, Visa, the winter and summer Olympic Games and many wonderful small businesses.
          </p>
        </div>

        {/* IMG COLLECTION 3 */}
        <div className="flex flex-col mb-8 col-span-full tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 laptop:mb-16 tablet:flex-row tablet:justify-center">
          <div className="flex-1 mx-auto w-full max-w-[210px] tablet:mr-2 tablet:max-w-[300px] laptop:max-w-[257px] desktop:max-w-[410px] laptop:mr-8">
            <PolaroidImg imgixImage={headerImage} rotate='left' />
          </div>
          <div className="flex-1 mx-auto w-full max-w-[210px] tablet:ml-5 tablet:max-w-[300px] laptop:max-w-[257px] desktop:max-w-[410px]">
            <PolaroidImg imgixImage={headerImage} rotate='right' />
          </div>
        </div>

        {/* TEXT */}
        <div className="col-span-2 col-start-2 mb-8 tablet:col-start-3 tablet:col-span-10 laptop:col-start-4 laptop:col-span-8 desktop:col-start-4 desktop:col-span-8 desktop:mx-16 laptop:mb-16">

          <p className="mb-4 text-lg">
            Over time, I learned I had a knack for explaining complex tasks within the design programs to my studio coworkers. I thought others would benefit from these tips too, so I started a youtube channel in January of 2014. The kind responses were overwhelming, so I switched to more frequent tutorials soon afterwards. From there, I began teaching online courses.
          </p>

          <p className="text-lg">
            I met my husband, Spencer, at the studio and we married in the fall of 2014. Spence is originally from Colorado and completed his design education at The Portfolio Center in Atlanta, GA. As a designer, he’s worked on large projects for Coca-Cola, Powerade, FIFA, Visa, and the Olympic Games. He is a self taught web developer and the driving force behind the web design and development of Every-Tuesday. In 2015, we decided to pursue E-T together full time and haven’t let up since!
          </p>
        </div>

        {/* IMG COLLECTION 4 BABY PHOTOS */}
        <div className="flex flex-col mb-8 col-span-full tablet:col-start-2 tablet:col-span-12 laptop:col-start-3 laptop:col-span-10 laptop:mb-16 tablet:flex-row tablet:justify-center">
          <div className="flex-1 mx-10 tablet:mr-2 laptop:flex-[2] laptop:max-w-[644px] laptop:mr-8 rotate-[-4deg] mb-8 tablet:mb-0 flex items-center">
            <LazyImgix id={"baby-1"} image={babyImage} />
          </div>
          <div className="flex-1 w-full mx-auto max-w-[210px] tablet:max-w-[250px] tablet:ml-5 laptop:max-w-[410px]">
            <PolaroidImg imgixImage={headerImage} rotate='right' />
          </div>
        </div>

        {/* TEXT */}
        <div className="col-span-2 col-start-2 mb-8 tablet:col-start-3 tablet:col-span-10 laptop:col-start-4 laptop:col-span-8 desktop:col-start-4 desktop:col-span-8 desktop:mx-16 laptop:mb-16">

          <p className="mb-4 text-lg">
            In December 2018, we welcomed the newest member to our family: our daughter, Tuesday. She’s joined by her big sister + protective pooch, Nuna Petunia, who has been with me since March of 2009.
          </p>

        </div>

      </div>
    </Layout>
  )
}