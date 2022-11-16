import { classNames } from '@App/utils/appUtils';
import { Link } from '@remix-run/react';
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
      {/* <Header alternateNav={alternateNav} /> */}
      <Link
        className="transition-opacity duration-300 p-[11px] desktop:p-[13px] text-sm desktop:text-base desktop:px-4"
        to={'/products'}
        prefetch="intent">PRODUCTS</Link>
      <Link
        className="transition-opacity duration-300 p-[11px] desktop:p-[13px] text-sm desktop:text-base desktop:px-4"
        to={'/courses'}
        prefetch="intent">COURSES</Link>
      <Link
        className="transition-opacity duration-300 p-[11px] desktop:p-[13px] text-sm desktop:text-base desktop:px-4"
        to={'/blog'}
        prefetch="intent">BLOG</Link>
      <main className={classNames(bgColor ? bgColor : '', 'pt-[var(--nav-top-sm)] laptop:pt-[var(--nav-top-lg)] remix-app__main-content')}>
        {children}
      </main>
      {/* <FooterPrimary /> */}
    </div>
  );
}