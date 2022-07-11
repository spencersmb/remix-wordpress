import React from 'react'

interface Props { }

const categories = [
  {
    name: 'Supplies',
    links: [
      {
        title: 'Tombow Fudenosuke',
        url: 'https://amzn.to/2tAqQDx',
      },
      {
        title: 'Pentel Fude Brush Pen (Extra Fine)',
        url: 'https://amzn.to/2MSlL2l',
      },
      {
        title: 'Small Waterbrush',
        url: 'https://amzn.to/2tr7mSG',
      },
      {
        title: 'Sumi Ink',
        url: 'https://amzn.to/2yDoRnJ',
      },
      {
        title: 'Canon PIXMA MG3620',
        url: 'https://amzn.to/2MUQuvN',
      },
      {
        title: 'Canon PIXMA MG3620',
        url: 'https://itunes.apple.com/us/app/scanner-pro/id333710667?mt=8',
      },
    ]
  },
  {
    name: 'Software',
    links: [
      {
        title: 'Adobe Illustrator',
        url: 'https://www.adobe.com/downloads.html'
      },
      {
        title: 'Glyphs (Mac users)',
        url: 'https://glyphsapp.com/buy'
      },
      {
        title: 'Font Creator (PC users)',
        url: 'http://www.high-logic.com/font-editor/fontcreator.html?'
      },
      {
        title: 'Adobe Photoshop (optional)',
        url: 'https://www.adobe.com/downloads.html'
      },
    ]
  },
  {
    name: 'Mockup Websites',
    links: [
      {
        title: 'Graphic Burger',
        url: 'https://graphicburger.com/'
      },
      {
        title: 'Mockup Zone',
        url: 'https://mockup.zone/'
      },
      {
        title: 'Pixeden',
        url: 'https://www.pixeden.com/'
      },
      {
        title: 'Creative Market',
        url: 'https://creativemarket.com/graphics/product-mockups?u=everytuesday'
      },
      {
        title: 'Design Cuts',
        url: 'https://www.designcuts.com/product-category/templates/mockups/?ref=303'
      },
    ]
  }
]
function MiniCourseSupplies(props: Props) {

  return (
    <div className='flex flex-col my-8'>
      {/* <div className='mb-4 text-lg font-semibold'>
        Links to tools I use
      </div> */}

      {/* CATEGORIES */}
      <div className='grid grid-cols-1 gap-5 tablet:grid-cols-3'>
        {categories.map((category, index) => {
          return (
            <div key={index} className='flex flex-col'>
              <div className='mb-4 pb-2 text-2xl font-sentinel__SemiBoldItal border-b-[1px] border-grey-400'>
                {category.name}
              </div>
              <ul>
                {category.links.map((link, linkIndex) => {
                  return (
                    <li key={index} className='mb-2'>
                      <a
                        className='font-medium text-sage-600 hover:text-sage-500 underlined after:underlineAnimation laptop:text-lg'
                        target='_blank'
                        rel="noopener noreferrer"
                        href={link.url}>
                        {link.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default MiniCourseSupplies
