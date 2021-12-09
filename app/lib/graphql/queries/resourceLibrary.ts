export const GetAllFreebiesQuery = `
  query GetNextFreebies {
    cptTags(postType: "et_freebie") {
      name
      slug
    }
    resourceLibraries(first: 1000) {
      edges {
        node {
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
          }
          tags {
            edges {
              node {
                name
              }
            }
          }
          
        }
      }
    }
}
`
