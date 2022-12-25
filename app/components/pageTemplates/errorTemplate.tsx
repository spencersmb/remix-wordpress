import { Link, Links, Meta, Scripts } from '@remix-run/react';
import React from 'react'
import FooterPrimary from '../footer/FooterPrimary';
import ContextLoader from '../layoutTemplates/contextLoader';
import GlobalEvents from '../layoutTemplates/globalHooks';
import BasicModal from '../modals/BasicModal';
import SearchModal from '../modals/searchModal';
import Header from '../nav/header';

interface Props {
  error?: any | undefined
}

function ErrorTemplate(props: Props) {
  const { error } = props

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ContextLoader>
          <GlobalEvents />
          <Header />
          <main className={'pt-[var(--nav-top-sm)] laptop:pt-[var(--nav-top-lg)] remix-app__main-content flex flex-col '}>
            <div className="h-[100vh] bg-sage-100 justify-center items-center flex">
              <div>
                <div>
                  This is awkward. Something went wrong.
                </div>
                <div>
                  {error && error.message}
                </div>
                <div>
                  <Link
                    className="btn btn-lg btn-primary"
                    to={'/'}>Home</Link>
                </div>
              </div>
            </div>
          </main>
          <FooterPrimary />
          <BasicModal />
          <SearchModal />
        </ContextLoader>
        <Scripts />
      </body>
    </html>
  );
}

export default ErrorTemplate
