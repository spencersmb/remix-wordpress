export interface IFilterTag {
  name: string
  slug: string
}
interface IResourceDataRaw {
  id: string
  date: string
  featuredImage: {node: IFeaturedImage} | null
  freebie: {downloadLink: string, excerpt: string}
  tags: {edges: {node: IFilterTag}[]}
  title: string
}
interface IMapResourceData {
  edges: {node: IResourceDataRaw}[]
}
export interface IResourceFreebie{
  id: string
  date: string
  featuredImage: IFeaturedImage | null
  freebie: {downloadLink: string, excerpt: string}
  title: string
  tags: IFilterTag[]
}
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
