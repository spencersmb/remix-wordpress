import * as React from "react";
import {
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
import globalStylesUrl from "~/styles/global.css";
import darkStylesUrl from "~/styles/dark.css";
import useSite, { SiteContext } from './hooks/useSite'
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
} from './lib/utils/jsonLd'
import { ReactNode } from 'react'
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useTransition } from "remix";
import styles from "./styles/app.css";
import { getUserSession } from './utils/session.server'
import UseSiteProvider from './hooks/useSite/useSiteProvider'
import UseFetchPaginateProvider from './hooks/useFetchPagination/useFetchPaginateProvider'
import { IFetchPaginationState } from './hooks/useFetchPagination'
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
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: globalStylesUrl },
    {
      rel: "stylesheet",
      href: darkStylesUrl,
      media: "(prefers-color-scheme: dark)"
    },
    { rel: "stylesheet", href: deleteMeRemixStyles },
    { rel: "stylesheet", href: nProgressStyles },
  ];
};

export let loader: LoaderFunction = async ({request}) => {
  let session = await getUserSession(request)
  console.log('user', session.has('userId'))
  let user = session.has('userId') ? {
    id: session.get('userId')
  } : null
  let metadata = getWPMetadata(process.env.APP_ROOT_URL || 'no url found')
  // let metadata = getWPMetadata('http://localhost:3000')
  let ENV = {
    APP_ROOT_URL: process.env.APP_ROOT_URL,
    PUBLIC_WP_API_URL: process.env.PUBLIC_WP_API_URL,
  }
  console.log('ENV', ENV)

  return {
    ...getWPMenu(),
    metadata,
    user,
    ENV
  };
};

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
export default function App() {
  let {menus, metadata, user} = useLoaderData<any>();
  let matches = useMatches()
  let selectedMatch: undefined | ISelectedMatch = matches.find( match => match.data?.pageInfo )
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
    menu: menus,
    metadata,
    user
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
  let {metadata} = useLoaderData<any>();
  let matches = useMatches();
  let location = useLocation();
  let selectedMatch: undefined | ISelectedMatch = matches.find( match => match.data?.post || match.data?.page)
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

  if(post){
    image = {
      url: post.featuredImage?.sourceUrl  || '', // need default image
      altText: post.featuredImage?.altText || '',
      width: 1920,
      height:928
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

  if(page){}


  return (
    <>
      {/*Basic JsonLd Website*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLdWebsite(metadata)}} />

      {/*Basic JsonLd Image*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonldImageObject({
          pageUrl: location.pathname,
          image
        })}} />

      {/*Basic JsonLd Webpage*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonldWebpage(jsonWebpageSettings)}} />

      {/*Basic JsonLd Person*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonldPerson(metadata)}} />

      {/*Basic JsonLd Breadcrumbs*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonBreadcrumbsList({
          domain: metadata.domain,
          breadcrumbList
      })}} />

      {/*JsonLd Blog*/}
      {post && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonldBlog({
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
  return{
    title:`Home - Every Tuesday`
  }
}

interface IDocument {
  children: React.ReactNode
  title?: string
}
export function Document({children,title}: IDocument) {
  let data = useLoaderData<any>();
  // console.log('ENV', data)

  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
      <meta name="application-name" content="Every-Tuesday"/>
      <meta name="facebook-domain-verification" content="49a7ouvzn8x5uhb6gdmg2km5pnbfny"/>
      <meta name="norton-safeweb-site-verification" content="42o2xv441l6-j8hnbn5bc1wi76o7awsydx8s00-ad8jqokbtj2w3ylsaed7gk2tbd3o-tdzh62ynrlkpicf51voi7pfpa9j61f51405kq0t9z-v896p48l7nlqas6i4l"/>
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
    {data.ENV && <script
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
    </body>
    </html>
  );
}
export const PrimaryNav = () => {
  const {state: {menu, user}} = useSite()
  const primaryMenu = getPrimaryMenu(menu)
  console.log('user', user)

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

        {user && <li>
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
      <footer className="remix-app__footer">
        <div className="container remix-app__footer-content">
          <p>&copy; You!</p>
        </div>
      </footer>
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

function RemixLogo(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 659 165"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-labelledby="remix-run-logo-title"
      role="img"
      width="106"
      height="30"
      fill="currentColor"
      {...props}
    >
      <title id="remix-run-logo-title">Remix Logo</title>
      <path d="M0 161V136H45.5416C53.1486 136 54.8003 141.638 54.8003 145V161H0Z M133.85 124.16C135.3 142.762 135.3 151.482 135.3 161H92.2283C92.2283 158.927 92.2653 157.03 92.3028 155.107C92.4195 149.128 92.5411 142.894 91.5717 130.304C90.2905 111.872 82.3473 107.776 67.7419 107.776H54.8021H0V74.24H69.7918C88.2407 74.24 97.4651 68.632 97.4651 53.784C97.4651 40.728 88.2407 32.816 69.7918 32.816H0V0H77.4788C119.245 0 140 19.712 140 51.2C140 74.752 125.395 90.112 105.665 92.672C122.32 96 132.057 105.472 133.85 124.16Z" />
      <path d="M229.43 120.576C225.59 129.536 218.422 133.376 207.158 133.376C194.614 133.376 184.374 126.72 183.35 112.64H263.478V101.12C263.478 70.1437 243.254 44.0317 205.11 44.0317C169.526 44.0317 142.902 69.8877 142.902 105.984C142.902 142.336 169.014 164.352 205.622 164.352C235.83 164.352 256.822 149.76 262.71 123.648L229.43 120.576ZM183.862 92.6717C185.398 81.9197 191.286 73.7277 204.598 73.7277C216.886 73.7277 223.542 82.4317 224.054 92.6717H183.862Z" />
      <path d="M385.256 66.5597C380.392 53.2477 369.896 44.0317 349.672 44.0317C332.52 44.0317 320.232 51.7117 314.088 64.2557V47.1037H272.616V161.28H314.088V105.216C314.088 88.0638 318.952 76.7997 332.52 76.7997C345.064 76.7997 348.136 84.9917 348.136 100.608V161.28H389.608V105.216C389.608 88.0638 394.216 76.7997 408.04 76.7997C420.584 76.7997 423.4 84.9917 423.4 100.608V161.28H464.872V89.5997C464.872 65.7917 455.656 44.0317 424.168 44.0317C404.968 44.0317 391.4 53.7597 385.256 66.5597Z" />
      <path d="M478.436 47.104V161.28H519.908V47.104H478.436ZM478.18 36.352H520.164V0H478.18V36.352Z" />
      <path d="M654.54 47.1035H611.788L592.332 74.2395L573.388 47.1035H527.564L568.78 103.168L523.98 161.28H566.732L589.516 130.304L612.3 161.28H658.124L613.068 101.376L654.54 47.1035Z" />
    </svg>
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
