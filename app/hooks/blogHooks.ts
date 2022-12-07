import { BreakpointEnums } from "@App/enums/breakpointEnums";
import { QUERY_POSTS_BY_CAT } from "@App/lib/graphql/queries/posts";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { addClass } from "@App/utils/pageUtils";
import { flattenAllPosts } from "@App/utils/posts";
import { setWindowUrlParams } from "@App/utils/windowUtils";
import { useLocation } from "@remix-run/react";
import { useCallback, useEffect, useRef } from "react";
import useSite from "./useSite";

export function useSetUrlPageHistory(pageNumber: number) {

  // pageInfo.page
  useEffect(() => {
    if (pageNumber === 1 || !pageNumber) {
      return
    }

    const url = new URL(window.location.href);
    url.searchParams.set('page', pageNumber.toString())
    // window.history.replaceState(`Page: ${pageNumber}`, `Blog: Page ${pageNumber} - Every-Tuesday`, url.href);
    window.history.pushState(`Page: ${pageNumber}`, `Blog: Page ${pageNumber} - Every-Tuesday`, url.href);
    document.title = `Blog: Page ${pageNumber} - Every-Tuesday`

    // if page = 4 - means get the first 40 items
  }, [pageNumber])
}


interface ISetUrlBlogParams {
  category: string,
  pageInfo: {
    page: number,
  }
  categories: ICategoryItem
}
export function useSetUrlBlogParams({
  category,
  pageInfo,
  categories
}: ISetUrlBlogParams) {

  useEffect(() => {

    if (!categories[category]) {
      return
    }

    const setParams = [
      {
        name: 'page',
        value: categories[category].pageInfo.page.toString()
      },
      {
        name: 'cat',
        value: category
      },
    ]
    setWindowUrlParams({
      setParams,
      pageTitle: `Category - ${category} / Page: ${categories[category].pageInfo.page}`,
      tabTitle: 'Blog - Every-Tuesday'
    })
  }, [category, categories, pageInfo])
}

interface IUseFetchCategoryPosts {
  category: string,
  categories: ICategoryItem,
  addCategoryAction: any,
  loadingPosts: any
}


// on Category Change, if the category is not defined, then we need to fetch the category of posts
export function useFetchCategoryPosts({
  category,
  categories,
  loadingPosts,
  addCategoryAction
}: IUseFetchCategoryPosts) {

  const fetchCategory = useCallback(async ({
    endCursor,
    page
  }: IFetchCategory) => {

    const url = window.ENV.PUBLIC_WP_API_URL as string

    const variables = {
      first: 12,
      after: endCursor,
      catName: category === 'all' ? '' : category,
    }
    const body = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getGraphQLString(QUERY_POSTS_BY_CAT),
          variables
        })
      })
    const response = await body.json()
    const { data } = response
    const filteredPosts = flattenAllPosts(response.data.posts) || []

    addCategoryAction({
      category,
      pageInfo: {
        page,
        endCursor: data.posts.pageInfo.endCursor,
        hasNextPage: data.posts.pageInfo.hasNextPage,
      },
      posts: filteredPosts
    })

  }, [category, addCategoryAction])

  useEffect(() => {

    if (!categories[category]) {
      console.log('fetch new posts cat empty', categories)
      loadingPosts()
      // fetchMoreCategories()
      fetchCategory({
        endCursor: categories[category] ? categories[category].pageInfo.endCursor : null,
        page: categories[category] ? categories[category].pageInfo.page + 1 : 1
      })
    }
  }, [category, categories, loadingPosts, fetchCategory])

  return {fetchCategory}

}

export function useCheckOldBlogPost(post: IPost) {
  const location = useLocation();
  const locationPrevRef = useRef(location.pathname);
  // solve for older blog posts and the iframe issue
  const checkOldIframes = useCallback(() => {

    if (post.tutorialManager.youtube.id) {
      return null
    }

    let blogContent = document.querySelector('.blog-content')
    let pTags = blogContent?.querySelectorAll('p')

    if (!pTags) {
      return null
    }

    pTags.forEach(pTag => {
      const children = Array.from(pTag.children)
      children.find(child => {
        if (child.tagName === 'IFRAME') {
          addClass(pTag, 'embed-responsive')
        }
      })
    })
  }, [post.tutorialManager.youtube.id])

  // on Page Load check for old iframes
  useEffect(() => {

    checkOldIframes()

    return () => {

    }
  }, [checkOldIframes])

  // on location change check for old iframes
  useEffect(() => {

    if (location.pathname !== locationPrevRef.current) {
      // location changed
      checkOldIframes()
    }
    locationPrevRef.current = location.pathname
  }, [checkOldIframes, location.pathname, post.tutorialManager.youtube.id,])

}

export function useHideCommentsOnTransistion() {
  const location = useLocation();
  const locationPrevRef = useRef(location.pathname);
  const { hideComments, state: { commentsModal } } = useSite();
  useEffect(() => {

    if (location.pathname !== locationPrevRef.current && commentsModal.show) {
      // location changed
      hideComments()
    }
    locationPrevRef.current = location.pathname
  }, [commentsModal.show, hideComments, location.pathname])
}

export function useStickySidebarDevices(){

  const { state: { breakpoint } } = useSite();
  const mobilePrevBreakpointRef = useRef(breakpoint);

  useEffect(() => {

    // if the preivous breakpoint was mobile and the current breakpoint is not mobile
    if (mobilePrevBreakpointRef.current !== (BreakpointEnums.desktop || BreakpointEnums.desktopXL) && breakpoint === (BreakpointEnums.desktop || BreakpointEnums.desktopXL)) {
      window.dispatchEvent(new Event('scroll'))
    }

    mobilePrevBreakpointRef.current = breakpoint
  }, [breakpoint])

}