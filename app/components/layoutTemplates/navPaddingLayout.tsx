import { classNames } from "@App/utils/appUtils";

interface ILayoutProps {
  bgColor?: string
}

// TODO:Test this
export default function NavPaddingLayout({ children, bgColor }: React.PropsWithChildren<{}> & ILayoutProps) {

  return (
    <main className={classNames(bgColor ? bgColor : '', 'relative z-2 pt-[var(--nav-top-sm)] laptop:pt-[var(--nav-top-lg)] remix-app__main-content')}>
      {children}
    </main>
  );
}