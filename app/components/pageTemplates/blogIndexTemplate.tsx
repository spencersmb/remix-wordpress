import useFetchPaginate from "@App/hooks/useFetchPagination";
import { navStyles } from "@App/utils/pageUtils";
import { consoleHelper } from "@App/utils/windowUtils";
import { AnimatePresence, motion } from "framer-motion";
import BlogFeaturedPost from "../blog/blogFeaturedPost";
import BlogCategoryTabs from "../blog/blogHomeTabs/blogCategoryTabs";
import BlogPostGrid from "../blog/blogPostGrid";
import OutlinedButton from "../buttons/outlinedButton";
import { spinnerColors } from "../spinners/spinnerColors";

interface Props {
  loaderData: any
}


function createInitializingFetchState(postsArgs: { posts: IPost[], pageInfo: any, page: number }, categorysArgs: ICategoryState | null) {
  let { posts, pageInfo, page } = postsArgs
  let initialState = {}
  if (posts.length > 0) {
    initialState = {
      posts,
      pageInfo: {
        ...pageInfo,
        page
      },
    }
  }

  if (categorysArgs) {
    initialState = {
      ...initialState,
      category: {
        ...categorysArgs.category
      },
    }
  }

  return initialState
}


function BlogIndexTemplate({ loaderData }: Props) {
  let { posts, pageInfo, pageUrlParams, categories, featured } = loaderData;
  // consoleHelper('categories from useLoader', categories, '/routes/blog/index.tsx');
  // consoleHelper('pageUrlParams', pageUrlParams, '/routes/blog/index.tsx');

  // const [category, setCategory] = useState(categories ? categories.selectedCategory : 'all')

  // Create initializing state for Context
  const initializePostsFromServer = createInitializingFetchState({
    posts,
    pageInfo,
    page: pageUrlParams
  }, categories)


  const { state, loadingPosts, category, setCategory, fetchCategory } = useFetchPaginate(initializePostsFromServer, {
    initialCategories: categories
  })

  // console.log('Blog Cat data', categories)
  // consoleHelper('cat posts', posts.length)
  // consoleHelper('cat pageInfo', pageInfo)
  // consoleHelper('state', state)

  const handleCatClick = (cat: string) => () => {
    if (state.loading) {
      return
    }
    setCategory(cat)
  }

  function handleViewMore() {
    loadingPosts()
    fetchCategory({
      endCursor: state.categories[category] ? state.categories[category].pageInfo.endCursor : null,
      page: state.categories[category] ? state.categories[category].pageInfo.page + 1 : 1
    })
  }

  return (
    <>
      <div className={`${navStyles} bg-[#F7F6F7]`}>
        <BlogFeaturedPost featuredPost={featured} />
        <BlogFeaturedPost featuredPost={featured} />
      </div>

      <div className='grid grid-flow-row row-auto mt-12 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:mt-16 desktop:grid-cols-desktop'>
        <BlogCategoryTabs catClick={handleCatClick} category={category} />
      </div>

      <div className='grid grid-flow-row row-auto py-12 grid-cols-mobile gap-x-5 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>

        <div className='col-span-2 col-start-2 tablet:col-start-2 tablet:col-span-12'>

          {/* @ts-ignore */}
          <AnimatePresence>
            {state.loading
              && !state.categories[category]
              && <motion.div
                key="catSpinner"
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  scale: 0
                }}
                className='rounded-full mx-auto flex items-center justify-center text-center w-[60px] h-[60px] bg-primary-50 p-1'>
                <svg
                  className="text-white motion-reduce:hidden animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#b45309" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="#845c5c" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </motion.div>
            }
          </AnimatePresence>

          <BlogPostGrid posts={state.posts} category={category} categories={state.categories} />

        </div>

        <div className='col-span-2 col-start-2 mb-12 tablet:col-start-2 tablet:col-span-12'>
          {/* {category === 'all' && state.pageInfo.hasNextPage &&
            <OutlinedButton
              spinnerColors={spinnerColors.sageOutline}
              clickHandler={fetchMorePosts}
              text='View More'
              loadingText="Loading"
              loading={state.loading}
            />
          } */}

          {state.categories[category] && state.categories[category].pageInfo.hasNextPage &&
            <OutlinedButton
              spinnerColors={spinnerColors.sageOutline}
              clickHandler={handleViewMore}
              text='View More'
              loadingText="Loading"
              loading={state.loading}
            />
          }
        </div>

      </div>

    </>
  )
}

export default BlogIndexTemplate