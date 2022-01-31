function BarChartSvg(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" {...props} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.99967 10C4.36786 10 4.66634 10.2985 4.66634 10.6667V13.3333C4.66634 13.7015 4.36786 14 3.99967 14C3.63148 14 3.33301 13.7015 3.33301 13.3333V10.6667C3.33301 10.2985 3.63148 10 3.99967 10Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M7.99967 6C8.36786 6 8.66634 6.29848 8.66634 6.66667V13.3333C8.66634 13.7015 8.36786 14 7.99967 14C7.63148 14 7.33301 13.7015 7.33301 13.3333V6.66667C7.33301 6.29848 7.63148 6 7.99967 6Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9997 2C12.3679 2 12.6663 2.29848 12.6663 2.66667V13.3333C12.6663 13.7015 12.3679 14 11.9997 14C11.6315 14 11.333 13.7015 11.333 13.3333V2.66667C11.333 2.29848 11.6315 2 11.9997 2Z" />
    </svg>
  )
}
export default BarChartSvg
