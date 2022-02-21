import { LazyComponentProps, trackWindowScroll }
  from 'react-lazy-load-image-component';
import Freebie from './freebie';
interface Props {
  freebies: IResourceItem[]
}
type IProps = LazyComponentProps & Props

function FreebieGrid(props: IProps) {
  const { freebies, scrollPosition } = props

  return (
    <div className='col-start-2 col-span-2 tablet:col-start-2 tablet:col-span-12'>

      <div className='grid grid-flow-row grid-cols-1 tablet:grid-cols-2 tablet:gap-x-5 laptop:grid-cols-3 desktop:gap-x-8'>
        {freebies.length === 0 && <div className='text-center text-blue-slate'>No results found</div>}
        {freebies.map(freebie => <Freebie key={freebie.id} resource={freebie} scrollPosition={scrollPosition} />)}
      </div>
    </div>
  )
}

export default trackWindowScroll(FreebieGrid)
