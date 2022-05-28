function CheckmarkSvg(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      aria-label="checkmark"
      viewBox="0 0 19 18" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M16.2142 3.92582C16.7924 4.41686 16.8645 5.28538 16.3753 5.86571L8.83244 14.8127C8.5847 15.1066 8.22569 15.2829 7.8425 15.2989C7.45931 15.3149 7.08695 15.1691 6.81576 14.8969L2.70149 10.7675C2.16591 10.23 2.16591 9.35846 2.70149 8.82092C3.23706 8.28338 4.1054 8.28338 4.64097 8.82092L7.70133 11.8925L14.2814 4.08748C14.7707 3.50715 15.636 3.43477 16.2142 3.92582Z" />
    </svg>

  )
}
export default CheckmarkSvg
