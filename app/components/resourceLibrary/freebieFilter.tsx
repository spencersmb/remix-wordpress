import { consoleHelper } from '../../utils/windowUtils'

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
const FreebieFilter = ({filterTags, selectedFilter = 'all', handleClick}: IProps) => {
  consoleHelper('selectedFilter', selectedFilter)

  return (
    <div>
      <h4>Filter by category</h4>
      <ul className='flex flex-row mb-2'>
        {filterTags.length > 0 && <li
          className={selectedFilter === 'all' ? 'text-red-500 ml-3 mr-3' : 'ml-3 mr-3'}
          onClick={handleClick('all')}>
            <span>
              {/*<svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
              {/*  <path d="M5.27751 9.26631L1.37852 5.39971L0 6.76655L5.27751 12L16 1.36685L14.6214 0L5.27751 9.26631Z"/>*/}
              {/*</svg>*/}
            </span>
          Show All
        </li>}
        {filterTags
          .map(filter =>{
            const classes = `${selectedFilter === filter.slug ? 'text-red-500 ' : ''} ml-3 mr-3`
            return(
              <li
                key={filter.slug}
                className={classes}
                onClick={handleClick(filter.slug)}>
                {/*<span>*/}
                {/*  <svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                {/*    <path d="M5.27751 9.26631L1.37852 5.39971L0 6.76655L5.27751 12L16 1.36685L14.6214 0L5.27751 9.26631Z"/>*/}
                {/*  </svg>*/}
                {/*</span>*/}
                {filter.name}
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default FreebieFilter
