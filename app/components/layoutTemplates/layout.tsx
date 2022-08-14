import { classNames } from '@App/utils/appUtils';
import { motion, useReducedMotion, useMotionValue, Variant } from 'framer-motion'
import type { ReactNode } from "react";
import FooterPrimary from "../footer/FooterPrimary";
import Header from '../nav/header';
interface ILayoutProps {
  alternateNav?: ReactNode
  loadEcommerce?: boolean
  bgColor?: string
}

export default function Layout({ children, alternateNav, bgColor }: React.PropsWithChildren<{}> & ILayoutProps) {

  return (
    <div className="flex flex-col min-h-fullBot">
      <Header alternateNav={alternateNav} />
      <main className={classNames(bgColor ? bgColor : '', 'pt-[var(--nav-top-sm)] laptop:pt-[var(--nav-top-lg)] remix-app__main-content')}>
        {children}
      </main>
      <FooterPrimary />
    </div>
  );
}