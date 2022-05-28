interface ICourse{
  id: number;
  title: string;
  slug: string;
  details: {
    courseTags: string[]
    courseUrl: string
  }
  featuredImage: IFeaturedImage | null
}
interface ICourseRaw {
  id: number;
  title: string;
  slug: string;
  details: {
    courseTags: {
      tag: string;
    }[]
    courseUrl: string
  }
  featuredImage: IFeaturedImageNode
}
type ICoursesRaw = {
  edges: {
    node: ICourseRaw
  }[]
}
