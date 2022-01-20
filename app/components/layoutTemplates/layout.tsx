import { ReactNode } from "react";
import { Link } from "remix";
import { cssColors } from "~/enums/colors";
import FooterPrimary from "../footer/FooterPrimary";
import { PrimaryNav } from "../nav/primaryNav";
import EveryTuesdayLogo from "../svgs/everyTuesdayLogo";
import HamburgerSvg from "../svgs/hamburger";
import RemixLogo from "../svgs/remixLogo";
import SearchSvg from "../svgs/searchSvg";

interface ILayoutProps {
  alternateNav?: ReactNode
}

export default function Layout({ children, alternateNav }: React.PropsWithChildren<{}> & ILayoutProps) {
  return (
    <div className="flex flex-col min-h-fullBot">
      <header className="bg-white fixed top-0 left-0 w-full z-10 flex">
        <nav aria-label="Main navigation" className="w-full grid my-2 mx-5 items-center grid-cols-navMobile laptop:my-4 laptop:grid-cols-navDesktop">

          {/* ET LOGO */}
          <div data-testid="logo" className="max-w-[144px] desktop:max-w-[220px]">
            <Link to="/" title="EveryTuesday" prefetch="intent" className="">
              <EveryTuesdayLogo fill={`var(${cssColors.primaryPlum700})`} />
            </Link>
          </div>

          {/* HAMBURGER / SEARCH ICON FOR MOBILE */}
          <div data-testid="search-mobile" className="flex justify-center px-2 py-4 laptop:hidden">
            <div className="max-w-[20px]">
              <SearchSvg fill={`var(${cssColors.primaryPlum700})`} />
            </div>
          </div>
          <div data-testid="hamburger" className="flex justify-center px-2 py-4 laptop:hidden">
            <div className="max-w-[20px]">
              <HamburgerSvg fill={`var(${cssColors.primaryPlum700})`} />
            </div>
          </div>

          {/* PRIMARY NAV */}
          {alternateNav ? alternateNav : <PrimaryNav />}

          {/* DESKTOP SEARCH AND COURSE LOGIN */}
          <div data-testid="desktop-col-3" className="hidden items-center justify-end laptop:flex">
            <div className="">
              <a className={'btn-underlined text-primary-600 mr-4'} href="/">Course Login</a>
            </div>
            <div className="bg-primary-700 borde rounded-full">
              <div className="w-[20px] h-[20px] m-3">
                <SearchSvg fill={'#ffffff'} />
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="pt-[68] laptop:pt-[89px]">
        <div className="container remix-app__main-content">{children}</div>
      </div>
      <FooterPrimary />
    </div>
  );
}