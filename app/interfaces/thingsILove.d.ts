interface ThingIlove {
  name: string
  description: string
  link: string
  image: IFeaturedImage
}
interface ThingsIloveCategory {
  title: string
  items: ThingIlove[] | null
}
interface ThingsILoveRawData {
  node: {
    title: string
    TIL_acfData: {
      items: ThingIlove[]
    }
  }
}

interface TIL_LoaderData {
  thingsILove: ThingsIloveCategory[]
}