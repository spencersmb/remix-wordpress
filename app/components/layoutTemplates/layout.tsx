import { SEARCH_STATE_ENUMS } from '@App/enums/searchEnums';
import { fetchInitialState } from '@App/hooks/useFetchPagination';
import UseFetchPaginateProvider from '@App/hooks/useFetchPagination/useFetchPaginateProvider';
import { useMatchesLookup } from '@App/hooks/useMatchesLookup';
import { siteSearchState } from '@App/hooks/useSearch';
import UseSearchProvider from '@App/hooks/useSearch/useSearchProvider';
import { siteInitialState } from '@App/hooks/useSite';
import UseSiteProvider from '@App/hooks/useSite/useSiteProvider';
import { classNames } from '@App/utils/appUtils';
import { Link, useMatches } from '@remix-run/react';
import { motion, useReducedMotion, useMotionValue, Variant } from 'framer-motion'
import type { ReactNode } from "react";
import FooterPrimary from "../footer/FooterPrimary";
import BasicModal from '../modals/BasicModal';
import CommentModal from '../modals/commentModal';
import SearchModal from '../modals/searchModal';
import Header from '../nav/header';
import ContextLoader from './contextLoader';
interface ILayoutProps {
  alternateNav?: ReactNode
  loadEcommerce?: boolean
  bgColor?: string
}

export default function Layout({ children, alternateNav, bgColor }: React.PropsWithChildren<{}> & ILayoutProps) {
  const data = useMatchesLookup('/')
  if (!data) {
    throw new Error('No data found for route')
  }
  const { menus, metadata, user, searchData } = data

  const value = {
    ...siteInitialState,
    menu: menus,
    metadata, // merge from Server-side Metadata response from WP
    user,
  }
  return (
    <>
      <UseSiteProvider defaultState={value}>
        <UseSearchProvider defaultState={{
          ...siteSearchState,
          status: !searchData ? SEARCH_STATE_ENUMS.ERROR : SEARCH_STATE_ENUMS.LOADED,
          data: searchData,
          // client,
        }}>
          <UseFetchPaginateProvider defaultState={fetchInitialState}>
            <ContextLoader>
              <Header alternateNav={alternateNav} />
              <main className={classNames(bgColor ? bgColor : '', 'pt-[var(--nav-top-sm)] laptop:pt-[var(--nav-top-lg)] remix-app__main-content flex flex-col min-h-fullBot')}>
                {children}
              </main>
              <FooterPrimary />
              <BasicModal />
              <CommentModal />
              <SearchModal />
            </ContextLoader>
          </UseFetchPaginateProvider>
        </UseSearchProvider>
      </UseSiteProvider>
    </>
  );
}