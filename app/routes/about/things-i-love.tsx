import HorizontalCard from '@App/components/cards/things-i-love/horizontal-card'
import LazyImgix from '@App/components/images/lazyImgix'
import Layout from '@App/components/layoutTemplates/layout'
import { ImageSizeEnums } from '@App/enums/imageEnums'
import { staticImages } from '@App/lib/imgix/data'
import { cacheControl } from '@App/lib/remix/loaders'
import { fetchAPI } from '@App/utils/fetch.server'
import { getGraphQLString } from '@App/utils/graphqlUtils'
import { createImgixSizes, defaultImages, loadImageSrc } from '@App/utils/imageHelpers'
import { getStaticPageMeta } from '@App/utils/pageUtils'
import { getBasicPageMetaTags, mdxPageMeta } from '@App/utils/seo'
import { consoleHelper } from '@App/utils/windowUtils'
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import gql from 'graphql-tag'
import type { MutableRefObject } from 'react'

const page = getStaticPageMeta({
  title: 'Things I love',
  slug: 'about/things-i-love',
  desc: 'Wonder what Teela Cunningham loves, paints with, uses, enjoys, recommends and subscribes to? Here\'s the Holy Grail of all things Teela! From amazing tech, business resources to social media solutions, courses, products, even online printing services! It\'s the home of all things Every Tuesday and it\'s about time you bookmark it!'
})
// export let meta = mdxPageMeta

function mapThingsILoveData(data: ThingsILoveRawData[]) {
  return data.map((item) => {
    return {
      title: item.node.title,
      items: item.node.TIL_acfData.items
    }
  }).reverse()

}
export let loader: LoaderFunction = async ({ request, }) => {

  try {
    const data = await fetchAPI(getGraphQLString(queryThingsILove), {})

    return json({
      page,
      // thingsILove: mapThingsILoveData(data.thingsILove?.edges[0]),
      thingsILove: mapThingsILoveData(data.thingsILove?.edges),
    }, {
      headers: {
        // ...cacheControl
      }
    })
  } catch (e) {
    console.error('error Things I love page', e)
    return null
  }
};

export const scrollPageTo = (elementRef: MutableRefObject<null | HTMLElement>) => {
  if (elementRef.current) {
    // @ts-ignore
    animateScrollTo(elementRef.current, {
      // duration of the scroll per 1000px, default 500
      speed: 250,

      // minimum duration of the scroll
      minDuration: 250,

      // maximum duration of the scroll
      maxDuration: 500,

      // DOM element to scroll, default window
      // Pass a reference to a DOM object
      // Example: document.querySelector('#element-to-scroll'),
      element: window,

      // Additional offset value that gets added to the desiredOffset.  This is
      // useful when passing a DOM object as the desiredOffset and wanting to adjust
      // for an fixed nav or to add some padding.
      offset: -75,

      // should animated scroll be canceled on user scroll/keypress
      // if set to "false" user input will be disabled until animated scroll is complete
      // (when set to false, "passive" will be also set to "false" to prevent Chrome errors)
      cancelOnUserAction: true,

      // Set passive event Listeners to be true by default. Stops Chrome from complaining.
      passive: true,

      // Scroll horizontally rather than vertically (which is the default)
      // horizontal: true,

      // function that will be executed when the scroll animation is finished
      // onComplete: function() {});
    })
  }
}

//TODO: CREATE COMPONENTS
function ThingsILove() {
  const data = useLoaderData<TIL_LoaderData>()
  consoleHelper('data', data, '/routes/products/index.tsx');
  const authorImg = createImgixSizes({
    width: 800,
    height: 1367,
    alt: `Every Tuesday: Teelas profile picture`,
    src: staticImages.profiles.teela.vertical.src,
    mobileSize: 600,
  })
  const authorScribble = createImgixSizes({
    src: staticImages.scribbles.stroke_2.src,
    alt: `Every Tuesday: Teela's scribble`,
    width: 600,
    height: 628,
    mobileSize: 288,
  })
  const brushFan = createImgixSizes({
    width: staticImages.assets.brushes.fan.width,
    height: staticImages.assets.brushes.fan.height,
    alt: `Every Tuesday: Teela's Paint Brushes`,
    src: staticImages.assets.brushes.fan.src,
    mobileSize: 500,
  })
  const redTexture = createImgixSizes({
    staticImage: staticImages.textures.red.A,
    alt: `Every Tuesday: Teela's Paint Brushes`,
    mobileSize: 500,
  })
  const shortStrokes = createImgixSizes({
    staticImage: staticImages.scribbles.shortStrokes,
    alt: `Short Paint Strokes using Teela's custom Procreate Brush set - Gouache Lovers`,
    mobileSize: 500,
  })
  // Create string of category names to loop through
  const categories = data.thingsILove.map((thing) => {
    return thing.title
  })

  // Smooth Scroll to Categories
  const categoryItemClick = (category: string) => () => {
    const element = document.getElementById(category)
    element?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Layout >
      <div className='et-grid-basic grid-rows-[minmax(auto,30px)_auto_1fr] tablet:grid-rows-[minmax(auto,60px)_auto_auto_auto_auto]'>

        <div className='relative col-span-2 col-start-2 row-span-2 row-start-1 text-3xl mt-9 z-2 rotate-[-15deg] tablet:col-start-3 tablet:col-span-8 tablet:rotate-0 tablet:flex tablet:items-center laptop:text-6xl laptop:my-[160px]'>
          These are a few of my favorite things.
        </div>

        {/* AUTHOR IMG */}
        <div className='relative col-span-2 col-start-2 row-span-2 row-start-2 z-1 max-w-[191px] w-full ml-auto mr-0 h-[290px] tablet:col-start-8 tablet:col-span-6 tablet:max-w-none tablet:h-[400px] tablet:pr-[50px] laptop:h-full laptop:col-start-10 laptop:col-span-4 desktop:col-start-9 desktop:col-span-4 desktop:h-[469px] desktop:row-start-2 desktop:row-span-3 desktopXl:col-start-10 desktopXl:col-span-4 desktopXl:h-[500px] desktopXl:pr-[100px]'>
          <div className='relative w-full h-full overflow-hidden z-2'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] tablet:w-[300px] desktop:w-[350px]'>
              <LazyImgix
                id={'polaroidImg'}
                image={authorImg.image}
                visibleByDefault={true}
              // sizes={imgOptions ? imgOptions.sizes : ''}
              // srcSet={imgOptions ? imgOptions.srcSet : ''}
              />
            </div>
          </div>
          <div className='w-[200px] top-[210px] left-[40px] absolute z-1 tablet:left-[160px] tablet:top-[-30px] desktop:w-[300px]'>
            <LazyImgix
              id={`scribble`}
              visibleByDefault={true}
              image={authorScribble.image}
              sizes="(max-width: 666px) 30vw, (max-width: 1024px) 10vw, 535px"
              srcSet={
                `${authorScribble.defaultSrc}?auto=format&w=600&fit=clip 1024w,
              `
              }
            />

          </div>
        </div>

        <div className='hidden self-end bg-white col-span-full row-start-2 row-span-2 h-[28px] tablet:block desktop:row-start-3 desktop:row-span-2'></div>

        {/* CATEGORIES MENU */}
        <div className='mt-20 bg-white col-span-full et-grid-basic tablet:mt-0'>
          <div className='relative col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12 desktop:col-start-3 desktop:col-span-6 z-2'>

            <ul className='relative flex flex-row flex-wrap p-4 pb-8 pt-14 tablet:justify-evenly tablet:pt-6 desktop:pb-12 desktop:justify-between desktop:px-0 desktop:row-start-1'>

              <div className='absolute top-[-35px] left-0 text-5xl font-bonVivant -rotate-6 tablet:top-[-67px] desktop:-left-9'>
                Categories
              </div>

              {categories.map((category: string) => {
                return (
                  <li onClick={categoryItemClick(category.toLowerCase())} key={category} className="font-sentinel__SemiBoldItal text-lg flex-[1_0_50%] mb-4 tablet:flex-[0_1_auto] tablet:mb-0 hover:cursor-pointer hover:opacity-50 transition-opacity duration-200">
                    {category}
                  </li>
                )
              })}
            </ul>

          </div>

          <div className='hidden col-start-3 col-end-full row-start-1 w-full h-[1px] bg-grey-400 top-[64px] relative desktop:block z-1'></div>
        </div>

        {/* DISCLOSURE */}
        <div className='col-span-2 col-start-2 my-8 tablet:col-start-3 tablet:col-span-10 laptop:mt-16 laptop:col-start-3 laptop:col-span-6 desktop:col-start-3 desktop:col-span-5'>
          <p className='text-sm italic leading-7'>
            Quick Disclosure: Some of these links happen to be affiliate links which means when you click the link to purchase something on this page, it won't cost you more but I may receive a commission for sharing this with you. Which is great, because I was going to share it with you anyway!
          </p>
          <div className='max-w-[275px] mt-6 relative left-[-40px]'>
            <LazyImgix
              id={`shortStrokes`}
              image={shortStrokes.image}
            />
          </div>
        </div>

        {/* DISCLOSURE BRUSH IMG */}
        <div className='relative z-2 hidden laptop:block laptop:col-start-9 laptop:col-span-5 laptop:h-[333px] max-w-[350px]'>
          <div className='absolute z-2 w-full laptop:w-[300px] top-[60px] left-0 rotate-[-20deg] desktop:w-[330px]'>
            <LazyImgix
              id={'brushFan'}
              image={brushFan.image}
            />

          </div>
          <div className='absolute top-[30px] left-[-60px] w-[700px] z-1'>
            <LazyImgix
              id={'redTexture'}
              image={redTexture.image}
            />
          </div>
        </div>

        {/* THINGS I LOVE */}
        <div className='col-span-full et-grid-basic'>
          {data.thingsILove.map((category: ThingsIloveCategory, index: number) => {
            return (
              <div id={category.title.toLowerCase()} key={index} className='relative col-span-2 col-start-2 mb-16 tablet:col-start-3 tablet:col-span-10 desktop:col-start-2 desktop:col-span-12'>

                <div className='relative mb-16 category-title tablet:mb-24 laptop:mb-32 desktop:mb-40'>
                  <h2 className='relative text-5xl z-2 font-bonVivant -rotate-6 desktop:text-6xl'>{category.title} </h2>
                  <span className='bg-grey-300 z-1 w-full h-[1px] absolute bottom-0 left-0 tablet:bottom-[-24px] laptop:bottom-[-34px] desktop:bottom-[-64px]' />
                </div>

                <div className='grid grid-cols-1 tablet:gap-10 desktop:grid-cols-2 desktop:gap-12'>
                  {category.items?.map((item: ThingIlove, index: number) => {

                    const image = loadImageSrc({
                      imageSizeName: ImageSizeEnums.BLOCK_MEDIUM, // image name to try and get
                      imageObject: item.image, // the featured image object
                      fallbackSize: ImageSizeEnums.SOURCE, // fallback size to use if the image name doesn't exist
                      fallbackImage: defaultImages.thumbnail,
                      disableSrcSet: true, // disable the srcset attribute
                    })

                    return (
                      <HorizontalCard
                        image={image}
                        index={index}
                        key={index}
                        item={item}
                      />
                    )
                  })}
                </div>


              </div>
            )
          })}
        </div>

      </div>
    </Layout>
  )
}

export default ThingsILove

const queryThingsILove = gql`
  query ThingsILove {
    thingsILove {
      edges {
        node {
          title
          TIL_acfData {
            items {
              name
              description
              link
              image {
                mediaDetails {
                  width
                  height
                  sizes {
                    width
                    file
                    height
                    name
                    sourceUrl
                    mimeType
                  }
                }
                altText
                caption
                sourceUrl
                srcSet
                sizes
                id
              }
            }
          }
        }
      }
    }
  }
`