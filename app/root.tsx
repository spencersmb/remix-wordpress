import * as React from "react";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import deleteMeRemixStyles from "@App/styles/demos/remix.css";
import globalStylesUrl from "@App/styles/global-old.css";
import darkStylesUrl from "@App/styles/dark.css";
import { createSiteMetaData, getDynamicSiteMetadata, getWPMenu } from './lib/wp/site'
// import NProgress from "nprogress";
// import nProgressStyles from "nprogress/nprogress.css";
import styles from "./styles/app.css";
import { getUserSession } from './utils/session.server'
import { getResourceUser } from './utils/resourceLibrarySession.server'
import { consoleColors, consoleHelper } from './utils/windowUtils'
import { commitSession, getSession } from '@App/sessions.server'
import JsonLd from "./components/seo/jsonLd";
import type { IRootData } from "./interfaces/global";
import 'lazysizes';
import { getSearchData } from "./lib/search/searchApi";
import NotFoundTemplate from "./components/pageTemplates/404Template";
import ContextLoader from "./components/layoutTemplates/contextLoader";
import GlobalEvents from "./components/layoutTemplates/globalHooks";
import Header from "./components/nav/header";
import FooterPrimary from "./components/footer/FooterPrimary";
import BasicModal from "./components/modals/BasicModal";
import CommentModal from "./components/modals/commentModal";
import SearchModal from "./components/modals/searchModal";
import { ShopPlatformEnum } from "./enums/products";
import { withSentry } from "@sentry/remix";
import { useLoginOtherTabs } from "./hooks/windowUtilHooks";
import CustomScripts from "./components/layout/customScripts";
import ErrorTemplate from "./components/pageTemplates/errorTemplate";
import dropZoneStyles from 'react-dropzone-uploader/dist/styles.css'

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

    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com"
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com", crossOrigin: "anonymous"
    },
    {
      rel: "preload",
      as: "font",
      type: "font/woff2",
      href: "/fonts/sentinel/Sentinel-SemiboldItal.woff2", crossOrigin: "anonymous"
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
    },
    { rel: "stylesheet", href: globalStylesUrl },
    {
      rel: "stylesheet",
      href: darkStylesUrl,
      media: "(prefers-color-scheme: dark)"
    },
    { rel: "stylesheet", href: deleteMeRemixStyles },
    // { rel: "stylesheet", href: nProgressStyles },
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: dropZoneStyles },
  ];
};

/*
 Root Loader for the global App state
 */
export let loader: LoaderFunction = async ({ request }) => {
  // Variables to expose to the front end
  const url = new URL(request.url);

  let ENV = {
    APP_ROOT_URL: process.env.APP_ROOT_URL,
    // Alternate way of setting the APP_ROOT_URL
    // APP_ROOT_URL: 'https://api.every-tuesday.com', // now its dynamic
    // fetch.server.ts 
    // APP_ROOT_URL: url.origin, // now its dynamic
    // APP_ROOT_URL: "http://localhost:3000",
    // PUBLIC_WP_API_URL: 'https://api.every-tuesday.com/graphql',
    PUBLIC_WP_API_URL: process.env.PUBLIC_WP_API_URL,
    // PUBLIC_WP_API_URL: "https://etheadless.local/graphql/",
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  }
  const customHeaders = new Headers()
  // Used for session message storage
  const session = await getSession(
    request.headers.get("Cookie")
  );

  let wpAdminSession = await getUserSession(request)
  const resourceUser = await getResourceUser(request)

  // TOOD: REMOVE SHOPIFY
  // check for cart Cookie and make api queries to get cart
  // const shopifyCart = await getUserCart(request)

  // if it's a new cart, set a new cookie with a new ID
  // if (shopifyCart?.newCart) {
  //   customHeaders.append('Set-Cookie', await shopifyCartCookie.serialize({
  //     cartId: shopifyCart.cart?.cartId
  //   }, {
  // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
  //}))
  // }

  let wpAdminUser = wpAdminSession.has('userId') ? {
    id: wpAdminSession.get('userId')
  } : null

  // pass in the APP URL to see the correct urls on metaData
  // async function that also returns dynamic metaData from WP
  if (!process.env.APP_ROOT_URL) {
    throw new Error('APP_ROOT_URL is not set')
  }
  let metadata = createSiteMetaData(process.env.APP_ROOT_URL)

  // // consoleHelper('Admin user', wpAdminSession.has('userId'))
  // // consoleHelper('resourceUser', resourceUser)
  // const ses = session.get("globalMessage")
  // const message = ses || null;
  // // consoleHelper('session message', message, '/root')
  // consoleHelper('resourceUser', resourceUser, '/root', { bg: consoleColors.purple, text: '#fff' });

  customHeaders.append('Set-Cookie', await commitSession(session))
  // set header cache control
  // customHeaders.append("Cache-Control", `public, max-age=${900}, stale-while-revalidate`)

  //
  let searchData
  let dynamicMetaData = {}

  try {
    searchData = await getSearchData(url.origin);
    // dynamicMetaData = await getDynamicSiteMetadata()
  } catch (e: any) {
    searchData = null
  }

  return json({
    // message,
    ...getWPMenu(resourceUser), // pass in resourceUser to show or hide logout button on resource member page
    metadata: {
      ...metadata,
      ...dynamicMetaData
    },
    user: {
      wpAdmin: Boolean(wpAdminUser),
      resourceUser: resourceUser
    },
    // cart: shopifyCart.cart,
    ENV,
    searchData
  },
    {
      headers: customHeaders
    }
  );
};


/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
export default withSentry(function App() {
  let { menus, user, metadata, message, cart, searchData } = useLoaderData<IRootData>();
  consoleHelper('user', user, '/root', { bg: consoleColors.purple, text: '#fff' })

  // let defaultCart: IShopifyCart = {
  //   ...cart,
  //   isOpen: false,
  // }

  // https://sergiodxa.com/articles/use-nprogress-in-a-remix-app
  // let transition = useTransition();
  // React.useEffect(() => {
  //   // when the state is idle then we can to complete the progress bar
  //   if (transition.state === "idle") NProgress.done();
  //   // and when it's something else it means it's either submitting a form or
  //   // waiting for the loaders of the next location so we start it
  //   else NProgress.start();
  // }, [transition.state]);

  // Window localStorage listener to refresh tabs if User Logs In/Out
  useLoginOtherTabs()

  return (

    <Document>

      <Outlet />

    </Document>
  );

  // return (
  //   <html lang="en">
  //     <head>
  //       <Meta />
  //       <Links />
  //     </head>
  //     <body>
  //       <Header />
  //       <Outlet />
  //       <ScrollRestoration />
  //       <Scripts />
  //       <LiveReload />
  //       <script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>
  //       {metadata?.serverSettings.productPlatform === ShopPlatformEnum.GUMROAD && <script id='remix-gumroad-script' async src="https://gumroad.every-tuesday.com/js/gumroad.js" />}
  //     </body>
  //   </html>
  // )
}, {
  wrapWithErrorBoundary: true,
  errorBoundaryOptions: {
    fallback: <ErrorTemplate />
  }
});
interface IDocument {
  children: React.ReactNode
  title?: string
}

export function meta({ data, matches, parentsData }: any) {
  const metadata = data?.metadata

  const defaultMeta = [
    {
      property: "charSet",
      content: "utf-8",
    },
    {
      httpEquiv: "Content-Type",
      content: "text/html; charset=utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
    {
      name: "norton-safeweb-site-verification",
      content: "42o2xv441l6-j8hnbn5bc1wi76o7awsydx8s00-ad8jqokbtj2w3ylsaed7gk2tbd3o-tdzh62ynrlkpicf51voi7pfpa9j61f51405kq0t9z-v896p48l7nlqas6i4l",
    },
    {
      name: "facebook-domain-verification",
      content: "49a7ouvzn8x5uhb6gdmg2km5pnbfny",
    },
    {
      name: "application-name",
      content: "Every-Tuesday",
    },
    {
      property: 'og:locale',
      content: 'en_US',
    },
    {
      property: 'og:type',
      content: 'website',
    }
  ]
  let twitterMeta = metadata ?
    [{
      name: 'twitter:card',
      content: `@${metadata.social.twitter.username}`,
    },
    {
      name: 'twitter:site',
      content: `@${metadata.social.twitter.username}`,
    },
    {
      name: 'twitter:creator',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:label1',
      content: `Written by`,
    },
    {
      name: 'twitter:data1',
      content: `Teela`,
    }] : []

  return [
    ...defaultMeta,
    ...twitterMeta
  ];
}

export function Document({ children, title }: IDocument) {
  let data = useLoaderData<IRootData>();
  console.log('root data', data)
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {/* <JsonLd data={data} /> */}
      </head>
      <body
        className={`selection:bg-teal-300 selection:text-teal-900 overflow-x-hidden`}
      >

        <ContextLoader>
          <GlobalEvents />
          <Header />
          <Outlet />
          <FooterPrimary />
          <BasicModal />
          <CommentModal />
          <SearchModal />
        </ContextLoader>

        <CustomScripts data={data} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload port={8002} />

      </body>
    </html>
  );
}
export function CatchBoundary() {
  const caught = useCatch();
  console.error('caught', caught)
  if (caught.status === 404) return (
    <NotFoundTemplate />
  )
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <p>404 Page using CatchBoundry</p>
        <Scripts />
      </body>
    </html>
  );
}

export let ErrorBoundary = ErrorTemplate

/**
 * Provides an alert for screen reader users when the route changes.
 */
// const RouteChangeAnnouncement = React.memo(() => {
//   let [hydrated, setHydrated] = React.useState(false);
//   let [innerHtml, setInnerHtml] = React.useState("");
//   let location = useLocation();

//   React.useEffect(() => {
//     setHydrated(true);
//   }, []);

//   let firstRenderRef = React.useRef(true);
//   React.useEffect(() => {
//     // Skip the first render because we don't want an announcement on the
//     // initial page load.
//     if (firstRenderRef.current) {
//       firstRenderRef.current = false;
//       return;
//     }

//     let pageTitle = location.pathname === "/" ? "Home page" : document.title;
//     setInnerHtml(`Navigated to ${pageTitle}`);
//   }, [location.pathname]);

//   // Render nothing on the server. The live region provides no value unless
//   // scripts are loaded and the browser takes over normal routing.
//   if (!hydrated) {
//     return null;
//   }

//   return (
//     <div
//       aria-live="assertive"
//       aria-atomic
//       id="route-change-region"
//       style={{
//         border: "0",
//         clipPath: "inset(100%)",
//         clip: "rect(0 0 0 0)",
//         height: "1px",
//         margin: "-1px",
//         overflow: "hidden",
//         padding: "0",
//         position: "absolute",
//         width: "1px",
//         whiteSpace: "nowrap",
//         wordWrap: "normal"
//       }}
//     >
//       {innerHtml}
//     </div>
//   );
// });


