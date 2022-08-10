import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Link, useNavigate } from '@remix-run/react'
import { Fragment } from 'react'
import useSite from '@App/hooks/useSite'
import popOverMenuItems from './popOverMenuItems'

/**
 * @Component TuesdayMakersPrimary PopOver menu
 * @tested - 6/2/2022
 * 
 * Tuesday Makers Pop up Feature Button
 *
 */
export default function TuesdayMakersPopOver() {
  const { state: { user } } = useSite()
  let navigate = useNavigate();
  const handleButtonClick = (link: string, close: any) => () => {
    close()
    navigate(link, { replace: false })
  }

  return (
    <div className="m-2 mx-4 text-sm normal-links text-primary-600 laptop:font-medium desktop:text-base">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            {/* MAIN BTN USER SEES FIRST */}
            <Popover.Button
              data-testid="tuesday-makers-btn"
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
                    {popOverMenuItems.map((item) => (
                      <button
                        data-testid="panel-item"
                        key={item.name}
                        onClick={handleButtonClick(item.href, close)}
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
                      </button>
                    ))}
                  </div>
                  <div
                    data-testid="panel-footer"
                    className={`grid grid-flow-row gap-4 p-5 bg-gray-50 ${user.resourceUser ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {user.resourceUser && <button
                      onClick={handleButtonClick('/tuesday-makers/members', close)}
                      className="py-2 transition duration-300 border-2 text-success-500 btn btn-outlined-teal-600 ring-offset-0 ring-0 border-success-400 hover:ring-0 hover:ring-offset-0 hover:border-success-600 hover:bg-gray-50 hover:text-success-600 hover:border-2"
                    >
                      Makers Dashboard
                    </button>}
                    {!user.resourceUser && <>
                      <button
                        onClick={handleButtonClick('/tuesday-makers', close)}
                        className="transition duration-300 ease-in-out btn btn-teal-400 ring-offset-0 ring-0 hover:ring-0 hover-ring-offset-0 hover-ring-0 hover:bg-success-500">
                        Sign Up
                      </button>
                      <button
                        onClick={handleButtonClick('/tuesday-makers/login', close)}
                        className="py-2 transition duration-300 border-3 text-success-500 btn btn-outlined-teal-600 ring-offset-0 ring-0 border-success-400 hover:ring-0 hover:ring-offset-0 hover:border-success-600 hover:bg-gray-50 hover:text-success-600 hover:border-3"
                      >
                        Login
                      </button>
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