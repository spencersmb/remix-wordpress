interface IFilterTag {
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
interface IResourceFreebie{
  id: string
  date: string
  featuredImage: IFeaturedImage | null
  freebie: {downloadLink: string, excerpt: string}
  title: string
  tags: IFilterTag[]
}
