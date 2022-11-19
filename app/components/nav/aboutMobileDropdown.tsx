import { siteLoginUrls } from '@App/lib/wp/site'
import { classNames } from '@App/utils/appUtils'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import React from 'react'
import { aboutMenuItems } from './popOver/popOverMenuItems'

interface Props {
}

// TODO: TEST THIS
function AboutMobileDropDown(props: Props) {
  const [open, setIsOpen] = React.useState(false)
  const handleClick = (e: any) => {
    setIsOpen(!open)
  }

  return (
    <div onClick={handleClick} className={classNames(open ? 'bg-grey-100' : '', 'transition-all duration-300 overflow-hidden')}>

      {/* LOGIN TITLE / ICONS */}
      <li key={'about'}
        data-testid="menu-item"
        className={classNames(open ? 'bg-grey-200' : '', 'flex text-2xl font-semibold text-sage-800 normal-links transition-all duration-300 flex-row items-center py-4 px-4')}>
        <div>
          About
        </div>
        <div>
          <ChevronDownIcon
            data-testid={'chevron-icon'}
            className={classNames(open ? 'transform rotate-180' : '', 'w-8 transition ease-in-out duration-150 top')}
            aria-hidden="true"
          />
        </div>
      </li>

      {/* DROPDOWN CONTENT */}
      <motion.div
        variants={variants}
        animate={open ? "visible" : "hidden"}
        className="h-0 overflow-hidden">
        <div className='px-6 py-4'>
          <div
            data-testid="login-dropdown"
            className='flex flex-col py-2 pb-4 gap-y-6'>
            {aboutMenuItems.map((item) => {
              return (
                <Link
                  data-testid="panel-item"
                  key={item.name}
                  to={item.href}
                  prefetch={'intent'}
                  className="flex items-center text-left transition duration-150 ease-in-out rounded-lg"
                >
                  {/* ICON */}
                  <div className={`flex items-start justify-center flex-shrink-0 p-2 rounded-md bg-grey-100 transition-all duration-200 ${item.icon.bgClass}`}>
                    <div className='max-w-[24px] w-full'>
                      {item.icon.svg}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-grow ml-4">
                    <p className="mb-[2px] font-semibold text-lg text-charcoal-900">
                      {item.name}
                    </p>
                    <p style={{ color: '#6D727E' }} className="text-sm leading-[17px]">
                      {item.description}
                    </p>
                  </div>

                </Link>
              )
            })}

          </div>
        </div>

      </motion.div>
    </div>
  )
}
const variants = {
  initial: {
    opacity: 0,
    height: 0,
  },
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: 'auto',
  }
}
interface LoginData {
  [key: string]: {
    title: string
    link: string
    description: string
  }
}
export const loginData: LoginData = {
  'tuesday-makers': {
    title: 'Tuesday Makers',
    description: 'Login to access the free downloads Resource LIbrary',
    link: '/tuesday-makers/login'
  },
  'teachable': {
    title: 'Teach:able',
    description: 'Login to access the courses you’re enrolled in',
    link: siteLoginUrls.teachable,
  },
  'gumroad': {
    title: 'Gumroad',
    description: 'Login to access your digital product purchases & downloads.',
    link: siteLoginUrls.gumroad,
  }
}
export default AboutMobileDropDown
