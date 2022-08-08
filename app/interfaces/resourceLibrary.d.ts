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
  categories: {edges:ICategoryRaw[]}
  subCategories: {edges:ICategoryRaw[]}
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
  categories: ICategories[]
  subCategories: ICategories[]
}

interface IGridItem{
  downloadLink: string
  excerpt: string
  image: IFeaturedImage | null
  tags: Itag[]
  title: string
}

interface IResourceUser {
  id: number
  tags: string[]
}

interface IGetConvertKitUserByID{
  id: number,
  email_address: string,
  state: 'inactive' | 'active' | 'unsubscribed' | 'bounced' | 'soft-bounced' | 'pending' | 'unconfirmed' | 'deleted'
}

interface MakersLibraryStateType{
  loading: boolean,
  categories: {
    [id: string]: {
      pageInfo: {
        page: number,
        endCursor: string,
        hasNextPage: boolean,
      }
      freebies: IResourceItem[]
    }
  }
  initialized: boolean
}