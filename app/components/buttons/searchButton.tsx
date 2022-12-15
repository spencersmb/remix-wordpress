import { useSearch } from '@App/hooks/useSearch'
import { useLocation } from '@remix-run/react'
import { motion, useReducedMotion } from 'framer-motion'
import SearchSvg from '../svgs/searchSvg'

interface Props { }

// TODO: TEST THIS
function SearchButton(props: Props) {
  const { openSearch } = useSearch()
  const circumference = 28 * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const shouldReduceMotion = useReducedMotion()
  const location = useLocation()
  const isTuesdayMakersPage = location.pathname === '/tuesday-makers'
  return (
    <div
      data-testid="search-icon-desktop"
      onClick={openSearch}
      className="relative inline-flex items-center justify-center flex-none p-1 overflow-hidden rounded-full w-14 h-14 group">
      <div className={`${isTuesdayMakersPage
        ? 'text-emerald-400'
        : 'text-sage-600 dark:text-gray-600'} absolute  cursor-pointer `}>
        <svg width="56" height="56" >
          <motion.circle
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            r="26"
            cx="28"
            cy="28"
            style={{ strokeDasharray, rotate: -90 }}
            initial={{ strokeDashoffset: circumference }}
            whileHover={'hover'}
            variants={{
              initial: { strokeDashoffset: circumference },
              hover: { strokeDashoffset: 0 },
              focus: { strokeDashoffset: 0 },
              active: { strokeDashoffset: 0 },
            }}
            transition={{
              damping: 0,
              ...(shouldReduceMotion ? { duration: 0 } : null),
            }}
          />
        </svg>
      </div>
      <div className={`${isTuesdayMakersPage
        ? 'border border-transparent bg-emerald-500 group-hover:bg-emerald-400'
        : 'border bg-sage-700 group-hover:bg-sage-500'} transition-colors rounded-full cursor-pointer `}>
        <div className="w-[20px] h-[20px] m-3">
          <SearchSvg fill={isTuesdayMakersPage ? 'var(--sage-50)' : '#ffffff'} />
        </div>
      </div>
    </div>
  )
}

export default SearchButton
