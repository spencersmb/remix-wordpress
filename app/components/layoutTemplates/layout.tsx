import { classNames } from '@App/utils/appUtils';
import { navStyles } from '@App/utils/pageUtils';
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
  disableNavStyles?: boolean
}

export default function Layout({ children, alternateNav, disableNavStyles = false }: React.PropsWithChildren<{}> & ILayoutProps) {

  // min-h-fullBot was on main - not sure why 
  return (
    <>
      <main className={classNames(!disableNavStyles ? navStyles : '', 'remix-app__main-content flex flex-col ')}>
        {children}
      </main>
    </>
  );
}