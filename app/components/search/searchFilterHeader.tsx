import PillSmall from '../pills/pillSmall'
import CloseSvg from '../svgs/closeSvg'

interface Props {
  category: string | null
  closeCategory: () => void
  handleSetCategory: (key: string) => () => void
}

/**
 * @component SearchFilterHeader
 * 
 * @tested - 6/22/2022 
 *
 */
function SearchFilterHeader(props: Props) {
  const { category, closeCategory, handleSetCategory } = props

  return (
    <>

      {/* FILTER HEADER */}
      <div className="flex flex-row flex-wrap justify-between pt-8 pb-3">
        <div className="text-sm font-semibold text-emerald-900 h-[24px]">Filter by Skill Level</div>
        {
          category !== null &&
          <div
            data-testid="closeCategory-btn"
            onClick={closeCategory} className="flex flex-row items-center cursor-pointer">
            <div className="">Clear</div>
            <div className="w-full max-w-[20px] ml-1">
              <CloseSvg stroke="#384050" strokeWidth={3} />
            </div>
          </div>
        }
      </div>

      {/* PILLS */}
      <div className="flex flex-row " data-testid="pill-container">
        <PillSmall
          selectedClassName="bg-emerald-600 text-white border-emerald-600"
          clickHandler={handleSetCategory('Beginner')}
          text={'Beginner'}
          selected={category === 'Beginner'}
        />
        <PillSmall
          selectedClassName="bg-tangerine-500 text-white border-tangerine-500"
          clickHandler={handleSetCategory('Intermediate')}
          text={'Intermediate'}
          selected={category === 'Intermediate'}
        />
        <PillSmall
          selectedClassName="bg-tangerine-800 text-white border-tangerine-800"
          clickHandler={handleSetCategory('Advanced')}
          text={'Advanced'}
          selected={category === 'Advanced'}
        />
      </div>
    </>
  )
}

export default SearchFilterHeader
