import gql from 'graphql-tag';

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
        lfmBanner {
          endDate
          showBanner
          nextLaunchDate
        }
      }
    }
  }
`
