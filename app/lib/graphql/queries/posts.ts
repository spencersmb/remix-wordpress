import { gql } from '@apollo/client'


export const QUERY_NEXT_POSTS = gql`
    query NextPosts($after: String) {
        posts(first: 10, after: $after) {
            __typename
            pageInfo{
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
                __typename
            }
            edges {
                __typename
                node {
                    __typename
                    author {
                        node {
                            avatar {
                                height
                                url
                                width
                            }
                            id
                            name
                            slug
                        }
                    }
                    id
                    categories {
                        edges {
                            node {
                                databaseId
                                id
                                name
                                slug
                            }
                        }
                    }
                    content
                    date
                    excerpt
                    featuredImage {
                        node {
                            altText
                            caption
                            sourceUrl
                            srcSet
                            sizes
                            id
                        }
                    }
                    modified
                    databaseId
                    title
                    slug
                    isSticky
                }
            }
        }
        allSettings {
            readingSettingsPostsPerPage
        }
    }
`;

export const QUERY_POST_BY_ID = `
    query postById($id: ID!) {
        post(idType: DATABASE_ID, id: $id) {
            __typename
        author {
            node {
                avatar {
                    height
                    url
                    width
                }
                id
                name
                slug
                uri
            }
        }
        id
        categories {
            edges {
                node {
                    databaseId
                    id
                    name
                    slug
                }
            }
        }
        tags{
            edges{
                node{
                    name
                }
            }
        }
        content
        date
        excerpt
        featuredImage {
            node {
                altText
                caption
                sourceUrl
                srcSet
                sizes
                id
            }
        }
        modified
        databaseId
        title
        slug
        isSticky
        seo{
            title
            opengraphPublishedTime
            opengraphModifiedTime
            metaDesc
            readingTime
        }
        }
    }
  `
export const POST_BASIC_FIELDS = gql`
  fragment postBasicFields on Post {
    id
    content
    date
    dateGmt
    excerpt
    modified
    databaseId
    title
    slug
    isSticky
    categories {
      edges {
          node {
            databaseId
            id
            name
            slug
          }
      }
    }
    tags{
      edges{
          node{
            name
            slug
          }
      }
    }
    relatedPosts {
      title
      slug
      categories {
        edges {
          node {
            slug
            name
          }
        }
      }
    }
  }
`