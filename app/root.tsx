import * as React from "react";
import {
  ActionFunction,
  json,
  Link,
  Links,
  LiveReload, LoaderFunction,
  Meta, MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch, useLoaderData,
  useLocation, useMatches
} from 'remix'
import type { LinksFunction } from "remix";

import deleteMeRemixStyles from "~/styles/demos/remix.css";
import globalStylesUrl from "~/styles/global-old.css";
import darkStylesUrl from "~/styles/dark.css";
import useSite, { SiteContext, siteInitialState } from './hooks/useSite'
import { defaultSeoImages, getWPMenu, getWPMetadata } from './lib/wp/site'
import { getPrimaryMenu } from './lib/wp/nav'
import { store } from './lib/redux/store'
import { Provider } from 'react-redux'
import { RouteData } from '@remix-run/react/routeData'
import {
  jsonBreadcrumbsList,
  jsonldBlog,
  jsonldImageObject,
  jsonldPerson,
  jsonldWebpage,
  jsonLdWebsite
} from './utils/jsonLd'
import { ReactNode, useEffect } from 'react'
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useTransition } from "remix";
import styles from "./styles/app.css";
import { getUserSession } from './utils/session.server'
import UseSiteProvider from './hooks/useSite/useSiteProvider'
import UseFetchPaginateProvider from './hooks/useFetchPagination/useFetchPaginateProvider'
import { IFetchPaginationState } from './hooks/useFetchPagination'
import { getResourceUserToken } from './utils/resourceLibrarySession.server'
import { consoleHelper } from './utils/windowUtils'
import BasicModal from './components/modals/BasicModal'
import { fetchAPI } from "./utils/fetch";
import { getGraphQLString } from "./utils/graphqlUtils";
import { GetAllFreebiesQuery } from "./lib/graphql/queries/resourceLibrary";
import RemixLogo from "./components/svgs/remixLogo";
import FooterPrimary from '~/components/footer/FooterPrimary'
import { commitSession, getSession } from '~/sessions.server'
import { validateEmail } from '~/utils/validation'
import { ckFormIds } from '~/lib/convertKit/formIds'
import { redirectBack } from 'remix-utils'
import NewsletterComponent from '~/components/newsletterComponent'
import NewsletterFetcher from '~/components/newsletterFetcher'
import CommentModal from '~/components/modals/commentModal'

/**
 * The `links` export is a function that returns an array of objects that map to
 * the attributes for an HTML `<link>` element. These will load `<link>` tags on
 * every route in the app, but individual routes can include their own links
 * that are automatically unloaded when a user navigates away from the route.
 *
 * https://remix.run/api/app#links
 */
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    {
      rel: "stylesheet",
      href: darkStylesUrl,
      media: "(prefers-color-scheme: dark)"
    },
    { rel: "stylesheet", href: deleteMeRemixStyles },
    { rel: "stylesheet", href: nProgressStyles },
    { rel: "stylesheet", href: styles },
  ];
};


/*
 Root Loader for the global App state
 */
export let loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(
    request.headers.get("Cookie")
  );
  let wpAdminSession = await getUserSession(request)
  const resourceUser = await getResourceUserToken(request)
  let wpAdminUser = wpAdminSession.has('userId') ? {
    id: wpAdminSession.get('userId')
  } : null

  // pass in the APP URL to see the correct urls on metaData
  let metadata = getWPMetadata(process.env.APP_ROOT_URL || 'no url found')

  // Variables to expose to the front end
  let ENV = {
    APP_ROOT_URL: process.env.APP_ROOT_URL,
    PUBLIC_WP_API_URL: process.env.PUBLIC_WP_API_URL,
  }
  // consoleHelper('Admin user', wpAdminSession.has('userId'))
  // consoleHelper('resourceUser', resourceUser)
  const ses = session.get("globalMessage")
  const message = ses || null;
  console.log('session message', message)

  return json({
    message,
    ...getWPMenu(resourceUser), // pass in resourceUser to show or hide logout button on resource member page
    metadata,
    user: {
      wpAdmin: Boolean(wpAdminUser),
      resourceUser: Boolean(resourceUser)
    },
    ENV,
   },
    {
      headers: {
        "Set-Cookie": await commitSession(session)
      },
    });
};

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
export default function App() {
  let { menus, metadata, user, message } = useLoaderData<any>();
  consoleHelper('user', user)
  console.log('message 2', message)
  let matches = useMatches()
  let selectedMatch: undefined | ISelectedMatch = matches.find(match => match.data?.pageInfo)
  const posts: IPost[] | null = selectedMatch ? selectedMatch?.data?.posts : null
  const pageInfo: IwpPageInfo = selectedMatch ? selectedMatch?.data?.pageInfo : null

  let defaultState: IFetchPaginationState | undefined = (posts && pageInfo) ? {
    page: 1,
    hasNextPage: pageInfo.hasNextPage,
    endCursor: pageInfo.endCursor,
    posts,
    loading: false
  } : undefined

  // https://sergiodxa.com/articles/use-nprogress-in-a-remix-app
  let transition = useTransition();
  React.useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (transition.state === "idle") NProgress.done();
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else NProgress.start();
  }, [transition.state]);
  const value = {
    ...siteInitialState,
    menu: menus,
    metadata,
    user,
  }
  return (
    // <Provider store={store}>
    <UseSiteProvider defaultState={value}>
      <UseFetchPaginateProvider defaultState={defaultState}>
        <Document>
          <Outlet />
        </Document>
      </UseFetchPaginateProvider>
    </UseSiteProvider>
    // </Provider>
  );
}

interface ISelectedMatch {
  pathname: string;
  params: import("react-router").Params<string>;
  data: RouteData;
  handle: any;
}

const JsonLd = () => {
  let data = useLoaderData<any>();
  if (!data) {
    return (
      <Scripts />
    )
  }
  let { metadata } = data
  let matches = useMatches();
  let location = useLocation();
  let selectedMatch: undefined | ISelectedMatch = matches.find(match => match.data?.post || match.data?.page)
  const post: IPost | null = selectedMatch ? selectedMatch?.data?.post : null
  const page: any = selectedMatch?.data?.page
  const breadcrumbList = [
    {
      position: 1,
      name: "Home",
      item: metadata.domain,
    }
  ]
  let image = defaultSeoImages.generic
  let jsonWebpageSettings: IjsonldWebpage = {
    title: metadata.title,
    domain: metadata.domain,
    description: metadata.description,
    pageUrl: `${metadata.domain}${location.pathname}`,
  }

  if (post) {
    image = {
      url: post.featuredImage?.sourceUrl || '', // need default image
      altText: post.featuredImage?.altText || '',
      width: 1920,
      height: 928
    }
    jsonWebpageSettings = {
      ...jsonWebpageSettings,
      title: post.seo.title,
      publishTime: post.seo.opengraphPublishedTime,
      modifiedTime: post.seo.opengraphModifiedTime,
      description: post.seo.metaDesc,
    }
    breadcrumbList.push(
      {
        position: 2,
        name: `${post.title}`,
        item: `${metadata.domain}${location.pathname}`
      }
    )
  }

  if (page) { }


  return (
    <>
      {/*Basic JsonLd Website*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdWebsite(metadata) }} />

      {/*Basic JsonLd Image*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: jsonldImageObject({
          pageUrl: location.pathname,
          image
        })
      }} />

      {/*Basic JsonLd Webpage*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonldWebpage(jsonWebpageSettings) }} />

      {/*Basic JsonLd Person*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonldPerson(metadata) }} />

      {/*Basic JsonLd Breadcrumbs*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: jsonBreadcrumbsList({
          domain: metadata.domain,
          breadcrumbList
        })
      }} />

      {/*JsonLd Blog*/}
      {post && <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: jsonldBlog({
          url: `${metadata.domain}${location.pathname}`,
          images: [
            `${post.featuredImage?.sourceUrl}` // need default image
          ],
          datePublished: post.seo.opengraphPublishedTime,
          dateModified: post.seo.opengraphModifiedTime,
          author: post.author.name,
          description: post.seo.metaDesc,
          title: post.seo.title,
        })
      }} />}

    </>
  )
}

export let meta: MetaFunction = () => {
  return {
    title: `Home - Every Tuesday`
  }
}
const Toastr = (props: any) => {
  return (
    <div>props.message</div>
  )
}
interface IDocument {
  children: React.ReactNode
  title?: string
}
export function Document({ children, title }: IDocument) {
  let data = useLoaderData<any>();
  const {openModal} = useSite()
  console.log('ENV', data)
  useEffect(()=>{
    if(data.message){
      openModal({
        template: <Toastr message={data.message} />
      })
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="application-name" content="Every-Tuesday" />
        <meta name="facebook-domain-verification" content="49a7ouvzn8x5uhb6gdmg2km5pnbfny" />
        <meta name="norton-safeweb-site-verification" content="42o2xv441l6-j8hnbn5bc1wi76o7awsydx8s00-ad8jqokbtj2w3ylsaed7gk2tbd3o-tdzh62ynrlkpicf51voi7pfpa9j61f51405kq0t9z-v896p48l7nlqas6i4l" />
        {/*<title>{`Home - ${metadata.title}`}</title>*/}
        <link rel="preload" href="/fonts/sentinel/Sentinel-SemiboldItal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <Meta />
        <Links />
        <JsonLd />
      </head>
      <body>
        {children}
        <RouteChangeAnnouncement />
        <ScrollRestoration />
        <Scripts />
        {data && data.ENV && <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
              data.ENV
              // {
              //   PUBLIC_WP_API_URL: 'https://etheadless.local/graphql/',
              //   APP_ROOT_URL: 'http://localhost:3000'
              // }
            )}`
          }}
        />}
        {process.env.NODE_ENV === "development" && <LiveReload />}
        <BasicModal />
        <CommentModal />
      </body>
    </html>
  );
}
export const PrimaryNav = () => {
  const { state: { menu, user } } = useSite()
  const primaryMenu = getPrimaryMenu(menu)

  return (
    <nav aria-label="Main navigation" className="remix-app__header-nav">
      <ul>
        {primaryMenu.map((menuItem) => {
          return (
            <li key={menuItem.id}>
              <Link to={menuItem.path}>{menuItem.label}</Link>
            </li>
          )
          // return <NavMenuItem key={menuItem.id} dropDownClassNames={styles.navSubMenu} item={menuItem} />;
        })}

        {user?.wpAdmin && <li>
          <form action="/logout" method="post">
            <button type="submit" className="button">
              Logout
            </button>
          </form>
        </li>}

      </ul>
    </nav>
  )
}
interface ILayoutProps {
  alternateNav?: ReactNode
}

export function Layout({ children, alternateNav }: React.PropsWithChildren<{}> & ILayoutProps) {
  return (
    <div className="remix-app">
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <Link to="/" title="Remix" prefetch="intent" className="remix-app__header-home-link">
            <RemixLogo />
          </Link>
          {alternateNav ? alternateNav : <PrimaryNav />}
        </div>
      </header>
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>
      <FooterPrimary />
    </div>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

/**
 * Provides an alert for screen reader users when the route changes.
 */
const RouteChangeAnnouncement = React.memo(() => {
  let [hydrated, setHydrated] = React.useState(false);
  let [innerHtml, setInnerHtml] = React.useState("");
  let location = useLocation();

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  let firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    // Skip the first render because we don't want an announcement on the
    // initial page load.
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    let pageTitle = location.pathname === "/" ? "Home page" : document.title;
    setInnerHtml(`Navigated to ${pageTitle}`);
  }, [location.pathname]);

  // Render nothing on the server. The live region provides no value unless
  // scripts are loaded and the browser takes over normal routing.
  if (!hydrated) {
    return null;
  }

  return (
    <div
      aria-live="assertive"
      aria-atomic
      id="route-change-region"
      style={{
        border: "0",
        clipPath: "inset(100%)",
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: "0",
        position: "absolute",
        width: "1px",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      }}
    >
      {innerHtml}
    </div>
  );
});
