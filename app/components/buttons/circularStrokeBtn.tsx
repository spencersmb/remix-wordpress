import { Link } from "@remix-run/react"
import { motion } from "framer-motion"
interface Props {
  text: string
  classes?: string
  handleClick?: () => void
}

/**
 * Stroke Buttons
 * 
 * @tested - 5/27/2022
 * 
 * @param props 
 * @returns 
 */
function CircularStrokeBtn(props: Props) {
  const { text, classes, handleClick } = props
  return (
    <>
      <button data-testid="test-CircularStrokeBtn" onClick={handleClick} type='button' className={`font-semibold relative ${classes}`}>
        <div className="absolute w-[125px] top-0 left-0 ">
          <svg width="125" height="68" viewBox="0 0 125 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              className='stroke-warning-400'
              initial={{ pathLength: 1 }}
              whileHover={{ pathLength: [1, 0, 1] }}
              d="M57.9319 58.9502C76.7862 56.2722 94.1695 52.3416 109.875 43.2874C117.269 39.0246 128.654 29.7448 119.732 22.4936C99.657 6.17726 66.3149 -3.6447 39.0485 5.48052C19.2933 12.092 -3.29799 22.9461 3.1091 43.1974C6.96676 55.3905 27.5818 61.6363 40.5437 64.5763C53.7595 67.5739 67.5907 66.1617 80.8578 64.6213" stroke="#CDA7A7" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <span>{text}</span>
      </button>
    </>
  )
}

export default CircularStrokeBtn

export function CircularStrokeLink(props: Props & { href: string }) {
  const { href } = props
  return (
    <>
      <Link
        data-testid="test-CircularStrokeBtn"
        to={href} className={`relative group ${props.classes} `}>
        <div className="absolute top-[50%] left-[50%] w-full translate-x-[-50%] translate-y-[-50%]">
          <svg viewBox="0 0 125 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className='transition-all duration-300 stroke-warning-400 group-hover:stroke-grey-700'
              d="M57.9319 58.9502C76.7862 56.2722 94.1695 52.3416 109.875 43.2874C117.269 39.0246 128.654 29.7448 119.732 22.4936C99.657 6.17726 66.3149 -3.6447 39.0485 5.48052C19.2933 12.092 -3.29799 22.9461 3.1091 43.1974C6.96676 55.3905 27.5818 61.6363 40.5437 64.5763C53.7595 67.5739 67.5907 66.1617 80.8578 64.6213" stroke="#CDA7A7" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <span className={'relative z-10'}>{props.text}</span>
      </Link>
    </>
  )
}