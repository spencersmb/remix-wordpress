
interface StaticPageProps {
  title: string
  slug: string
  desc: string
}
export const defaultFeaturedImage:IFeaturedImage = {
  altText: 'Every Tuesday. The ultimate resource for Procreate digital brushes and online learning.',
  caption: '',
  id: '311',
  sizes:'',
  srcSet: [],
  sourceUrl: 'https://res.cloudinary.com/every-tuesday/images/v1633831046/peeling-sticker-lettering-effect-procreate/peeling-sticker-lettering-effect-procreate-jpg?_i=AA'
}
export const getStaticPageMeta = ({title, slug, desc }:StaticPageProps): IPage => {
  const date = new Date().getDate.toString()
  return {
    author: {
      avatar:{
        height: 96,
        width: 96,
        url: 'https://secure.gravatar.com/avatar/64857a955396b7ae5131db1265407d77?s=96&d=mm&r=g'
      },
      id: 'dXNlcjox',
      slug: 'teelac',
      name: 'Teela'
    },
    content: '',
    date,
    title,
    id: '',
    slug,
    seo:{
      metaDesc: desc,
      opengraphModifiedTime: date,
      opengraphPublishedTime: date,
      readingTime: '3min',
      title,
    },
    featuredImage: defaultFeaturedImage
  }
}