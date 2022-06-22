import PillSmall from '../pills/pillSmall'
import CloseSvg from '../svgs/closeSvg'

interface Props {
  category: string | null
  closeCategory: () => void
  handleSetCategory: (key: string) => () => void
}
// Todo: test
function SearchFilterHeader(props: Props) {
  const { category, closeCategory, handleSetCategory } = props

  return (
    <>
      {/* FILTER HEADER */}
      <div className="flex flex-row flex-wrap justify-between pt-8 pb-3">
        <div className="text-sm font-semibold text-grey-400 h-[24px]">FILTER BY SKILL LEVEL</div>
        {category !== null &&
          <div onClick={closeCategory} className="flex flex-row items-center">
            <div className="">Clear</div>
            <div className="w-full max-w-[20px] ml-1">
              <CloseSvg stroke="#384050" strokeWidth={3} />
            </div>
          </div>}
      </div>

      {/* PILLS */}
      <div className="flex flex-row ">
        <PillSmall
          className="bg-success-100 text-grey-600"
          clickHandler={handleSetCategory('Beginner')}
          text={'Beginner'}
          selected={category === 'Beginner' || category === null}
        />
        <PillSmall
          className="bg-secondary-200 text-grey-600"
          clickHandler={handleSetCategory('Intermediate')}
          text={'Intermediate'}
          selected={category === 'Intermediate' || category === null}
        />
        <PillSmall
          className="bg-primary-200 text-grey-600"
          clickHandler={handleSetCategory('Advanced')}
          text={'Advanced'}
          selected={category === 'Advanced' || category === null}
        />
      </div>
    </>
  )
}

export default SearchFilterHeader
