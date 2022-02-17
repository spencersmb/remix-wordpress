interface Props { }

function GridSvg(props: Props) {

  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <path d="M21 14H14V21H21V14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14H3V21H10V14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 3H14V10H21V3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 3H3V10H10V3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  )
}

export default GridSvg
