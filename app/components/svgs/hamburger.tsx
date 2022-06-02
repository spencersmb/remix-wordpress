function HamburgerSvg(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 18 13"
      {...props}
    >
      <title>Hamburger Nav</title>
      <rect y="0.57143" width="18" height="1.71429" rx="0.857143"></rect>
      <rect y="5.92857" width="18" height="1.71429" rx="0.857143"></rect>
      <rect y="11.2857" width="18" height="1.71429" rx="0.857143"></rect>
    </svg>
  );
}

export default HamburgerSvg