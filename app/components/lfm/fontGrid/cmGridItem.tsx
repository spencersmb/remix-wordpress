import LazyImgix from '@App/components/images/lazyImgix'
import { createImgixSizes } from '@App/utils/imageHelpers'
import { lfmImgRoot } from '@App/utils/lfmUtils'

interface Props {
  index: number
  gridItem: CmGridItem
}

function CmGridItem(props: Props) {
  const { gridItem, index } = props
  const url = `${lfmImgRoot.aws}/cm-grid/images`
  const gridImg = createImgixSizes({
    width: 706,
    height: 471,
    mobileSize: 400,
    alt: gridItem.alt,
    src: `${url}/${gridItem.img}`,
  })
  return (
    <div
      className='cm-grid__item px-[7.5px] pb-4 flex-[0_1_50%] tablet:flex-[1_0_33.33333%] tablet:max-w-[25%]'>
      <div className='cm-grid__item--shadow rounded-md transition-all duration-300 cursor-pointer shadow-et_1 overflow-hidden bg-white min-h-[91px] tablet:min-h-[113.08px] laptop:min-h-[151.77px] desktop:min-h-[185.13px]'>
        <a
          data-testid={`cm-grid-item-${index}`}
          aria-label={`View ${gridItem.alt} Font`}
          href={gridItem.link} target='_blank' rel="noopener noreferrer">
          <LazyImgix
            id={`cmGrid-${index}`}
            image={gridImg.image}
            srcSet={`${gridImg.defaultSrc}`}
          />
        </a>
      </div>
    </div>
  )
}

export default CmGridItem
