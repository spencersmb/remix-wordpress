import { gql } from '@apollo/client'

export const GetAllFreebiesQuery = gql`
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
                    featuredImage {
                        node {
                            altText
                            sourceUrl
                            srcSet
                            title
                            sizes
                        }
                    }
                    freebie{
                        downloadLink
                        excerpt
                        licenseRequired
                        product {
                            ... on Product {
                                title
                                slug
                                details {
                                    licences{
                                        licenseType
                                        price
                                        gumroadUrl
                                    }
                                    
                                }
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
