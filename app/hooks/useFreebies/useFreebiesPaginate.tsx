import { useState } from "react";

interface IProps {
  defaultFilter?: { name: string, slug: string }
  itemsPerPage?: number
}

/**
 * @function createPaginatedList
 *
 * used to take in a large amount of posts that can be filtered via tags. Start off by show 10 items per
 * fetch from the master array. Then return the amount per page in total. If page 2, return the first 20 items from
 * the master array.
 *
 * Filter is an added function that returns all the items from the master array matching that filter
 * After the filter is applied, calculate the amount of pages based on the array length.
 *
 * @param {array} items // Any postType with tags array inside
 * @param {number} postsPerPage // The total amount of posts to show each time
 * @param {number} currentPage // current page user is on
 * @param {string} filterTag // the filter that is being applied
 */
function createPaginatedList(items: any, postsPerPage: number, currentPage: number, filterTag: { name: string, slug: string }): IUseFreebiesPostReturn<any> {

  const filteredPages = items.filter((item: any) => {

    if (filterTag.slug === 'all') {
      return item
    }

    console.log('item', item);
    const tags = item.tags.map((tag: any) => tag.slug)
    console.log('tags', tags);

    const hasTag = tags.indexOf(filterTag.slug)

    return hasTag !== -1
  })

  const pagesCount = Math.ceil(filteredPages.length / postsPerPage);
  let page = Number(currentPage);
  if (typeof page === 'undefined' || isNaN(page)) {
    page = 1;
  }

  return {
    posts: filteredPages.filter((item: any, index: number) => (index < page * postsPerPage)),
    pagination: {
      currentPage: page,
      pagesCount,
      hasNextPage: pagesCount > page
    }
  }
}

type IhandlePageClick = () => void
type IhandleFilterClick = (filter: { name: string, slug: string }) => void
interface IUseFreebiesReturn {
  setFilter: (filter: { name: string, slug: string }) => void
  filter: { name: string, slug: string },
  handleFilterClick: IhandleFilterClick
  handlePageClick: IhandlePageClick
}
interface IUseFreebiesPostReturn<T> {
  posts: T,
  pagination: {
    currentPage: number,
    pagesCount: number,
    hasNextPage: boolean
  }
}
/**
 * @Function useFreebies
 *
 * The primary hook that keeps track of what filter is selected + what page this is. Page is basically how many
 * times the user has clicked show more. Based on those 2 items we determine what posts to show.
 *
 */
function useFreebiesLocal<TData = any>({
  defaultFilter = { name: 'All', slug: 'all' },
  itemsPerPage = 10,
  items
}: IProps & { items: TData }): IUseFreebiesReturn & IUseFreebiesPostReturn<TData> {

  const [filter, setFilter] = useState<{ name: string, slug: string }>(defaultFilter)
  const [page, setPage] = useState(1)
  const handleFilterClick: IhandleFilterClick = (filterTag) => () => {
    if (filterTag.slug === filter.slug) return
    setFilter(filterTag)
  }
  const handlePageClick: IhandlePageClick = () => {
    setPage(page + 1)
  }

  return {
    ...createPaginatedList(items, itemsPerPage, page, filter),
    filter,
    setFilter,
    handleFilterClick,
    handlePageClick
  }
}

export default useFreebiesLocal