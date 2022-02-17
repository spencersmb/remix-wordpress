import { motion } from "framer-motion"
import { Link } from "remix"
interface Props {
  text: string
  classes?: string
  handleClick?: () => void
}
function CircularStrokeBtn(props: Props) {
  const { text, classes, handleClick } = props
  return (
    <>
      <button onClick={handleClick} type='button' className={`font-sentinel__SemiBoldItal relative ${classes}`}>
        <div className="absolute w-[121px] top-0 left-0 ">
          <svg
            width="125"
            height="65" viewBox="0 0 125 65" fill="transparent" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              className='stroke-warning-400'
              initial={{ pathLength: 1 }}
              whileHover={{ pathLength: [1, 0, 1] }}
              d="M57.9319 55.9975C76.7862 53.459 94.1695 49.7331 109.875 41.1504C117.269 37.1096 128.654 28.3132 119.732 21.4397C99.657 5.97312 66.3149 -3.33728 39.0485 5.31267C19.2933 11.5798 -3.29799 21.8686 3.1091 41.0651C6.96676 52.6232 27.5818 58.5437 40.5437 61.3305C53.7595 64.172 67.5907 62.8334 80.8578 61.3732" stroke="#CDA7A7" strokeWidth="3" strokeLinecap="round" />
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
      <Link to={href} className={`font-sentinel__SemiBoldItal relative ${props.classes}`}>
        <div className="absolute w-[121px] top-0 left-0 ">
          <svg
            width="125"
            height="65" viewBox="0 0 125 65" fill="transparent" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              className='stroke-warning-400'
              initial={{ pathLength: 1 }}
              whileHover={{ pathLength: [1, 0, 1] }}
              d="M57.9319 55.9975C76.7862 53.459 94.1695 49.7331 109.875 41.1504C117.269 37.1096 128.654 28.3132 119.732 21.4397C99.657 5.97312 66.3149 -3.33728 39.0485 5.31267C19.2933 11.5798 -3.29799 21.8686 3.1091 41.0651C6.96676 52.6232 27.5818 58.5437 40.5437 61.3305C53.7595 64.172 67.5907 62.8334 80.8578 61.3732" stroke="#CDA7A7" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
        <span>{props.text}</span>
      </Link>
    </>
  )
}