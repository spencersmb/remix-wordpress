function CloseSvg(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      {...props}
      viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 10L10 30" stroke="#5E4242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 10L30 30" stroke="#5E4242" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
export default CloseSvg