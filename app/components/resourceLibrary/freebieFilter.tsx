import { classNames } from '~/utils/appUtils'
import { consoleHelper } from '../../utils/windowUtils'
import SelectDropdown from '../forms/selectDropdown'

/**
 * @Component FreebieFilter
 *
 * Filter Nav element for Resource Grids
 * A dumb component that we can use to show the filter nav and what Filters are selected
 *
 *
 */

interface IProps {
  filterTags: IFilterTag[]
  selectedFilter: { name: string, slug: string }
  setFilter: (filter: { name: string, slug: string }) => void
  handleClick: (filter: { name: string, slug: string }) => any
}

const FreebieFilter = ({ filterTags, selectedFilter = { name: 'All', slug: 'all' }, handleClick, setFilter }: IProps) => {
  const selectedCss = 'bg-neutral-300 py-2 px-3 rounded-lg font-BlogDateAuthor'
  const defaultCss = 'py-2 px-3 bold-hover-fix inline-block transistion-all duration-100 w-full cursor-pointer laptop:mb-0'
  return (
    <div className='col-start-2 col-span-2 mt-8 mb-8 tablet:col-start-2 tablet:col-span-12 tablet:mt-10 tablet:mb-12 desktop:col-start-2 desktop:mt-20 desktop:col-span-12'>
      <div className='flex flex-col tablet:flex-row justify-center items-center'>
        <h4 className='text-sm uppercase text-neutral-700 leading-none mr-3 mb-3 tablet:mb-0 laptop:mr-0 laptop:mb-4 laptop: ml-2 text-center'>
          Filter by category
        </h4>
        <div className='relative z-10 laptop:hidden'>
          <SelectDropdown
            setFilter={setFilter}
            selected={selectedFilter}
            items={filterTags} />
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <ul className='hidden laptop:grid gap-x-2 w-full items-center text-sm capitalize text-neutral-900 laptop:grid-flow-col laptop:w-auto'>
          {filterTags
            .map(filter => {
              return (
                <li
                  key={filter.slug}
                  className='inline-block'
                  onClick={handleClick(filter)}>
                  <span
                    title={filter.name}
                    className={classNames(selectedFilter.slug === filter.slug ? selectedCss : '', defaultCss)}>
                    {filter.name}
                  </span>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default FreebieFilter
