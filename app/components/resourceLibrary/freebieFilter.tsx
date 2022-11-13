import { classNames } from '@App/utils/appUtils'
import { motion } from 'framer-motion'
import { consoleHelper } from '../../utils/windowUtils'
import SelectDropdown from '../forms/dropdown/selectDropdown'
import CheckmarkSvg from '../svgs/checkmarkSvg'

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
  position?: 'left' | 'center'
  selectedFilter: { name: string, slug: string }
  setFilter: (filter: { name: string, slug: string }) => void
  handleClick: (filter: { name: string, slug: string }) => any
}

const FreebieFilter = ({ filterTags, selectedFilter = { name: 'All', slug: 'all' }, handleClick, setFilter, position = 'left' }: IProps) => {

  return (
    <>
      <div className={classNames(position === 'center' ? '' : 'rotate-[-6deg] laptop:left-[90px] desktopXl:left-[45px]', 'absolute top-[-19px] left-1/2 -translate-x-1/2 w-[220px] laptop:top-[-30px]')}>
        <h4 className='mb-3 text-3xl leading-none text-center font-bonVivant tablet:mb-0 laptop:mr-0 laptop:mb-4 laptop:left-[90px] laptop:text-4xl'>
          Filter by category
        </h4>

      </div>

      {/* MOBILE FILTER */}
      <div className={classNames(position === 'center' ? '' : 'laptop:items-start', 'flex flex-col justify-center items-center pt-8 mobile_filter laptop:pt-12')}>
        <div className='relative z-10 desktop:hidden'>
          <SelectDropdown
            setFilter={setFilter}
            selected={selectedFilter}
            items={filterTags} />
        </div>
      </div>

      {/* DESKTOP FILTER */}
      <div className={classNames(position === 'center' ? 'justify-center' : '', 'relative flex items-center desktop:pb-4')}>
        <ul
          data-testid="filterTags"
          className='items-center hidden w-full text-sm capitalize desktop:grid gap-x-2 text-neutral-900 laptop:grid-flow-col laptop:w-auto laptop:gap-x-2'>
          {filterTags
            .map(filter => {
              return (
                <li
                  key={filter.slug}
                  className={classNames(selectedFilter.slug === filter.slug ? 'bg-sage-200 border-sage-200 text-sage-700 hover:bg-sage-200 hover:border-sage-200 hover:text-sage-700' : 'bg-grey-100 border-grey-100', 'btn btn-primary btn-sm text-grey-600')}
                  onClick={handleClick(filter)}>
                  <motion.span
                    animate={selectedFilter.slug === filter.slug
                      ? 'show'
                      : 'hide'
                    }
                    initial='hide'
                    variants={varients}
                    className={selectedFilter.slug === filter.slug ? 'selected-tag overflow-hidden' : 'overflow-hidden'}>
                    <CheckmarkSvg fill={'var(--sage-700'} className={'w-[20px] mr-1'} />
                  </motion.span>
                  <span
                    title={filter.name}
                    className={''}>
                    {filter.name}
                  </span>
                </li>
              )
            })}
        </ul>
      </div>
    </>
  )
}

export default FreebieFilter

const varients = {
  show: {
    opacity: 1,
    width: 'auto'
  },
  hide: {
    opacity: 0,
    width: 0
  }
}