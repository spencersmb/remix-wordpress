function SquiggleSvg(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 30 30" {...props} xmlns="http://www.w3.org/2000/svg">
      <path d="M5.1875 9.3625C6.0625 8.475 6.9375 7.675 7.325 7.8375C7.95 8.0875 7.325 9.125 6.95 9.7375C6.6375 10.2625 3.375 14.6 3.375 17.625C3.375 19.225 3.975 20.55 5.05 21.35C5.9875 22.05 7.225 22.2625 8.35 21.925C9.6875 21.5375 10.7875 20.175 12.175 18.4625C13.6875 16.6 15.7125 14.1625 17.275 14.1625C19.3125 14.1625 19.3375 15.425 19.475 16.4C14.75 17.2 12.75 20.9875 12.75 23.1125C12.75 25.2375 14.55 26.975 16.7625 26.975C18.8 26.975 22.125 25.3125 22.625 19.35H25.7V16.225H22.6125C22.425 14.1625 21.25 10.975 17.575 10.975C14.7625 10.975 12.35 13.3625 11.4 14.525C10.675 15.4375 8.825 17.625 8.5375 17.925C8.225 18.3 7.6875 18.975 7.15 18.975C6.5875 18.975 6.25 17.9375 6.7 16.575C7.1375 15.2125 8.45 13 9.0125 12.175C9.9875 10.75 10.6375 9.775 10.6375 8.075C10.6375 5.3625 8.5875 4.5 7.5 4.5C5.85 4.5 4.4125 5.75 4.1 6.0625C3.65 6.5125 3.275 6.8875 3 7.225L5.1875 9.3625ZM16.8 23.9375C16.4125 23.9375 15.875 23.6125 15.875 23.0375C15.875 22.2875 16.7875 20.2875 19.4625 19.5875C19.0875 22.95 17.675 23.9375 16.8 23.9375Z" />
    </svg>
  )
}
export default SquiggleSvg