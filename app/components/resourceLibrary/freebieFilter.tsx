import { classNames } from '@App/utils/appUtils'
import { consoleHelper } from '../../utils/windowUtils'
import SelectDropdown from '../forms/dropdown/selectDropdown'

/**
 * @Component FreebieFilter
 *
 * Filter Nav element for Resource Grids
 * A dumb component that we can use to show the filter nav and what Filters are selected
 *
 * @tested - 6/4/2022
 */

interface IProps {
  filterTags: IFilterTag[]
  selectedFilter: { name: string, slug: string }
  setFilter: (filter: { name: string, slug: string }) => void
  handleClick: (filter: { name: string, slug: string }) => any
}

const FreebieFilter = ({ filterTags, selectedFilter = { name: 'All', slug: 'all' }, handleClick, setFilter }: IProps) => {
  const selectedCss = 'selected-tag bg-neutral-300 py-2 px-3 rounded-lg font-BlogDateAuthor'
  const defaultCss = 'py-2 px-3 bold-hover-fix inline-block transistion-all duration-100 w-full cursor-pointer laptop:mb-0'
  return (
    <div className='col-span-2 col-start-2 mt-8 mb-8 tablet:col-start-2 tablet:col-span-12 tablet:mt-10 tablet:mb-12 desktop:col-start-2 desktop:mt-20 desktop:col-span-12'>
      <div className='flex flex-col items-center justify-center tablet:flex-row'>
        <h4 className='mb-3 ml-2 mr-3 text-sm leading-none text-center uppercase text-neutral-700 tablet:mb-0 laptop:mr-0 laptop:mb-4 laptop:'>
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
        <ul
          data-testid="filterTags"
          className='items-center hidden w-full text-sm capitalize laptop:grid gap-x-2 text-neutral-900 laptop:grid-flow-col laptop:w-auto'>
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
