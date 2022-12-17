import { useMatchesLookup } from '@App/hooks/useMatchesLookup'
import { consoleHelper } from '@App/utils/windowUtils'
import { Links, Meta, Scripts, useLocation, useMatches } from '@remix-run/react'
import FooterPrimary from '../footer/FooterPrimary'
import ContextLoader from '../layoutTemplates/contextLoader'
import GlobalEvents from '../layoutTemplates/globalHooks'
import BasicModal from '../modals/BasicModal'
import SearchModal from '../modals/searchModal'
import Header from '../nav/header'

interface IMetaTagsProps {
  pathName: string
  domain: string
}

const MetaTags = (props: IMetaTagsProps) => {
  const { pathName, domain = 'local.co' } = props
  return (
    <>
      <meta name="robots" content="noindex,nofollow"></meta>
      <meta name="canonical" content={`${domain}${pathName}`}></meta>
      <meta name="og:locale" content="en_US"></meta>
      <meta name="og:title" content="test"></meta>
      <meta name="og:site_name" content={`Every-tuesday.com`}></meta>
      <meta name="og:website" content="website"></meta>
      <meta name="og:description" content="test desc"></meta>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;display=swap" rel="stylesheet" />
      <link rel="preload" href="/fonts/sentinel/Sentinel-SemiboldItal.woff2" as="font" type="font/woff2" crossOrigin="anonymous"></link>
    </>
  )
}

export default function NotFoundTemplate() {
  const location = useLocation()
  const rootMetadata = useMatchesLookup('/')
  consoleHelper('matches', rootMetadata, '404Template.tsx')
  return (
    <html>
      <head>
        <Meta />
        <Links />
        {/* <MetaTags domain={rootMetadata?.ENV.APP_ROOT_URL} pathName={location.pathname} /> */}
      </head>
      <body>
        <ContextLoader>
          <GlobalEvents />
          <Header />
          <main className={'pt-[var(--nav-top-sm)] laptop:pt-[var(--nav-top-lg)] remix-app__main-content flex flex-col '}>
            <h1>CUSTOM 404</h1>
          </main>
          <FooterPrimary />
          <BasicModal />
        </ContextLoader>
        <Scripts />
      </body>
    </html>
  )
}
