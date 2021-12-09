import { mapPostData } from '../lib/utils/posts'

interface ITag {
  name: string
}
interface IResourceDataRaw {
  date: string
  featuredImage: {node: IFeaturedImage} | null
  freebie: {downloadLink: string, excerpt: string}
  tags: {edges: {node: ITag}[]}
  title: string
}
interface IMapResourceData {
  edges: {node: IResourceDataRaw}[]
}
interface IResourceFreebie{
  date: string
  featuredImage: IFeaturedImage | null
  freebie: {downloadLink: string, excerpt: string}
  title: string
  tags: ITag[]
}
const mapResourceData = (resourceItemRaw: IResourceDataRaw): IResourceFreebie => {
  return {
    date: resourceItemRaw.date,
    freebie: resourceItemRaw.freebie,
    title: resourceItemRaw.title,
    tags: resourceItemRaw.tags.edges.map(tag => tag.node),
    featuredImage: resourceItemRaw.featuredImage ? resourceItemRaw.featuredImage.node : null
  }
}

export const flattenResourceData = (resourceData: IMapResourceData): IResourceFreebie[] | boolean => {
  const dataFiltered = resourceData?.edges?.map(({ node}) => node);
  console.log('dataFiltered', dataFiltered)
  

  return Array.isArray(dataFiltered) && dataFiltered.map(mapResourceData)
}
