import { XCircleIcon } from "@heroicons/react/solid"
import { motion } from "framer-motion"

interface Props {
  message: string
  id: string
}
// TODO: Test this component
const FormErrorMessage = ({ message, id }: Props) => {
  return (
    <motion.div
      key={id}
      id={id}
      initial={containerMotion.closed}
      animate={containerMotion.open}
      exit={containerMotion.closed}
      role="alert"
      className="overflow-hidden text-red-800 bg-red-200 rounded-xl">
      <div className="flex flex-row items-center justify-center p-3 ">
        <div className="max-w-[24px] w-full mr-2">
          <XCircleIcon fill={'#7F1D1D'} />
        </div>
        <p dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    </motion.div>
  )
}

export default FormErrorMessage


const containerMotion = {
  closed: {
    height: 0,
    y: '-15%'
  },
  open: {
    height: 'auto',
    y: 0
  }
}