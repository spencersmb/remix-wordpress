import LazyImageBase from '@App/components/images/lazyImage-base'
import LazyImgix from '@App/components/images/lazyImgix'
import AccentHeaderText from '@App/components/layout/accentHeaderText'
import Layout from '@App/components/layoutTemplates/layout'
import LfmMiniCourseNavMobile from '@App/components/lfm/mini-course/nav/miniCourseNav'
import { ImageSizeEnums } from '@App/enums/imageEnums'
import { staticImages } from '@App/lib/imgix/data'
import { cacheControl } from '@App/lib/remix/loaders'
import { fetchAPI } from '@App/utils/fetch.server'
import { getGraphQLString } from '@App/utils/graphqlUtils'
import { createImgixSizes, defaultImages, loadImageSrc } from '@App/utils/imageHelpers'
import { getBasicPageMetaTags } from '@App/utils/seo'
import { consoleHelper } from '@App/utils/windowUtils'
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import gql from 'graphql-tag'
import type { MutableRefObject } from 'react'
// import animateScrollTo from 'animated-scroll-to';

const description = 'Wonder what Teela Cunningham loves, paints with, uses, enjoys, recommends and subscribes to? Here\'s the Holy Grail of all things Teela! From amazing tech, business resources to social media solutions, courses, products, even online printing services! It\'s the home of all things Every Tuesday and it\'s about time you bookmark it!'
const page = {
  title: 'Things I love',
  slug: 'about/things-i-love',
  description,
  seo: {
    title: 'Things I love',
    opengraphModifiedTime: '',
    metaDesc: description
  }
}

export let meta: MetaFunction = (metaData): any => (getBasicPageMetaTags(metaData, {
  title: page.title,
  desc: page.description,
  slug: page.slug,
}))
interface ThingIlove {
  name: string
  description: string
  link: string
  image: IFeaturedImage
}
interface ThingsIloveCategory {
  title: string
  items: ThingIlove[] | null
}
interface ThingsILoveRawData {
  node: {
    title: string
    TIL_acfData: {
      items: ThingIlove[]
    }
  }
}
function mapThingsILoveData(data: ThingsILoveRawData[]) {
  return data.map((item) => {
    return {
      title: item.node.title,
      items: item.node.TIL_acfData.items
    }
  })

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
        ...cacheControl
      }
    })
  } catch (e) {
    console.error('error Things I love page', e)
    return null
  }
};

interface LoaderData {
  thingsILove: ThingsIloveCategory[]
}


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
function ThingsILove() {
  const data = useLoaderData<LoaderData>()
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
    width: 288,
    height: 310,
    mobileSize: 288,
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
    <Layout bgColor='bg-cream-100'>
      <div className='et-grid-basic grid-rows-[minmax(auto,30px)_auto_1fr]'>

        <div className='relative col-span-2 col-start-2 row-span-2 row-start-1 text-3xl mt-9 z-2 rotate-[-15deg]'>
          These are a few of my favorite things.
        </div>

        {/* AUTHOR IMG */}
        <div className='relative col-span-2 col-start-2 row-span-2 row-start-2 z-1 max-w-[191px] ml-auto mr-0 w-full'>
          <div className='relative z-2'>
            <LazyImgix
              id={'polaroidImg'}
              image={authorImg.image}
            // sizes={imgOptions ? imgOptions.sizes : ''}
            // srcSet={imgOptions ? imgOptions.srcSet : ''}
            />
          </div>
          <div className='w-[200px] top-[210px] left-[40px] absolute z-1'>
            <LazyImgix
              id={`scribble`}
              image={authorScribble.image}
            />
          </div>
        </div>

        {/* CATEGORIES */}
        <div className='mt-20 bg-white col-span-full et-grid-basic'>
          <div className='col-span-2 col-start-2'>
            <ul className='relative flex flex-row flex-wrap p-4 pb-8 pt-14'>
              <div className='absolute top-[-35px] left-0 text-5xl font-bonVivant -rotate-6'>
                Categories
              </div>
              {categories.map((category: string) => {
                return (
                  <li onClick={categoryItemClick(category.toLowerCase())} key={category} className="font-sentinel__SemiBoldItal text-lg flex-[1_0_50%] mb-4">
                    {category}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* DISCLOSURE */}
        <div className='col-span-2 col-start-2 my-8'>
          <p className='text-sm italic leading-7'>
            Quick Disclosure: Some of these links happen to be affiliate links which means when you click the link to purchase something on this page, it won't cost you more but I may receive a commission for sharing this with you. Which is great, because I was going to share it with you anyway!
          </p>
        </div>

        {/* THINGS I LOVE */}
        {data.thingsILove.map((category: ThingsIloveCategory, index: number) => {
          return (
            <div id={category.title.toLowerCase()} key={index} className='relative col-span-2 col-start-2 mb-16'>

              <div className='relative mb-16'>
                <h2 className='relative text-5xl z-2 font-bonVivant -rotate-6'>{category.title} </h2>
                <span className='bg-grey-300 z-1 w-full h-[1px] absolute bottom-0 left-0' />
              </div>

              <div className='grid grid-cols-1'>
                {category.items?.map((item: ThingIlove, index: number) => {

                  const image = loadImageSrc({
                    imageSizeName: ImageSizeEnums.MEDIUM, // image name to try and get
                    imageObject: item.image, // the featured image object
                    fallbackSize: ImageSizeEnums.WPRP, // fallback size to use if the image name doesn't exist
                    fallbackImage: defaultImages.thumbnail
                  })

                  return (
                    <div key={index} className="mb-16">
                      <div>
                        <LazyImageBase image={image} id={`${index}-image`} />
                      </div>

                      <div className='relative flex flex-row my-4'>
                        <span className='absolute left-0 top-[-27px] text-6xl font-bonVivant'>{`0${index + 1}`}</span>
                        <span className='text-3xl ml-11 font-sentinel__SemiBoldItal'>{item.name}</span>
                      </div>

                      <p className='mb-8'>
                        {item.description}
                      </p>

                      <a href={item.link} rel='noreferrer' target={'_blank'} className='btn btn-outline bg-cream-100'>
                        View Product
                      </a>
                    </div>
                  )
                })}
              </div>


            </div>
          )
        })}

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