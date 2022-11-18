import { siteLoginUrls } from '@App/lib/wp/site'
import { classNames } from '@App/utils/appUtils'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Link } from '@remix-run/react'
import { motion } from 'framer-motion'
import React from 'react'
import UserSvg from '../svgs/userSvg'

interface Props {
}

// TODO: TEST THIS
function LoginDropDown(props: Props) {
  const [open, setIsOpen] = React.useState(false)
  const handleClick = (e: any) => {
    // console.log('click', e.target);
    // console.log('click', e.currentTarget);
    setIsOpen(!open)
  }
  const loginKeys = Object.keys(loginData)

  return (
    <div onClick={handleClick} className="overflow-hidden text-white rounded-lg bg-sage-600">

      {/* LOGIN TITLE / ICONS */}
      <div className={classNames(open ? 'bg-sage-700' : '', 'flex flex-row px-6 py-4 items-center top')}>

        <div className={classNames(open ? 'opacity-70' : 'opacity-1', 'w-5 mr-2 text-white')}>
          <UserSvg data-testid={'user-icon'} fill={`currentColor`} />
        </div>

        <div className={classNames(open ? 'opacity-70' : 'opacity-1', 'flex-1 text-lg font-semibold transition-opacity top')}>
          Login
        </div>

        <div>
          <ChevronDownIcon
            data-testid={'chevron-icon'}
            className={classNames(open ? 'transform rotate-180' : '', 'h-5 w-5 text-white transition ease-in-out duration-150 top')}
            aria-hidden="true"
          />
        </div>
      </div>

      <motion.div
        variants={variants}
        animate={open ? "visible" : "hidden"}
        className="h-0 overflow-hidden">
        <div className='px-6 py-4'>
          <ul
            data-testid="login-dropdown"
            className='flex flex-col py-2 pb-4 gap-y-6'>
            {loginKeys.map((key) => {
              const item = loginData[key]

              if (key === 'tuesday-makers') {
                return (
                  <li key={key}>
                    <Link
                      className='flex flex-row'
                      to={item.link}>
                      {/* TITLE */}
                      <div className='flex flex-col flex-1 pr-5 text-white'>
                        <div className='text-2xl font-semibold font-sentinel__SemiBoldItal'>
                          {item.title}
                        </div>
                        <div className='text-sm'>
                          {item.description}
                        </div>

                      </div>
                    </Link>
                  </li>
                )
              }

              return (
                <li key={key}>
                  <a
                    target={'_blank'}
                    rel={'noreferrer noopener'}
                    className='flex flex-row'
                    href={item.link}>
                    {/* TITLE */}
                    <div className='flex flex-col flex-1 pr-5 text-white'>
                      <div className='text-2xl font-semibold font-sentinel__SemiBoldItal'>
                        {item.title}
                      </div>
                      <div className='text-sm'>
                        {item.description}
                      </div>

                    </div>
                  </a>
                </li>
              )
            })}

          </ul>
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
export default LoginDropDown
