import Florals2 from "@App/components/svgs/florals/florals-2";
import { useOutsideAlerter } from "@App/hooks/popOverOutsideElementClick";
import useSite from "@App/hooks/useSite";
import { siteLoginUrls } from "@App/lib/wp/site";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { useState, useRef, useEffect } from "react";
import { Link, useTransition } from "remix";
import LinkItem from "./linkItem";

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
  const { state: { user } } = useSite()
  const transition = useTransition();
  const [visible, setVisible] = useState(false)
  const wrapperRef = useRef(null);
  const panelRef = useRef(null);

  // useEffect(() => {
  //   setVisible(true)
  // }, [])

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
                ${visible ? 'bg-sage-300 border-sage-300 border-[3px]' : 'bg-white border-sage-200 border-[3px] hover:bg-sage-100 hover:border-sage-300'} border-0  text-success-700 group px-4 pr-3 py-[13px] rounded-lg inline-flex items-center text-base font-semibold transition-all duration-300 desktop:ml-3`}
            // className={`
            //   ${visible ? 'bg-sage-300 hover:bg-sage-300 border-sage-300 hover:opacity-100' : 'bg-sage-200 border-white'} border-0  text-success-700 group px-4 pr-3 py-[13px] rounded-lg inline-flex items-center text-base font-semibold transition-all duration-300 desktop:ml-3`}
            >
              <span className='text-sm desktop:text-base'>Login</span>
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
              {visible && <div ref={panelRef} className="absolute z-10 w-screen max-w-sm mt-2 transform right-[-20px] sm:px-0 tablet:max-w-[750px]">
                <div className="relative overflow-hidden bg-white rounded-lg shadow-xxl-grey">

                  {/* INSERT SVG */}
                  <div className="absolute top-[-130px] left-[-20px] w-[250px] rotate-90">
                    <Florals2 />
                  </div>

                  <div className="relative grid grid-cols-2 gap-0 py-7 ">

                    <div className="flex flex-col justify-end pb-[14px] px-9 pl-11">
                      <div className="mb-5 text-4xl font-sentinel__SemiBoldItal">
                        Resources
                      </div>
                      <p className="text-grey-500">
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
