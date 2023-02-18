function PPHalfBrickSvg(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg width="56" height="31" viewBox="0 0 56 31" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="mask3_12307_12058" style={{
        maskType: 'alpha'
      }} maskUnits="userSpaceOnUse" x="0" y="0" width="56" height="31">
        <rect width="54.7563" height="30.4899" rx="2" transform="matrix(-1 0 0 1 55.3594 0.03125)" />
      </mask>
      <g mask="url(#mask3_12307_12058)">
        <rect width="21.7062" height="15.0145" transform="matrix(-1 0 0 1 33.4897 15.7805)" />
        <rect width="21.7062" height="15.0145" transform="matrix(-1 0 0 1 56.6648 15.7805)" />
        <rect width="21.7062" height="15.0145" transform="matrix(-1 0 0 1 21.6975 -0.865967)" />
        <rect width="21.7062" height="15.0145" transform="matrix(-1 0 0 1 44.8726 -0.866211)" />
      </g>
    </svg>


  )
}
export default PPHalfBrickSvg
