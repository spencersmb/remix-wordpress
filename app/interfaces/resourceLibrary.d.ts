interface IFilterTag {
  name: string
  slug: string
}
interface IResourceFreebie{
  downloadLink: string,
  excerpt: string,
  licenseRequired: boolean,
  product: IProduct | null
}
interface IResourceDataRaw {
  id: string
  date: string
  featuredImage: {node: IFeaturedImage} | null
  freebie:IResourceFreebie
  tags: {edges: {node: IFilterTag}[]}
  title: string
}
interface IMapResourceData {
  edges: {node: IResourceDataRaw}[]
}
interface IResourceItem{
  id: string
  date: string
  featuredImage: IFeaturedImage | null
  freebie: IResourceFreebie
  title: string
  tags: IFilterTag[]
}

interface IGridItem{
  downloadLink: string
  excerpt: string
  image: {
    sourceUrl: string
    srcSet: string
  }
  tags: Itag[]
  title: string
}

