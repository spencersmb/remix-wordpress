
const mapResourceData = (resourceItemRaw: IResourceDataRaw): IResourceFreebie => {
  return {
    id: resourceItemRaw.id,
    date: resourceItemRaw.date,
    freebie: resourceItemRaw.freebie,
    title: resourceItemRaw.title,
    tags: resourceItemRaw.tags.edges.map(tag => tag.node),
    featuredImage: resourceItemRaw.featuredImage ? resourceItemRaw.featuredImage.node : null
  }
}

export const flattenResourceData = (resourceData: IMapResourceData): IResourceFreebie[] | boolean => {
  const dataFiltered = resourceData?.edges?.map(({ node}) => node);
  return Array.isArray(dataFiltered) && dataFiltered.map(mapResourceData)
}
