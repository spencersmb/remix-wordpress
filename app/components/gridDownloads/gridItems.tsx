import type { LazyComponentProps } from 'react-lazy-load-image-component';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import GridItem from './gridItem';
interface Props {
  gridItems: IGridItem[]
}
type IProps = LazyComponentProps & Props

/**
 * 
 * @component DownloadGrid (GridItems)) 
 * @tested - 7/6/2022 
 */
function DownloadGrid(props: IProps) {
  const { gridItems, scrollPosition } = props

  return (
    <div className='grid grid-flow-row grid-cols-1 tablet:grid-cols-2 tablet:gap-x-5 laptop:grid-cols-3 desktop:gap-x-8'>
      {gridItems.length === 0 && <div className='text-center text-blue-slate'>No results found</div>}
      {gridItems.map((item, index) =>
        <GridItem
          item={item}
          key={index}
          scrollPosition={scrollPosition} />)}
    </div>
  )
}

export default trackWindowScroll(DownloadGrid)