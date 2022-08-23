import { Popover, Transition } from '@headlessui/react'
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Link } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import useSite from '@App/hooks/useSite'
import { useTransition } from '@remix-run/react'
import { aboutMenuItems } from './popOverMenuItems'
import EmailSvg from '@App/components/svgs/emailSvg'
import FacebookSvg from '@App/components/svgs/social/facebookSvg'
import InstagramSvg from '@App/components/svgs/social/instagramSvg'
import YoutubeSvg from '@App/components/svgs/social/youtubeSvg'
import { useOutsideAlerter } from '@App/hooks/popOverOutsideElementClick'


/**
 * @function AboutPopOver
 * @tested - 08/22/2022
 */
export default function AboutPopOver() {
  const { state: { metadata: { social } } } = useSite()
  const transition = useTransition();
  const [visible, setVisible] = useState(false)
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);
  useOutsideAlerter(wrapperRef, panelRef, () => {
    setVisible(false)
  });

  const socialKeys = Object.keys(social)

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
    <div className="mx-2 text-sm normal-links text-grey-700 laptop:font-medium desktop:text-base">
      <Popover className="relative" >
        {({ open, close }) => (
          <>
            {/* MAIN BTN USER SEES FIRST */}
            <Popover.Button
              ref={wrapperRef}
              onClick={handleButtonClick}
              data-testid="aboutNav-btn"
              className={`
                ${visible ? 'bg-grey-100 hover:bg-grey-100 hover:opacity-100' : 'hover:bg-grey-100 border-white'} border-0 text-grey-700 group px-4 pr-3 py-[13px] rounded-lg inline-flex items-center text-sm desktop:text-base font-semibold transition-all duration-300`}
            >
              <span>About</span>
              <ChevronDownIcon
                className={`${visible ? '' : 'text-opacity-70'}
                  ml-1 h-5 w-5 text-success-700 group-hover:fill-sage-700 transition ease-in-out duration-150`}
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
              {visible && <div ref={panelRef} className="absolute z-10 w-screen max-w-[600px] px-4 mt-2 transform -translate-x-1/2 left-1/2 sm:px-0">
                <div className="flex flex-row items-start overflow-hidden bg-white rounded-lg shadow-xxl-grey">
                  <div className="relative grid gap-0 py-4 bg-white lg:grid-cols-2 max-w-[400px] flex-[1_0_80%]">
                    {aboutMenuItems.map((item) => (
                      <Link
                        data-testid="panel-item"
                        key={item.name}
                        to={item.href}
                        prefetch={'intent'}
                        className="flex items-start p-2 px-4 py-4 mx-5 text-left transition duration-150 ease-in-out rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 group"
                      >
                        {/* ICON */}
                        <div className={`flex items-start justify-center flex-shrink-0 p-2 rounded-md bg-grey-100 transition-all duration-200 ${item.icon.bgClass}`}>
                          <div className='max-w-[24px] w-full'>
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

                  {/* SOCIAL MEDIA SIDEBAR */}
                  <div
                    data-testid="panel-sidbar"
                    className={`p-5 py-8 bg-[#f8f8f8] flex flex-col w-full self-stretch`}>
                    <p className='mb-3 text-[15px] font-bold text-left'>
                      Contact Us
                    </p>
                    <ul>

                      <li className=''>
                        <Link to={'/contact'} prefetch='intent' className='flex flex-row items-center py-2 text-sm text-[#6e6d7a] hover:text-[#0d0c22] group'>
                          <span className='w-full max-w-[14px] mr-2'>
                            <EmailSvg fill='currentColor' />
                          </span>
                          <span>
                            Email
                          </span>
                        </Link>
                      </li>

                      {socialKeys.map((item, index) => {

                        switch (item) {

                          case 'facebook':
                            return (
                              <li key={index} className=''>
                                <a
                                  href={social[item]}
                                  target='_blank'
                                  rel='noreferrer'
                                  className='flex flex-row items-center py-2 text-[15px] text-[#6e6d7a] hover:text-[#0d0c22] group'>
                                  <span className='w-full max-w-[16px] mr-2'>
                                    <FacebookSvg fill='currentColor' />
                                  </span>
                                  <span>
                                    Facebook
                                  </span>
                                </a>
                              </li>
                            )

                          case 'instagram':
                            return (
                              <li key={index} className=''>
                                <a
                                  href={social[item]}
                                  target='_blank'
                                  rel='noreferrer'
                                  className='flex flex-row items-center py-2 text-[15px] text-[#6e6d7a] hover:text-[#0d0c22] group'>
                                  <span className='w-full max-w-[16px] mr-2'>
                                    <InstagramSvg fill='currentColor' />
                                  </span>
                                  <span>
                                    Instagram
                                  </span>
                                </a>
                              </li>
                            )

                          case 'youtube':
                            return (
                              <li key={index} className=''>
                                <a
                                  href={social[item]}
                                  target='_blank'
                                  rel='noreferrer'
                                  className='flex flex-row items-center py-2 text-[15px] text-[#6e6d7a] hover:text-[#0d0c22] group'>
                                  <span className='w-full max-w-[16px] mr-2'>
                                    <YoutubeSvg fill='currentColor' />
                                  </span>
                                  <span>
                                    YouTube
                                  </span>
                                </a>
                              </li>
                            )
                        }

                      })}

                    </ul>
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
