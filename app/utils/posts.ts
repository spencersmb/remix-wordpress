
export function flattenAllPosts(posts:any): IPost[] | false{
  const postsFiltered = posts?.edges?.map(({ node = {} }) => node);
  return Array.isArray(postsFiltered) && postsFiltered.map(mapPostData)
}
export function removeNodeFromResponse(itemArray: {node: any}[]){
  return itemArray.map(({ node }) => {
    return {
      ...node,
    };
  });
}
export function mapPostData(post:IPostRaw | {} = {}): IPost {
  const data = { ...post };
  let modifiedData: any = {...post}

  // Clean up the author object to avoid someone having to look an extra
  // level deeper into the node
  if (data.author)  {
    modifiedData.author = {
      ...data.author.node,
    }
  }

  // Clean up the categories to make them more easy to access
  if (data.categories) {
    modifiedData.categories = data.categories.edges.map(({ node }) => {
      return {
        ...node,
      };
    });
  }

  // Clean up the featured image to make them more easy to access
  if (data.featuredImage) {
    modifiedData.featuredImage = data.featuredImage.node;
  }

  if (data.tags) {
    modifiedData.tags = data.tags.edges.map(({ node }) => {
      return {
        name: node.name,
      };
    });
  }

  if(data.downloadManager?.downloads){
    modifiedData.downloadManager = data.downloadManager?.downloads.map(download => {
      return download.downloadDetails
    })
  }

  if(data.comments){
    modifiedData.comments = data.comments.edges.map(({ node }) => {
      return {
        ...node,
        author: node.author.node
      };
    });

  }

  return modifiedData

}
