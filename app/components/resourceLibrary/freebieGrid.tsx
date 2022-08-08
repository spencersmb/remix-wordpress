
import { AnimatePresence, motion } from 'framer-motion';
import type { LazyComponentProps } from 'react-lazy-load-image-component';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import Freebie from './freebie';

interface Props {
  selectedFilter: string
  categories: {
    [id: string]: {
      pageInfo: {
        page: number,
        endCursor: string,
        hasNextPage: boolean,
      },
      freebies: IResourceItem[]
    }
  }
}
type IProps = LazyComponentProps & Props

function FreebieGrid(props: IProps) {
  const { categories, scrollPosition, selectedFilter } = props

  return (
    <div className='grid grid-flow-row grid-cols-1 tablet:grid-cols-2 tablet:gap-x-5 laptop:grid-cols-3 desktop:gap-x-8 desktop:grid-cols-4 tablet:min-h-[600px]'>
      <AnimatePresence>
        {categories[selectedFilter] && categories[selectedFilter].freebies.map((freebie) => (<Freebie key={freebie.id} resource={freebie} scrollPosition={scrollPosition} />)
        )}

        {(categories[selectedFilter] && categories[selectedFilter].freebies.length === 0) && <motion.div
          key={'no-results'}
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto',
            transition: {
              delay: 0.3,
              duration: 0.3,
            }
          }}
          exit={{
            height: 0,
            opacity: 0,

          }} className='text-center text-blue-slate'>No results found</motion.div>}
      </AnimatePresence>

    </div>
  )
}

export default trackWindowScroll(FreebieGrid)
