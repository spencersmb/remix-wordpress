function PPHalfBrickSvg(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 44 31" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="mask0_12363_27723" style={{
        maskType: 'alpha'
      }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="31">
        <rect x="0.864746" y="0.269043" width="42.2702" height="29.8668" rx="2" />
      </mask>
      <g mask="url(#mask0_12363_27723)">
        <rect x="22.7344" y="16.0183" width="21.7062" height="15.0145" />
        <rect x="-0.440918" y="16.0183" width="21.7062" height="15.0145" />
        <rect x="11.147" y="-0.628418" width="21.7062" height="15.0145" />
      </g>
    </svg>
  )
}
export default PPHalfBrickSvg
