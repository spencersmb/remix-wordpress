import { motion, useReducedMotion, useMotionValue, Variant } from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "remix";
import { cssColors } from "~/enums/colors";
import { ShopPlatformEnum } from '~/enums/products';
import useSite from '~/hooks/useSite';
import useTopNav from '~/hooks/useTopNav';
import { classNames } from '~/utils/appUtils';
import FooterPrimary from "../footer/FooterPrimary";
import Header from '../nav/header';
import { PrimaryNav } from "../nav/primaryNav";
import EveryTuesdayLogo from "../svgs/everyTuesdayLogo";
import HamburgerSvg from "../svgs/hamburger";
import SearchSvg from "../svgs/searchSvg";

interface ILayoutProps {
  alternateNav?: ReactNode
}

export default function Layout({ children, alternateNav }: React.PropsWithChildren<{}> & ILayoutProps) {

  return (
    <div className="flex flex-col min-h-fullBot">
      <Header alternateNav={alternateNav} />
      <div className="pt-[68px] laptop:pt-[89px]">
        <div className="remix-app__main-content">{children}</div>
      </div>
      <FooterPrimary />
    </div>
  );
}