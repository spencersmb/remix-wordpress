import * as React from "react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useTransition
} from "@remix-run/react";
import type { LinksFunction, MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import deleteMeRemixStyles from "~/styles/demos/remix.css";
import globalStylesUrl from "~/styles/global-old.css";
import darkStylesUrl from "~/styles/dark.css";
import { siteInitialState } from './hooks/useSite'
import { createSiteMetaData, getWPMenu } from './lib/wp/site'
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import styles from "./styles/app.css";
import { getUserSession } from './utils/session.server'
import UseSiteProvider from './hooks/useSite/useSiteProvider'
import UseFetchPaginateProvider from './hooks/useFetchPagination/useFetchPaginateProvider'
import { getResourceUserToken } from './utils/resourceLibrarySession.server'
import { consoleHelper } from './utils/windowUtils'
import BasicModal from './components/modals/BasicModal'
import { commitSession, getSession } from '~/sessions.server'
import CommentModal from "./components/modals/commentModal";
import { createCart, getUserCart } from "./utils/cartUtils";
import { shopifyCartCookie } from "./cookies.server";
import { fetchInitialState } from "./hooks/useFetchPagination";
import JsonLd from "./components/seo/jsonLd";
import { ShopPlatformEnum } from "./enums/products";
import type { IRootData } from "./interfaces/global";
import useWindowResize from "./hooks/useWindowResize";

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
  const customHeaders = new Headers()
  // Used for session message storage
  const session = await getSession(
    request.headers.get("Cookie")
  );


  let wpAdminSession = await getUserSession(request)
  const resourceUser = await getResourceUserToken(request)

  // TOOD: REMOVE SHOPIFY
  // check for cart Cookie and make api queries to get cart
  const shopifyCart = await getUserCart(request)

  // if it's a new cart, set a new cookie with a new ID
  if (shopifyCart?.newCart) {
    customHeaders.append('Set-Cookie', await shopifyCartCookie.serialize({
      cartId: shopifyCart.cart?.cartId
    }))
  }

  let wpAdminUser = wpAdminSession.has('userId') ? {
    id: wpAdminSession.get('userId')
  } : null

  // pass in the APP URL to see the correct urls on metaData
  // async function that also returns dynamic metaData from WP
  let metadata = await createSiteMetaData(process.env.APP_ROOT_URL || 'no url found')


  // Variables to expose to the front end
  let ENV = {
    APP_ROOT_URL: process.env.APP_ROOT_URL,
    PUBLIC_WP_API_URL: process.env.PUBLIC_WP_API_URL,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  }
  // consoleHelper('Admin user', wpAdminSession.has('userId'))
  // consoleHelper('resourceUser', resourceUser)
  const ses = session.get("globalMessage")
  const message = ses || null;
  console.log('session message', message)
  console.log('resourceUser', resourceUser);

  customHeaders.append('Set-Cookie', await commitSession(session))

  return json({
    message,
    ...getWPMenu(resourceUser), // pass in resourceUser to show or hide logout button on resource member page
    metadata,
    user: {
      wpAdmin: Boolean(wpAdminUser),
      resourceUser: resourceUser
    },
    cart: shopifyCart.cart,
    ENV,
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
export default function App() {
  let { menus, user, metadata, message, cart } = useLoaderData<IRootData>();
  consoleHelper('user', user)
  // consoleHelper('metadata', metadata)

  // let defaultCart: IShopifyCart = {
  //   ...cart,
  //   isOpen: false,
  // }

  let defaultState = fetchInitialState

  // https://sergiodxa.com/articles/use-nprogress-in-a-remix-app
  let transition = useTransition();
  React.useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (transition.state === "idle") NProgress.done();
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else NProgress.start();
  }, [transition.state]);

  // Window localStorage listener to refresh tabs if User Logs In/Out
  React.useEffect(() => {
    console.log('add window Storage listener');

    // Refresh the window if the user logs in on another page
    window.addEventListener('storage', (evt) => {
      console.log('custom fired', evt);

      /**
       * Right now only using Makers_login add or remove storage to trigger logins or logouts
       */
      if (evt.key === 'makers_login' || evt.key === 'makers_logout') {
        window.location.reload();
      }
    });
  }, [])

  const value = {
    ...siteInitialState,
    menu: menus,
    metadata, // merge from Server-side Metadata response from WP
    user,
  }
  return (
    // <Provider store={store}>
    // <UseCartProvider defaultState={defaultCart}>
    <UseSiteProvider defaultState={value}>
      <UseFetchPaginateProvider defaultState={defaultState}>
        <Document>
          <Outlet />
        </Document>
      </UseFetchPaginateProvider>
    </UseSiteProvider>
    // </UseCartProvider>
    // </Provider>
  );
}

// interface ISelectedMatch {
//   pathname: string;
//   params: import("react-router").Params<string>;
//   data: RouteData;
//   handle: any;
// }


export let meta: MetaFunction = () => {
  return {
    title: `Home - Every Tuesday`
  }
}
interface IDocument {
  children: React.ReactNode
  title?: string
}
export function Document({ children, title }: IDocument) {
  let data = useLoaderData<IRootData>();
  // console.log('document data', data);

  useWindowResize()
  // console.log('ENV', data)

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="application-name" content="Every-Tuesday" />
        <meta name="norton-safeweb-site-verification" content="42o2xv441l6-j8hnbn5bc1wi76o7awsydx8s00-ad8jqokbtj2w3ylsaed7gk2tbd3o-tdzh62ynrlkpicf51voi7pfpa9j61f51405kq0t9z-v896p48l7nlqas6i4l" />
        <meta name="facebook-domain-verification" content="49a7ouvzn8x5uhb6gdmg2km5pnbfny" />
        {/* <meta http-equiv="Content-Security-Policy" content="default-src 'self' *.every-tuesday.com every-tuesday.com; script-src 'self' https://*.every-tuesday.com; prefetch-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com;font-src 'self' fonts.gstatic.com" /> */}

        {/* <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.every-tuesday.com https://gumroad.com https://*.gumroad.com/ https://assets.gumroad.com/assets/gumroad-overlay-a64c26f43cba0121e3bc447ef2addcd677643f326633a598a0b35be993d5fe47.js hash-sha256-OUYk9hAp4V/FupIK6DvE3g4hpltYnldjWxtJgXDnBPY=; prefetch-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com;font-src 'self' https://assets.gumroad.com/assets/mabry-regular-pro-93aab2ddc1d8994be366b9404249391b55dcd3678b5dd1917a2ed97d57c3de27.woff2 fonts.gstatic.com" /> */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="preload" href="/fonts/sentinel/Sentinel-SemiboldItal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <Meta />
        <Links />
        <JsonLd />

      </head>
      <body className="selection:bg-teal-300 selection:text-teal-900">
        {/* <!-- Insert Your Facebook Pixel ID below. --> */}
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            alt="facebook pixel"
            src="https://www.facebook.com/tr?id=1336949923022263&ev=PageView&noscript=1"
          />
        </noscript>
        {children}
        {/* <RouteChangeAnnouncement /> */}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {data && data.ENV && <script nonce="845c5c"
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
        {/* {process.env.NODE_ENV === "development" && <LiveReload nonce="nonce-cjzkqzfj" />} */}
        <BasicModal />
        <CommentModal />

        {/* FOOTER SCRIPTS */}
        {data?.metadata?.serverSettings.productPlatform === ShopPlatformEnum.GUMROAD && <script src="https://gumroad.every-tuesday.com/js/gumroad.js"></script>}

      </body>
    </html>
  );
}
export function CatchBoundary() {
  const caught = useCatch();
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
        <Scripts />
      </body>
    </html>
  );
}
export function ErrorBoundary({ error }: any) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        You found an error!
        <Scripts />
      </body>
    </html>
  );
}

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


