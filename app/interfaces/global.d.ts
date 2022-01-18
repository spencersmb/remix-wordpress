interface IEnv {
  PUBLIC_WP_API_URL: string
  APP_ROOT_URL: string
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: string
}

declare interface Window {
  ENV: IEnv
}

declare module "text2png"

