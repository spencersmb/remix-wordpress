import CheckCircleSvg from "@App/components/svgs/checkCircle"
import { classNames } from "@App/utils/appUtils"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid"
import { motion } from "framer-motion"

interface Props {
  message: string
  id: string
  className?: string
}

/**
 * 
 * @component FormSuccessMessage
 * @tested - 07/14/2022 
 */
const FormSuccessMessage = ({ message, id, className }: Props) => {
  return (
    <motion.div
      key={id}
      id={id}
      initial={containerMotion.closed}
      animate={containerMotion.open}
      exit={containerMotion.closed}
      role="alert"
      className={'overflow-hidden'}>
      <div
        className={classNames(className ? className : '', 'text-sage-800 bg-success-100 rounded-xl')}>
        <div className="flex flex-row items-center justify-center p-3 text-success-600">
          <div className="max-w-[24px] w-full mr-2">
            <CheckCircleIcon fill={'currentColor'} />
          </div>
          <p dangerouslySetInnerHTML={{ __html: message }} />
        </div>
      </div>

    </motion.div>
  )
}

export default FormSuccessMessage


const containerMotion = {
  closed: {
    height: 0,
    y: '-15%',
    transition: {
      height: {
        delay: .2
      }
    }
  },
  open: {
    height: 'auto',
    y: 0,
    transition: {
      height: {
        delay: .2
      }
    }
  }
}