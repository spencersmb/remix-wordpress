import { Popover, Transition } from '@headlessui/react'
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Link, useLocation, useNavigate, useTransition } from '@remix-run/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import useSite from '@App/hooks/useSite'
import popOverMenuItems from './popOverMenuItems'
import { useOutsideAlerter } from '@App/hooks/popOverOutsideElementClick'

/**
 * @Component TuesdayMakersPrimary PopOver menu
 * @tested - 6/2/2022
 * 
 * Tuesday Makers Pop up Feature Button
 *
 */
export default function TuesdayMakersPopOver() {
  const { state: { user } } = useSite()
  const transition = useTransition();
  const [visible, setVisible] = useState(false)
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);
  const location = useLocation()
  const isTuesdayMakersPage = location.pathname === '/tuesday-makers'
  useOutsideAlerter(wrapperRef, panelRef, () => {
    setVisible(false)
  });

  const handleButtonClick = () => {
    setVisible(!visible)
  }

  // IF PAGE IS TRANSITIONING, CLOSE THE PANEL
  useEffect(() => {
    if (transition.state === 'loading' && visible) {
      setVisible(false)
    }
  }, [transition, visible])

  return (
    <div className="text-sm normal-links text-primary-600 laptop:font-medium desktop:text-base">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            {/* MAIN BTN USER SEES FIRST */}
            <Popover.Button
              ref={wrapperRef}
              onClick={handleButtonClick}
              data-testid="tuesday-makers-btn"
              className={`
              ${isTuesdayMakersPage
                  ? visible
                    ? 'text-sage-50 border-emerald-500 bg-emerald-500 border-[3px] hover:bg-emerald-400 hover:border-emerald-400 text-opacity-70'
                    : 'text-sage-50 border-emerald-500 bg-emerald-500 border-[3px] hover:bg-emerald-400 hover:border-emerald-400'
                  : visible
                    ? 'bg-sage-300 border-sage-300 border-[3px]'
                    : 'bg-white text-success-700 border-sage-200 border-[3px] hover:bg-sage-100 hover:border-sage-300'}
                border-0 group px-4 pr-3 py-[13px] rounded-xl inline-flex items-center text-base font-semibold transition-all duration-300 `}
            >
              <span className={`
                ${isTuesdayMakersPage
                  ? 'text-[#5B1F28] bg-tangerine-600'
                  : 'text-white bg-sage-600'}
                  px-2 py-1 text-xs font-extrabold mr-2 rounded-[6px]`}>Popular</span>
              <span className='text-sm desktop:text-base'>Tuesday Makers</span>
              <ChevronDownIcon
                className={`${visible ? 'text-opacity-70' : ''}
                ${isTuesdayMakersPage
                    ? 'text-sage-50'
                    : 'text-success-700 group-hover:fill-sage-700'}
                  ml-1 h-5 w-5  transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              show={visible}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              {visible && <div ref={panelRef} className="absolute z-10 w-screen max-w-sm px-4 mt-2 transform -translate-x-1/2 left-1/2 sm:px-0 tablet:max-w-[432px]">
                <div className="overflow-hidden rounded-lg shadow-xxl-grey">
                  <div className="relative grid gap-0 py-4 bg-white lg:grid-cols-2">
                    {popOverMenuItems.map((item) => (
                      <Link
                        data-testid="panel-item"
                        key={item.name}
                        to={item.href}
                        prefetch={'intent'}
                        className="flex items-start p-2 px-4 py-4 mx-5 text-left transition duration-150 ease-in-out rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 group"
                      >
                        {/* ICON */}
                        <div className={`flex items-start justify-center flex-shrink-0 p-2 rounded-md bg-grey-100 transition-all duration-200 ${item.icon.bgClass}`}>
                          <div className={`max-w-[24px] w-full ${item.icon.color}`}>
                            {item.icon.svg}
                          </div>
                        </div>

                        {/* CONTENT */}
                        <div className="flex-grow ml-4">
                          <p className="mb-[2px] text-[15px] font-semibold text-charcoal-900">
                            {item.name}
                          </p>
                          <p style={{ color: '#6D727E' }} className="text-[.8rem] leading-[17px]">
                            {item.description}
                          </p>
                        </div>

                        {/* ARROW */}
                        <div className={`w-full max-w-[15px] mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-2 ${item.icon.color}`}>
                          <ArrowRightIcon fill='currentColor' />
                        </div>

                      </Link>
                    ))}
                  </div>
                  <div
                    data-testid="panel-footer"
                    className={`grid grid-flow-row gap-4 p-5 bg-gray-100 ${user.resourceUser ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {user.resourceUser && <Link
                      prefetch={'intent'}
                      className="btn btn-outline"
                      to={'/tuesday-makers/members'}>
                      Makers Dashboard
                    </Link>}
                    {!user.resourceUser && <>
                      <Link
                        to={'/tuesday-makers'}
                        prefetch={'intent'}
                        className="btn btn-primary btn-flex">
                        Sign Up
                      </Link>
                      <Link
                        prefetch={'intent'}
                        to={'/tuesday-makers/login'}
                        className="btn btn-outlineFill btn-flex">
                        Login
                      </Link>
                    </>}
                  </div>
                </div>
              </div>}
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}