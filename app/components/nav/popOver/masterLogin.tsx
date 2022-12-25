import Florals2 from "@App/components/svgs/florals/florals-2";
import { useOutsideAlerter } from "@App/hooks/popOverOutsideElementClick";
import { siteLoginUrls } from "@App/lib/wp/site";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useRef } from "react";
import { Link, useLocation } from "@remix-run/react";
import LinkItem from "./linkItem";
import { useVisibleOnPageTransition } from "@App/hooks/windowUtilHooks";
import FloralBouquet26Svg from "@App/components/svgs/florals/floral-bouquet-26";

const menuItems = [
  {
    title: "Tuesday Makers",
    description: "Login to access the free downloads Resource LIbrary.",
    externalLink: false,
    url: siteLoginUrls.tuesdayMakers,
  },
  {
    title: "Teach:able",
    description: "Login to access the courses you’ve enrolled in our school.",
    externalLink: true,
    url: siteLoginUrls.teachable,
  },
  {
    title: "Gumroad",
    description: "Login to access your digital product purchases & downloads.",
    externalLink: true,
    url: siteLoginUrls.gumroad,
  }
]

export default function MasterLoginPopOver() {
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);
  const location = useLocation()
  const isTuesdayMakersPage = location.pathname === '/tuesday-makers'

  // IF PAGE IS TRANSITIONING, CLOSE THE PANEL
  const { setVisible, visible } = useVisibleOnPageTransition()

  useOutsideAlerter(wrapperRef, panelRef, () => {
    setVisible(false)
  });

  const handleButtonClick = () => {
    setVisible(!visible)
  }

  return (
    <div className="mx-2 text-sm normal-links laptop:font-medium desktop:text-base">
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
                    ? 'text-sage-50 bg-emerald-500 border-emerald-500'
                    : 'bg-transparent text-sage-50 border-emerald-400  hover:bg-emerald-500 hover:border-emerald-500'
                  : visible
                    ? 'active'
                    : ''}
                group px-4 pr-3 py-[13px] border-[3px] nav-btn desktop:ml-3`}
            // className={`
            //   ${visible ? 'bg-sage-300 hover:bg-sage-300 border-sage-300 hover:opacity-100' : 'bg-sage-200 border-white'} border-0  text-success-700 group px-4 pr-3 py-[13px] rounded-lg inline-flex items-center text-base font-semibold transition-all duration-300 desktop:ml-3`}
            >
              <span className='text-sm desktop:text-base'>Login</span>
              <ChevronDownIcon
                className={`${visible ? 'active' : ''}
                ${isTuesdayMakersPage
                    ? 'text-sage-50'
                    : 'chevron-down'}
                  ml-1 h-5 w-5`}
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
              {visible && <div ref={panelRef} className="absolute z-10 w-screen max-w-sm mt-2 transform right-[-20px] sm:px-0 tablet:max-w-[750px]">
                <div className="relative overflow-hidden bg-white rounded-lg shadow-xxl-grey">

                  {/* INSERT SVG */}
                  <div className="absolute top-[-210px] left-[-10px] w-[320px] rotate-[-130deg]">
                    {/* <Florals2 /> */}
                    <FloralBouquet26Svg />
                  </div>

                  <div className="relative grid grid-cols-2 gap-0 py-7 ">

                    <div className="flex flex-col justify-end pb-[14px] px-9 pl-11">
                      <div className="mb-3 text-4xl font-sentinel__SemiBoldItal">
                        Resources
                      </div>
                      <p className="text-grey-700">
                        We use several solutions to help deliver a great experience on the web. Access  your content by selecting one of the options.
                      </p>
                    </div>

                    <div className="pr-11">
                      {menuItems.map((item, i) => {

                        if (item.externalLink) {

                          return (
                            <a
                              href={item.url}
                              key={i}
                              target={'_blank'}
                              rel={'noreferrer noopener'}>
                              <LinkItem {...item} />
                            </a>
                          )

                        } else {
                          return (
                            <Link key={i} to={item.url} prefetch={'intent'}>
                              <LinkItem {...item} />
                            </Link>
                          )
                        }

                      })}
                    </div>

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
