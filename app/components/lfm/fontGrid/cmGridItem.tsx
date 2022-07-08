import LazyImgix from '@App/components/images/lazyImgix'
import { lfmImgRoot } from '@App/utils/lfmUtils'

interface Props {
  index: number
  gridItem: CmGridItem
}

function CmGridItem(props: Props) {
  const { gridItem, index } = props
  const url = `${lfmImgRoot.aws}/cm-grid/images`

  return (
    <div
      className='cm-grid__item px-[7.5px] pb-4 flex-[0_1_50%] tablet:flex-[1_0_33.33333%] tablet:max-w-[25%]'>
      <div className='cm-grid__item--shadow rounded-md transition-all duration-300 cursor-pointer shadow-et_1 overflow-hidden bg-white min-h-[91px] tablet:min-h-[113.08px] laptop:min-h-[151.77px] desktop:min-h-[185.13px]'>
        <a
          data-testid={`cm-grid-item-${index}`}
          href={gridItem.link} target='_blank' rel="noopener noreferrer">
          <LazyImgix
            id={`cmGrid-${index}`}
            image={{
              width: 706,
              height: 471,
              alt: gridItem.alt,
              src: `${url}/${gridItem.img}`,
            }} />
        </a>
      </div>
    </div>
  )
}

export default CmGridItem
