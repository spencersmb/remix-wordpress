import { classNames } from '@App/utils/appUtils';
import type { ReactNode } from "react";
import FooterPrimary from "../footer/FooterPrimary";
import BasicModal from '../modals/BasicModal';
import CommentModal from '../modals/commentModal';
import SearchModal from '../modals/searchModal';
import Header from '../nav/header';
import ContextLoader from './contextLoader';
import GlobalEvents from './globalHooks';
interface ILayoutProps {
  alternateNav?: ReactNode
  loadEcommerce?: boolean
  bgColor?: string
}

export default function Layout({ children, alternateNav, bgColor }: React.PropsWithChildren<{}> & ILayoutProps) {

  // min-h-fullBot was on main - not sure why 
  return (
    <>
      <ContextLoader>
        <GlobalEvents />
        <Header alternateNav={alternateNav} />
        <main className={classNames(bgColor ? bgColor : '', 'pt-[var(--nav-top-sm)] laptop:pt-[var(--nav-top-lg)] remix-app__main-content flex flex-col ')}>
          {children}
        </main>
        <FooterPrimary />
        <BasicModal />
        <CommentModal />
        <SearchModal />
      </ContextLoader>
    </>
  );
}