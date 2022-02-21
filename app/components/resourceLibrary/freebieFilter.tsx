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
  selectedFilter: string
  handleClick: (filter: string) => any
}




// Library Order: Brushes, Color palettes, Style Studies, Misc, 

const FreebieFilter = ({ filterTags, selectedFilter = 'all', handleClick }: IProps) => {
  const selectedCss = 'bg-neutral-300 py-2 px-3 rounded-lg font-bold'
  const defaultCss = 'py-2 px-3 width-test inline-block transistion-all duration-100 w-full cursor-pointer laptop:mb-0'
  return (
    <div>
      <div className='flex flex-row justify-center items-center'>
        <h4 className='text-sm uppercase text-neutral-700 leading-none mr-3 laptop:mr-0 laptop:mb-4 laptop: ml-2 text-center'>
          Filter by category
        </h4>
        <div className='relative z-10 laptop:hidden'>
          <SelectDropdown
            handleOnChange={handleClick}
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
                  onClick={handleClick(filter.slug)}>
                  {/*<span>*/}
                  {/*  <svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                  {/*    <path d="M5.27751 9.26631L1.37852 5.39971L0 6.76655L5.27751 12L16 1.36685L14.6214 0L5.27751 9.26631Z"/>*/}
                  {/*  </svg>*/}
                  {/*</span>*/}

                  <span title={filter.name} className={classNames(selectedFilter === filter.slug ? selectedCss : '', defaultCss)}>{filter.name}</span>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default FreebieFilter
