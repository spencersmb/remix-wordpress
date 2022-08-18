import LazyImageBase from '@App/components/images/lazyImage-base'
interface Props {
  image: ImageLookupReturn
  index: number
  item: {
    name: string
    description: string
    link: string
  }
}

function HorizontalCard(props: Props) {
  const { image, index, item } = props

  return (
    <div key={index} className="mb-16 tablet:mb-0 tablet:flex tablet:flex-row group tablet:even:flex-row-reverse tablet:justify-center tablet:items-center desktop:even:flex-row til-item desktop:items-center">
      <div className='image tablet:flex-[0_1_40%] desktop:flex-[0_1_50%]'>
        <LazyImageBase image={image} id={`${index}-image`} />
      </div>

      <div className='flex flex-col tablet:flex-col tablet:max-w-[300px] tablet:ml-6 tablet:group-even:mr-6 tablet:group-even:ml-0 desktop:group-even:ml-6 til-item--content'>

        <div className='relative flex flex-row my-4 desktop:flex-col'>
          <span className='absolute left-0 top-[-27px] text-6xl font-bonVivant'>{`0${index + 1}`}</span>
          <span className='text-3xl til-item--title tablet:text-2xl ml-11 font-sentinel__SemiBoldItal desktop:text-3xl desktop:mt-10'>{item.name}</span>
        </div>

        <div>
          <p className='mb-8'>
            {item.description}
          </p>

          <a href={item.link} rel='noreferrer' target={'_blank'} className='btn btn-outline bg-cream-100'>
            Visit Site
          </a>
        </div>
      </div>
    </div>
  )
}

export default HorizontalCard
