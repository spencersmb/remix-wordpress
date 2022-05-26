import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Link } from '@remix-run/react'
import { Fragment } from 'react'
import useSite from '@App/hooks/useSite'

const solutions = [
  {
    name: 'Free Procreate Brushes',
    description: 'Lettering, Illustration and Painting sets',
    href: '/tuesday-makers',
    icon: IconOne,
    bg: '#F0E3DC',
  },
  {
    name: '100+ Procreate Color Swatches',
    description: 'Choose from tons of color options',
    href: '/tuesday-makers',
    icon: IconOne,
    bg: '#EDD8B2'
  },
  {
    name: 'Font Files & Lettering assets',
    description: 'Get instant access to all the files',
    href: '/tuesday-makers',
    icon: IconTwo,
    bg: '#ECF2F2'
  },
]

export default function TuesdayMakersPopOver() {
  const { state: { user } } = useSite()
  return (
    <div className="m-2 mx-4 text-sm normal-links text-primary-600 laptop:font-medium desktop:text-base">
      <Popover className="relative">
        {({ open }) => (
          <>
            {/* MAIN BTN USER SEES FIRST */}
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                text-success-700 group bg-success-100 px-6 py-4 rounded-2xl inline-flex items-center text-base font-semibold hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Tuesday Makers</span>
              <ChevronDownIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-success-700 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 tablet:max-w-lg">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center p-2 -m-3 text-left transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div style={{ background: item.bg }} className="flex items-center justify-center flex-shrink-0 w-[57px] h-[57px] p-[10px] text-white rounded-lg">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-charcoal-900">
                            {item.name}
                          </p>
                          <p style={{ color: '#6D727E' }} className="text-sm ">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className={`grid grid-flow-row ${user.resourceUser ? 'grid-cols-1' : 'grid-cols-2'} gap-4 p-5 bg-gray-50`}>
                    {user.resourceUser && <Link
                      to="/tuesday-makers/members"
                      className="py-2 transition duration-300 border-2 text-success-500 btn btn-outlined-teal-600 ring-offset-0 ring-0 border-success-400 hover:ring-0 hover:ring-offset-0 hover:border-success-600 hover:bg-gray-50 hover:text-success-600 hover:border-2"
                    >
                      Makers Dashboard
                    </Link>}
                    {!user.resourceUser && <>
                      <Link
                        to="/tuesday-makers"
                        className="transition duration-300 ease-in-out btn btn-teal-400 ring-offset-0 ring-0 hover:ring-0 hover-ring-offset-0 hover-ring-0 hover:bg-success-500">
                        Sign Up
                      </Link>
                      <Link
                        to="/tuesday-makers/login"
                        className="py-2 transition duration-300 border-2 text-success-500 btn btn-outlined-teal-600 ring-offset-0 ring-0 border-success-400 hover:ring-0 hover:ring-offset-0 hover:border-success-600 hover:bg-gray-50 hover:text-success-600 hover:border-4"
                      >
                        Login
                      </Link>
                    </>}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

function IconOne() {
  return (
    <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M34.8332 30.0833C34.8332 30.9232 34.4995 31.7286 33.9057 32.3225C33.3118 32.9164 32.5064 33.25 31.6665 33.25H6.33317C5.49332 33.25 4.68786 32.9164 4.094 32.3225C3.50013 31.7286 3.1665 30.9232 3.1665 30.0833V7.91667C3.1665 7.07681 3.50013 6.27136 4.094 5.6775C4.68786 5.08363 5.49332 4.75 6.33317 4.75H14.2498L17.4165 9.5H31.6665C32.5064 9.5 33.3118 9.83363 33.9057 10.4275C34.4995 11.0214 34.8332 11.8268 34.8332 12.6667V30.0833Z" stroke="#CDA7A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 17.4167V26.9167" stroke="#5E4242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.25 22.1667H23.75" stroke="#5E4242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}
function IconTwo() {
  return (
    <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.1665 26.9165L18.9998 34.8332L34.8332 26.9165" stroke="#C7D8D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.1665 19L18.9998 26.9167L34.8332 19" stroke="#8FB1B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.9998 3.16675L3.1665 11.0834L18.9998 19.0001L34.8332 11.0834L18.9998 3.16675Z" stroke="#4F7171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>


  )
}