function PPHalfBlockSvg(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 43 38" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="mask1_12307_12051" style={{
        maskType: 'alpha'
      }} maskUnits="userSpaceOnUse" x="0" y="0" width="43" height="38">
        <rect x="0.44751" y="0.03125" width="42.2702" height="37.9376" rx="2" />
      </mask>
      <g mask="url(#mask1_12307_12051)">
        <rect x="22.3171" y="23.6621" width="21.7062" height="15.0145" />
        <rect x="-0.85791" y="15.7805" width="21.7062" height="15.0145" />
        <rect x="22.3171" y="7.01538" width="21.7062" height="15.0145" />
        <rect x="-0.85791" y="-0.866211" width="21.7062" height="15.0145" />
      </g>
    </svg>

  )
}
export default PPHalfBlockSvg
