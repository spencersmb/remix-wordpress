import gql from 'graphql-tag';
import { PRODUCT_FIELDS, RESOURCE_FEATURED_IMAGE } from './posts'

export const OLDGetAllFreebiesQuery = gql`
    ${RESOURCE_FEATURED_IMAGE}
    ${PRODUCT_FIELDS}
    query GetNextFreebies {
        resourceLibraries(first: 12, where: {
          orderby: {
            field:MENU_ORDER
            order: ASC
          }
       }
  ) {
            edges {
                node {
                    id
                    title
                    date
                    dateGmt
                    ...featuredImageFields__RL
                    freebie{
                        downloadLink
                        excerpt
                        licenseRequired
                        product {
                            ...productFields
                        }
                    }
                    categories {
                      edges {
                        node {
                          name
                          slug
                        }
                      }
                    }
                    subCategories {
                      edges {
                        node {
                          name
                          slug
                        }
                      }
                    }
                    tags {
                        edges {
                            node {
                                name
                                slug
                            }
                        }
                    }

                }
            }
        }
    }
`
export const GetFirstFreebiesQuery = gql`
    ${RESOURCE_FEATURED_IMAGE}
    ${PRODUCT_FIELDS}
    query GetFirstFreebie {
        resourceLibraries(first: 1, where: {
          orderby: {
            field: DATE
            order: DESC
          }
       }
  ) {
            edges {
                node {
                    id
                    title
                    date
                    dateGmt
                    ...featuredImageFields__RL
                    freebie{
                        downloadLink
                        excerpt
                        licenseRequired
                        product {
                            ...productFields
                        }
                    }
                    categories {
                      edges {
                        node {
                          name
                          slug
                        }
                      }
                    }
                    subCategories {
                      edges {
                        node {
                          name
                          slug
                        }
                      }
                    }
                    tags {
                        edges {
                            node {
                                name
                                slug
                            }
                        }
                    }

                }
            }
        }
    }
`

// where: {
//           orderby: {
//             field:MENU_ORDER
//             order: ASC
//           }
export const GetFreebiesQuery = gql`
    ${RESOURCE_FEATURED_IMAGE}
    ${PRODUCT_FIELDS}
    query QueryNextFreebies($first: Int, $catName: String!, $after: String) {
        resourceLibraries(
          first: $first
          after: $after
          where: {
            categoryName: $catName, 
            orderby: {
              field: DATE, 
              order: DESC
              }
            }
  ) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          date
          dateGmt
          ...featuredImageFields__RL
          freebie{
              downloadLink
              excerpt
              licenseRequired
              product {
                  ...productFields
              }
          }
          categories {
            edges {
              node {
                name
                slug
              }
            }
          }
          subCategories {
            edges {
              node {
                name
                slug
              }
            }
          }
          tags {
              edges {
                  node {
                      name
                      slug
                  }
              }
          }

        }
      }
    }
  }
`

export const GetAllFreebiesQuery = gql`
    ${RESOURCE_FEATURED_IMAGE}
    ${PRODUCT_FIELDS}
    query QueryAllFreebies($first: Int, $after: String) {
        resourceLibraries(
          first: $first
          after: $after
          where: {
            orderby: {
              field: DATE, 
              order: DESC
              }
            }
  ) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          date
          dateGmt
          ...featuredImageFields__RL
          freebie{
              downloadLink
              excerpt
              licenseRequired
              product {
                  ...productFields
              }
          }
          categories {
            edges {
              node {
                name
                slug
              }
            }
          }
          subCategories {
            edges {
              node {
                name
                slug
              }
            }
          }
          tags {
              edges {
                  node {
                      name
                      slug
                  }
              }
          }

        }
      }
    }
  }
`
