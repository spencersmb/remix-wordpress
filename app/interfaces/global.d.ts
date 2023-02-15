import type { IWPMenu} from "@App/lib/wp/site";

interface IEnv {
  PUBLIC_WP_API_URL: string
  APP_ROOT_URL: string
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: string
}

declare interface Window {
  ENV: IEnv
  GumroadOverlay: any
}

declare global {
    interface Window { ENV: IEnv, GumroadOverlay: any }
}

interface IRootData {
  message: null | string,
  menus: IWPMenu[],
  user: {
    wpAdmin: boolean,
    resourceUser: IResourceUser | null
  },
  cart: any
  ENV: IEnv,
  metadata: ISiteMetaDataMapped,
  searchData: any,
}

declare namespace JSX {
  interface IntrinsicElements {
    "lottie-player": any;
  }
}

// declare module "text2png"
//@ts-ignore
// declare module 'html5-file-selector';
