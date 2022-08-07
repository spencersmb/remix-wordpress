import gql from 'graphql-tag';
import { PRODUCT_FIELDS, RESOURCE_FEATURED_IMAGE } from './posts'

export const GetAllFreebiesQuery = gql`
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
