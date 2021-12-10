import { useState } from 'react'
interface IProps {
  defaultFilter? : string
  itemsPerPage? : number
}

const createPaginatedList = (items: any, postsPerPage: number, currentPage: number, filterTag: string) => {

  const filteredPages = items.filter((item: any) => {

    if(filterTag === 'all'){
      return item
    }

    const tags = item.tags.map((tag: any) => tag.slug)
    const hasTag = tags.indexOf(filterTag)

    return hasTag !== -1
  })

  const pagesCount = Math.ceil(filteredPages.length / postsPerPage);
  let page = Number(currentPage);
  if (typeof page === 'undefined' || isNaN(page)) {
    page = 1;
  }

  return {
    posts: filteredPages.filter((item: any,index: number) => (index < page * 10)),
    pagination: {
      currentPage: page,
      pagesCount,
      hasNextPage: pagesCount > page
    }
  }
}

type IhandlePageClick = () => void
type IhandleFilterClick = (filter: string) => void
interface IUseFreebiesReturn {
  filter: string,
  handleFilterClick: IhandleFilterClick
  handlePageClick: IhandlePageClick
}
function useFreebies<TData = any> ({
  defaultFilter = 'all',
  itemsPerPage = 10,
  items
  }: IProps & {items: TData}): IUseFreebiesReturn & {
    posts: TData,
    pagination: {
      currentPage: number,
      pagesCount: number,
      hasNextPage: boolean
    }
  } {
  const [filter, setFilter] = useState(defaultFilter)
  const [page, setPage] = useState(1)
  const handleFilterClick: IhandleFilterClick = (filterTag) => () => {
    setFilter(filterTag)
  }
  const handlePageClick: IhandlePageClick = () => {
    setPage(page + 1)
  }

  return {
    ...createPaginatedList(items, itemsPerPage, page, filter),
    filter,
    handleFilterClick,
    handlePageClick
  }
}

export default useFreebies
