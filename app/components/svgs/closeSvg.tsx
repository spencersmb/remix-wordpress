function CloseSvg(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      {...props}
      viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 10L10 30" strokeWidth={props.strokeWidth ? props.strokeWidth : '2'} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 10L30 30" strokeWidth={props.strokeWidth ? props.strokeWidth : '2'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
export default CloseSvg