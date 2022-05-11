import { gql } from "@apollo/client";

export const SiteMetaDataQuery = gql`
  query SiteMetaDataQuery {
    themeOptions {
      serverSettings{
        productPlatform
      }
      courseLaunchBanners {
        basicBanner {
          showBanner
          color
          endDate
          title
          url
        }
        lfmBannner {
          endDate
          showBanner
        }
      }
    }
  }
`
