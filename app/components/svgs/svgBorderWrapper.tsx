interface Props {
  children?: React.ReactNode
  classes?: string
  width?: string
}

const SvgBorderIconWrapper = ({ children, classes, width }: Props) => {
  return (
    <div className={`locked_icon flex flex-col justify-center items-center border-[1px] border-neutral-400 rounded-lg p-2.5 ${classes}`}>
      <div className={width ? width : 'w-[30px]'}>
        {children}
      </div>
    </div>
  )
}

export default SvgBorderIconWrapper