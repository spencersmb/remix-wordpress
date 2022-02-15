import { gql } from '@apollo/client'
import { PRODUCT_FIELDS, RESOURCE_FEATURED_IMAGE } from './posts'

export const GetAllFreebiesQuery = gql`
    ${RESOURCE_FEATURED_IMAGE}
    ${PRODUCT_FIELDS}
    query GetNextFreebies {
        cptTags(postType: "et_freebie") {
            name
            slug
        }
        resourceLibraries(first: 1000) {
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
