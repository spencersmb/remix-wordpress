import { motion, useReducedMotion, useMotionValue, Variant } from 'framer-motion'
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cssColors } from "@App/enums/colors";
import { ShopPlatformEnum } from '@App/enums/products';
import useSite from '@App/hooks/useSite';
import useTopNav from '@App/hooks/useTopNav';
import { classNames } from '@App/utils/appUtils';
import FooterPrimary from "../footer/FooterPrimary";
import Header from '../nav/header';
import { PrimaryNav } from "../nav/primaryNav";
import EveryTuesdayLogo from "../svgs/everyTuesdayLogo";
import HamburgerSvg from "../svgs/hamburger";
import SearchSvg from "../svgs/searchSvg";

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