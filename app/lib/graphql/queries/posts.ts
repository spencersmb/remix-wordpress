import gql from 'graphql-tag';
 
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

export const POST_FEATURED_IMAGE = gql`
  fragment featuredImageFields on Post {
    featuredImage {
      node {
        mediaDetails {
          width
          height
          sizes{
            width
            file
            height
            name
            sourceUrl
            mimeType
          }
        }
          altText
          caption
          sourceUrl
          srcSet
          sizes
          id
        }
      }
    }
`
export const RESOURCE_FEATURED_IMAGE = gql`
  fragment featuredImageFields__RL on ResourceLibrary {
    featuredImage {
      node {
        mediaDetails {
          sizes{
            width
            file
            height
            name
            sourceUrl
            mimeType
          }
        }
          altText
          caption
          sourceUrl
          srcSet
          sizes
          id
        }
      }
    }
`
export const RELEATED_POSTS_FIELDS = gql`
  fragment relatedPostsFields on Post {
    relatedPosts {
      ...featuredImageFields
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
  }
`
export const POST_RESOURCE_FIELDS = gql`
  fragment postResourceFields on Post_Tutorialmanager {
    resources {
    ... on Post_Tutorialmanager_Resources_PaidProduct {
      product {
        ... on Product {
          title
          slug
          productDetails{
            productContent{
              description
              subtitle
            }
          }
          featuredImage {
            node {
              mimeType
              mediaDetails {
                height
                width
                sizes{
                  width
                  file
                  height
                  name
                  sourceUrl
                  mimeType
                }
              }
                altText
                caption
                sourceUrl
                srcSet
                sizes
                id
            }
          }
          
          productDetails {
            licences {
              licenseType
              price
              url
            }
          }
        }
      }
      description
    }
    ... on Post_Tutorialmanager_Resources_Course {
      course {
        ... on Course {
          title
          slug
          link
          details {
            courseUrl
          }
          featuredImage {
            node {
              mimeType
              mediaDetails {
                height
                width
                sizes{
                  width
                  file
                  height
                  name
                  sourceUrl
                  mimeType
                }
              }
                altText
                caption
                sourceUrl
                srcSet
                sizes
                id
            }
          }
        }
      }
      description
    }
    ... on Post_Tutorialmanager_Resources_Download {
      download {
        name
        description
        url
      }
    }
    ... on Post_Tutorialmanager_Resources_ColorSwatch {
      colorSwatch {
        url
      }
    }
    ... on Post_Tutorialmanager_Resources_Link {
      link {
        name
        url
        description
      }
    }
  }
}
`
export const PRODUCT_FIELDS = gql`
  fragment productFields on Product {
    title 
    slug
    featuredImage {
      node {
        mimeType
        mediaDetails {
          height
          width
          sizes{
            width
            file
            height
            name
            sourceUrl
            mimeType
          }
        }
          altText
          caption
          sourceUrl
          srcSet
          sizes
          id
      }
    }
    productDetails{
      licences {
        licenseType
        price
        url
      }
    }
  }
`
export const QUERY_POST_BY_ID = gql`
    ${POST_BASIC_FIELDS}
    ${POST_FEATURED_IMAGE}
    ${RELEATED_POSTS_FIELDS}
    query postById($id: ID!) {
        post(idType: DATABASE_ID, id: $id) {
          ...postBasicFields
          ...featuredImageFields
          ...relatedPostsFields
          seo{
              title
              opengraphPublishedTime
              opengraphModifiedTime
              metaDesc
              readingTime
          }
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
          etSocialNav{
              pinterestMeta {
                description
              }
              pinterestImage{
                altText
                caption
                sourceUrl
                srcSet
                sizes
                id
                mediaDetails{
                  sizes{
                    width
                    file
                    height
                    name
                    sourceUrl
                    mimeType
                  }
                }
              }
          }
          tutorialManager {
              postExcerpt
              youtube {
                id
                addVideoMetadata
                duration
                videoObject {
                  description
                  uploadDate
                  thumbnailUrl
                  clipElements {
                    name
                    startOffset
                    endOffset
                  }
                  potentialActions{
                    name
                    startOffset
                  }
                }
              }
              downloads {
                  ... on ResourceLibrary {
                      title
                      freebie {
                          downloadLink
                      }
                  }
              }
          }
          comments(first: 500, after: null, where: {parent: null}) {
              pageInfo{
                endCursor
                hasNextPage
              }
              edges {
                  node {
                      databaseId
                      approved
                      parent {
                        node {
                          databaseId
                        }
                      }
                      id
                      author {
                          node {
                            isRestricted
                              name
                              ... on CommentAuthor {
                                gravatar{
                                  url
                                }
                              }
                          }
                      }
                      date
                      commentedOn {
                          node {
                              id
                              status
                          }
                      }
                      content
                      replies {
                          edges {
                              node {
                                  id
                                  databaseId
                                  content
                                  date
                                  parent {
                                    node {
                                      databaseId
                                    }
                                  }
                                  author {
                                      node {
                                          name
                                        ... on CommentAuthor {
                                          gravatar{
                                            url

                                          }
                                        }
                                      }
                                  }
                                  
                              }
                          }
                      }
                  }
              }
          }
        }
    }
  `

export const QUERY_POSTS_BY_CAT = gql`
  query PostSByCat($first: Int, $catName: String!, $after: String) {
    posts(
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
          featuredImage {
            node {
              mediaDetails {
                sizes{
                  width
                  file
                  height
                  name
                  sourceUrl
                  mimeType
                }
              }
              altText
              caption
              sourceUrl
              srcSet
              sizes
              id
            }
          }
        }
      }
    }
  }
`

export const allPostsGql = gql`
  query AllPostsSearch($first: Int, $after: String) {
        posts(first: $first, after: $after) {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
          }
          edges {
            node { 
              tags(first: 20){
                edges{
                  node{
                    name
                  }
                }
              }
              title
              slug
              date
              excerpt
              databaseId
              categories{
                edges{
                  node{
                    name
                    slug
                  }
                }
              }
              featuredImage {
                node {
                  mediaDetails {
                    width
                    height
                    sizes{
                      width
                      height
                      name
                      sourceUrl
                    }
                  }
                    altText
                    sourceUrl
                    srcSet
                    sizes
                  }
              }
            }
          }
        }
    }
    `