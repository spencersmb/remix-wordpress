import { motion, useReducedMotion, useMotionValue, Variant } from 'framer-motion'
import type { ReactNode } from "react";
import FooterPrimary from "../footer/FooterPrimary";
import Header from '../nav/header';
interface ILayoutProps {
  alternateNav?: ReactNode
  loadEcommerce?: boolean
}

export default function Layout({ children, alternateNav }: React.PropsWithChildren<{}> & ILayoutProps) {

  return (
    <div className="flex flex-col min-h-fullBot">
      <Header alternateNav={alternateNav} />
      <div className="pt-[68px] laptop:pt-[104px]">
        <div className="remix-app__main-content">{children}</div>
      </div>
      <FooterPrimary />
    </div>
  );
}