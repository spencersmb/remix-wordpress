import { requireResourceLibraryUser } from '../../utils/resourceLibrarySession.server'
import { mdxPageMetaV2 } from '../../utils/seo'
import { fetchAPIBatch } from '../../utils/fetch.server'
import { GetFirstFreebiesQuery, GetFreebiesQuery } from '../../lib/graphql/queries/resourceLibrary'
import { flattenResourceData } from '../../utils/resourceLibraryUtils'
import FreebieFilter from '../../components/resourceLibrary/freebieFilter'
import { useMakersLibraryAsync } from '../../hooks/useFreebies'
import { getGraphQLString } from '../../utils/graphqlUtils'
import type { ISelectedMatch } from '@App/interfaces/remix'
import FreebieGrid from '@App/components/resourceLibrary/freebieGrid'
import OutlinedButton from '@App/components/buttons/outlinedButton'
import ExtendedLicenseUpsell from '@App/components/resourceLibrary/extendedLicenseUpsell'
import CardDownload from '@App/components/cards/cardDownload'
import type { LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node'
import { useLoaderData, useMatches } from '@remix-run/react'
import useTuesdayMakersClientSideLogin from '@App/hooks/useTuesdayMakersClientSideLogin'
import AccentHeaderText from '@App/components/layout/accentHeaderText'
import LazyImgix from '@App/components/images/lazyImgix'
import { isArray } from 'lodash'
import { consoleHelper } from '@App/utils/windowUtils'
import CircleSpinner from '@App/components/spinners/circleSpinner'
import { createImgixSizes } from '@App/utils/imageHelpers'
import { spinnerColors } from '@App/components/spinners/spinnerColors'
import { getStaticPageMeta } from '@App/utils/pageUtils'


const page = getStaticPageMeta({
  title: `Tuesday Makers: Members`,
  desc: `First to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!`,
  slug: `tuesday-makers/members`,
})
export let meta = mdxPageMetaV2

export let loader: LoaderFunction = async ({ request, context, params }) => {
  // get user, if no user redirect to login
  const user = await requireResourceLibraryUser(request, '/tuesday-makers/login')

  const userId = user.id
  /**
   * Get latest tags
   * Don't want to cache them so we can show and hide other data on page dynamically
   */
  let tagResults
  try {
    const urlTags = `https://api.convertkit.com/v3/subscribers/${userId}/tags?api_secret=${process.env.CK_SECRET}`;

    const resTag = await fetch(urlTags, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    tagResults = await resTag.json()
  } catch (e) {
    console.error(`e in /tuesday-makers/members tags request`)
    return redirect('/tuesday-makers/login')
  }

  const newUser = {
    id: userId,
    tags: tagResults?.tags.map((tag: { id: string, name: string, created_at: string }) => tag.name)
  }
  const defaultCategory = {
    name: 'Procreate Brushes',
    slug: 'procreate-brushes'
  }

  let variables: {
    first: number;
    after: string | null;
    catName?: string;
  } = {
    first: 12,
    after: null,
    catName: defaultCategory.name
  }

  try {
    // GRAPHQL BULK QUERY EXAMPLE, GRPAHQL BATCHING, GRAPHQL 2 QUERIES
    // MULTIPLE GRAPHQL QUERIES IN ONE REQUEST
    let data = await fetchAPIBatch([
      {
        query: getGraphQLString(GetFreebiesQuery),
        variables,
        operationname: 'QueryNextFreebies'
      },
      {
        query: getGraphQLString(GetFirstFreebiesQuery),
        operationname: 'GetFirstFreebie'
      }
    ])

    const featuredFreebie = flattenResourceData(data[1].data.resourceLibraries)

    return json({
      page,
      // filterTags: data.cptTags,
      freebies: flattenResourceData(data[0].data.resourceLibraries),
      pageInfo: {
        ...data[0].data.resourceLibraries.pageInfo,
        page: 1
      },
      selectedCategory: defaultCategory,
      featuredFreebie: isArray(featuredFreebie) && featuredFreebie.length > 0
        ? featuredFreebie[0]
        : null,
      user: {
        ...user,
        tags: newUser.tags
      },
    })
  } catch (e) {
    console.error(`e in /tuesday-makers/members`, e)
    return redirect('/tuesday-makers/login')
  }
}

interface ILoaderData {
  freebies: IResourceItem[]
  featuredFreebie: IResourceItem | null
  pageInfo: {
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
    page: number
  }
  selectedCategory: {
    name: string
    slug: string
  }
  // filterTags: IFilterTag[],
  user: IResourceUser,
}

function useCartMatches() {
  const matches = useMatches()
  let selectedMatch: undefined | ISelectedMatch = matches.find(match => match.data?.cart)
  return {
    cart: selectedMatch?.data.cart
  }

}

const filterTags = [
  {
    name: 'All',
    slug: 'all',
  },
  {
    name: 'Procreate Brushes',
    slug: "procreate-brushes",
  },
  {
    name: 'Color Palettes',
    slug: "color-palette",
  },
  {
    name: 'Procreate',
    slug: "procreate",
  },
  {
    name: 'Fonts',
    slug: "fonts-2", // not sure about that tag name
  },
  {
    name: 'Patterns',
    slug: "patterns",
  },
  {
    name: 'Psd\'s',
    slug: "psds",
  },
  {
    name: 'Style Studies',
    slug: "style-studies",
  },
  {
    name: 'Textures',
    slug: "textures",
  },

]

// Order of brushes
const ordered = ['lettering-brushes', 'stamp-brushes', 'pattern-brushes', 'scatter-brushes'];

function shuffleResourcePosts(posts: IResourceItem[]): IResourceItem[] | [] {
  // First step organize the posts by category
  // Second step organize the posts by subcategory
  let brushes: IResourceItem[] = []
  let palettes: IResourceItem[] = []
  let styleStudie: IResourceItem[] = []
  let misc: IResourceItem[] = []

  // reorder each item into its own array
  posts.forEach(post => {
    let match = false
    post.categories.forEach(cat => {
      if (cat.slug === 'procreate-brushes') {
        match = true
        brushes.push(post)
      }
      if (cat.slug === 'color-palette') {
        match = true
        palettes.push(post)
      }
      if (cat.slug === 'style-studies') {
        match = true
        styleStudie.push(post)
      }

    })
    if (!match) {
      misc.push(post)
    }

  })

  reshuffleBrushes(brushes)

  return [
    ...brushes,
    ...palettes,
    ...styleStudie,
    ...misc
  ]
}

// Find the index of the subcategory and then sort them based on the value of the index
//         0                    1                 2                  3
//[ 'lettering-brushes', 'stamp-brushes', 'pattern-brushes', 'scatter-brushes'];
// Lettering Brushes should appear first, scatter brushes last
function reshuffleBrushes(posts: IResourceItem[]) {
  const sorter = (a: IResourceItem, b: IResourceItem) => {
    const aSubCat = a.subCategories[0]?.slug || 'test'
    const bSubCat = b.subCategories[0]?.slug || 'test'

    if (ordered.indexOf(aSubCat) === -1) {
      return 99
    }
    if (ordered.indexOf(bSubCat) === -1) {
      return 98
    }

    return ordered.indexOf(aSubCat) - ordered.indexOf(bSubCat)
  };
  return posts.sort(sorter);
}

const ResourceLibraryMembers = () => {
  const data = useLoaderData<ILoaderData>()

  // const { cart } = useCartMatches()
  // console.log('match', cart);
  // const { cart, addItemToCart } = useCart()
  // console.log('cart', cart);
  // console.log('data', data);


  /*
  * Check for user when coming directly from the login page to make sure the user is passed to the global context.
  * Right now user comes from the server side on page refreush and is set in the State, but when you come from a route, it isn't set because the redirect after a form submission happens on the server before the client takes over again. So we must pass the data down to an action manually.
  */
  useTuesdayMakersClientSideLogin(data.user, 200)

  const reshuffledPosts = shuffleResourcePosts(data.freebies)
  // const { filter, handleFilterClick, handlePageClick, posts, pagination, setFilter } = useFreebies<IResourceItem[]>({ items: reshuffledPosts, itemsPerPage: 12 })

  const { state, selectedFilter, handleFetchMorePosts, handleFilterClick, setFilter } = useMakersLibraryAsync({
    selectedFilter: data.selectedCategory,
    itemsPerPage: 12,
    initialData: {
      freebies: data.freebies,
      pageInfo: {
        ...data.pageInfo
      }
    }
  })
  consoleHelper(`MakersLibrary State`, {
    state
  }, 'members.tsx', { bg: '#ffd321', text: '#000' })

  const featuredDownload = data.featuredFreebie
    ? data.featuredFreebie
    : reshuffledPosts[0]

  const paintStreakBg = createImgixSizes({
    width: 2000,
    height: 2921,
    mobileSize: 900,
    alt: `Every Tuesday Watercolor textures`,
    src: 'https://et-website.imgix.net/et-website/images/tm-bg-1_1.jpg',
  })

  return (
    <div className='pt-[var(--nav-top-sm)] laptop:pt-[var(--nav-top-lg)] bg-cream-100'>
      <div className='py-16 grid-container grid-resource-header laptop:pb-16 laptop:pt-0'>

        {/* HEADER */}
        <div className='relative z-2 mb-8 col-start-2 col-span-2 tablet:row-start-1 tablet:col-start-4 tablet:col-end-[12] tablet:mb-8 laptop:col-start-2 laptop:col-end-8 laptop:ml-[25px] laptop:mb-0 desktop:ml-[55px] desktop:mr-[35px] desktop:col-start-2 desktop:col-end-[8] laptop:justify-center flex flex-col'>

          {/* TITLE */}
          <div className='mt-16 mb-8 tablet:mt-28 laptop:mt-0 laptop:mb-16'>
            <h1 style={{ color: '#404764' }} className='relative text-5xl text-center font-sentinel__SemiBoldItal laptop:text-left laptop:text-[56px] desktop:text-[67px] desktopXl:text-[80px]'>
              <span className='relative z-10'>
                <AccentHeaderText text='Welcome to the' />
                Resource Library
              </span>
            </h1>
          </div>

          {/* DESCRIPTION */}
          <div className='relative flex flex-col tablet:flex-row z-2'>

            {/* REQ 1 */}
            <div className='flex-1 mb-8 tablet:mr-4 laptop:mb-0'>
              <h2 className='mb-2 text-lg font-semibold text-blue-slate'>Freebies</h2>
              <p className='text-blue-slate'>All downloads come with a freebie license that you can use on any type of project.</p>
            </div>

            {/* REQ 2 */}
            <div className='flex-1 laptop:ml-4'>
              <h2 className='mb-2 text-lg font-semibold text-blue-slate'>Commerical Usage</h2>
              <p className='text-blue-slate'>A few freeibes are just for personal use and will require an extended license purchase if used commericially.</p>
            </div>
          </div>

          {/* BACKGROUND IMAGE */}
          <div className='absolute top-[-560px] left-[-114px] w-[450px] z-1 rotate-[-5deg] tablet:top-[-650px] tablet:left-[-90px] tablet:w-[540px] tablet:rotate-[-5deg] laptop:w-[770px] laptop:left-[418px] laptop:top-[-600px] laptop:rotate-45 desktop:w-[1020px] desktop:left-[558px] desktop:top-[-770px]'>
            <LazyImgix
              visibleByDefault={true}
              id={"download-bg"}
              image={paintStreakBg.image}
              sizes="(max-width: 400px) 150px, 300px, (min-width: 900px) 33vw, 900px"
              srcSet={
                `${paintStreakBg.image.src} 400w,
                ${paintStreakBg.defaultSrc}&w=1400&fit=clip 900w,
              `
              }
            />
          </div>

        </div>

        {/* DOWNLOAD CARD */}
        <div className='z-3 mb-16 relative col-start-2 col-span-2 row-start-2 tablet:flex tablet:col-start-3 tablet:col-end-[13]  laptop:row-start-1 laptop:col-start-8 laptop:col-end-[14] laptop:mx-[40px] laptop:mt-20 laptop:mb-24 desktop:col-start-8 desktop:col-end-[14] desktop:mb-24 desktop:mt-28 desktop:mx-0 flex-col'>

          <div className='relative z-2'>
            <CardDownload
              title={featuredDownload.title}
              buttonText='Download'
              freebie={featuredDownload.freebie}
              featuredImage={featuredDownload.featuredImage} />
          </div>
        </div>

        {/* Check tags on user example for paid Resource Library License */}
        <ExtendedLicenseUpsell visible={!data.user.tags.includes('Tuesday Makers Extended License')} />

        <div className='relative z-[5] mb-8 row-start-4 col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12 tablet:row-start-5 laptop:row-start-4 laptop:col-start-3 laptop:col-span-4 desktop:col-start-2 desktop:col-span-12'>
          <FreebieFilter
            setFilter={setFilter}
            filterTags={filterTags}
            selectedFilter={selectedFilter}
            handleClick={handleFilterClick}
          />
        </div>

        {/* FILTER BACKGROUND */}
        <div className={`row-start-4 col-span-full tablet:row-start-5 laptop:row-start-4 laptop:col-start-1 laptop:col-span-7 desktop:col-start-1 desktop:col-span-11`}>
          <div className='w-full h-full bg-white'></div>
        </div>

        <div className='mt-8 col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12 tablet:min-h-[600px]'>

          <CircleSpinner
            visible={state.loading
              && !state.categories[selectedFilter.slug]}
          />

          <FreebieGrid
            selectedFilter={selectedFilter.slug}
            categories={state.categories} />
        </div>


        {state.categories[selectedFilter.slug] && state.categories[selectedFilter.slug].pageInfo.hasNextPage &&
          <div className='col-span-2 col-start-2 my-2 tablet:col-start-2 tablet:col-span-12 desktop:col-start-2 desktop:col-span-12'>
            <div className='tablet:mt-5 tablet:mb-12'>
              <OutlinedButton
                className='mx-auto bg-transparent btn btn-outline'
                clickHandler={handleFetchMorePosts}
                text={'Show More'} loading={state.loading}
                loadingText={'Loading...'}
                spinnerColors={spinnerColors.sageOutline}
              />
            </div>
          </div>
        }

        <div>

        </div>
      </div>
    </div>

  )
}
export default ResourceLibraryMembers
