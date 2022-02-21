
const mapResourceData = (resourceItemRaw: IResourceDataRaw): IResourceItem => {
  return {
    ...resourceItemRaw,
    // id: resourceItemRaw.id,
    // date: resourceItemRaw.date,
    // freebie: resourceItemRaw.freebie,
    // title: resourceItemRaw.title,
    categories: resourceItemRaw.categories.edges.map(({ node }) => node),
    subCategories: resourceItemRaw.subCategories.edges.map(({ node }) => node),
    tags: resourceItemRaw.tags.edges.map(tag => tag.node),
    featuredImage: resourceItemRaw.featuredImage ? resourceItemRaw.featuredImage.node : null
  }
}

export const flattenResourceData = (resourceData: IMapResourceData): IResourceItem[] | boolean => {
  const dataFiltered = resourceData?.edges?.map(({ node}) => node);
  return Array.isArray(dataFiltered) && dataFiltered.map(mapResourceData)
}
