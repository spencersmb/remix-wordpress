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
      <div className={classNames(bgColor ? bgColor : '', 'pt-[68px] laptop:pt-[96px]')}>
        <div className="remix-app__main-content">{children}</div>
      </div>
      <FooterPrimary />
    </div>
  );
}