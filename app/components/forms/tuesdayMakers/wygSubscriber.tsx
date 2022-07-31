import React from 'react'

interface Props { }

const items = [
  {
    title: 'New Emails every week',
    description: 'Receive something new in your inbox every Tuesday to push your digital skills further - from free fonts, to brushes, tutorials, textures and more!'
  },
  {
    title: 'New Emails every week',
    description: 'Receive something new in your inbox every Tuesday to push your digital skills further - from free fonts, to brushes, tutorials, textures and more!'
  },
  {
    title: 'New Emails every week',
    description: 'Receive something new in your inbox every Tuesday to push your digital skills further - from free fonts, to brushes, tutorials, textures and more!'
  },
  {
    title: 'New Emails every week',
    description: 'Receive something new in your inbox every Tuesday to push your digital skills further - from free fonts, to brushes, tutorials, textures and more!'
  },
  {
    title: 'New Emails every week',
    description: 'Receive something new in your inbox every Tuesday to push your digital skills further - from free fonts, to brushes, tutorials, textures and more!'
  }
]
function WygSubscriber(props: Props) {

  return (
    <div className='my-10 laptop:my-20 et-grid-basic'>
      <h3 className='col-span-2 col-start-2'>
        What you get as a subscriber
      </h3>

      {items.map((item, index) => (
        <WygSubscribeItem key={index} {...{
          ...item,
          index
        }} />
      ))}
    </div>
  )
}

export default WygSubscriber

interface itemProps {
  title: string
  index: number
  description: string
}
const WygSubscribeItem = (item: itemProps) => {
  const first3Items = item.index < 3
    ? 'tablet:col-start-2 tablet:col-span-6'
    : 'tablet:col-start-8 tablet:col-span-6'

  const checkCssRows = (index: number) => {
    switch (index) {
      case 0:
      case 1:
      case 2:
        return ''
      case 3:
        return 'tablet:row-start-5'
      case 4:
        return 'tablet:row-start-6'
    }
  }

  const cssMargins = (index: number) => {
    switch (index) {
      case 0:
      case 1:
      case 2:
        return 'laptop:ml-6'
      case 3:
        return 'laptop:mr-6'
      case 4:
        return 'laptop:mr-6'
    }
  }

  const containerCss = `
    col-start-2 col-span-2 tablet:mx-4 ${first3Items}
    ${checkCssRows(item.index)} ${cssMargins(item.index)}
  `

  return (
    <div className={containerCss}>
      <div>
        {item.index + 1}
      </div>
      <div>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </div>
    </div>
  )
}