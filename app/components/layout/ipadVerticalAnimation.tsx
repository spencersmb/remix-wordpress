import { motion, useTransform, useScroll } from 'framer-motion'
import React, { useRef } from 'react'
interface Props { }

function IpadVerticalAnimation(props: Props) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  })

  const scale = useTransform(scrollYProgress,
    [0, 0.5, 1], // scroll progress
    [0, 200, 400]) // css property

  return (
    <div className='flex justify-center grid-flow-row py-8 bg-slate-400 grid-cols-mobile gap-x-5 tablet:py-24 tablet:grid-cols-tablet tablet:gap-x-5 desktop:grid-cols-desktop'>
      TEST
      <motion.div
        ref={ref}
        className='w-[100px] h-[100px] bg-red-400 rounded-full'
        style={{ height: scale }}
      >
        BOX
      </motion.div>
    </div>
  )
}

export default IpadVerticalAnimation

