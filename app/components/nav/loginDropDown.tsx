import { motion } from 'framer-motion'
import React from 'react'

interface Props {
}
// TODO: TEST THIS
function LoginDropDown(props: Props) {
  const [open, setIsOpen] = React.useState(false)
  const handleClick = () => setIsOpen(!open)
  return (
    <div onClick={handleClick} className="px-6 py-4 text-white bg-sage-600">
      <div className='flex flex-row'>
        <div className='flex-1 text-lg font-semibold'>
          Login
        </div>
        <div>
          carrot
        </div>
      </div>

      <motion.div
        variants={variants}
        animate={open ? "visible" : "hidden"}
        className="overflow-hidden">
        Hidden content
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
export default LoginDropDown
