function StarSvg(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M15 2.5L18.8625 10.325L27.5 11.5875L21.25 17.675L22.725 26.275L15 22.2125L7.275 26.275L8.75 17.675L2.5 11.5875L11.1375 10.325L15 2.5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
export default StarSvg
