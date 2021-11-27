import { defaultSeoImages } from '../wp/site'
import type { Location } from "history";

interface IGetMetaTagsFunction{
  metadata: IMetaData
  post: IPost
  page: any
  location: Location
}
export function getHtmlMetadataTags({metadata, post, page, location}: IGetMetaTagsFunction){

  // EXAMPLE OF ARRAYS THAT NEED TO BE CONVERTED
  // article: {
  //   publishedTime: post.seo.opengraphPublishedTime,
  //     modifiedTime: post.seo.opengraphModifiedTime,
  //     authors: [
  //     `${metadata.domain}${post.author.uri}`
  //   ],
  //     tags: Array.isArray(post.tags) ? post.tags.map(tag => tag.name) : [],
  const url = `${metadata.domain}${location.pathname}`
  let metadataTags: any = {
    title: metadata.title,
    description: metadata.description,
    canonical: url,
    'twitter:card': `@${metadata.social.twitter.username}`,
    'twitter:site': `@${metadata.social.twitter.username}`,
    'twitter:creator': 'summary_large_image',
    'og:title': metadata.title,
    'og:type': 'article',
    'og:description': metadata.description,
  }

  if(post){
    metadataTags = {
      ...metadataTags,
      title: post.seo.title,
      description: post.seo.metaDesc,
      canonical: url,
      'twitter:card': `@${metadata.social.twitter.username}`,
      'twitter:site': `@${metadata.social.twitter.username}`,
      'twitter:creator': 'summary_large_image',
      'og:title': post.seo.title,
      'og:type': 'article',
      'og:description': post.seo.metaDesc,

      // convert to function that takes array but returns single og:image tag with value and alt text
      'og:image:alt': post.featuredImage?.altText || defaultSeoImages.generic.altText,
      'og:image:url': post.featuredImage?.sourceUrl || defaultSeoImages.generic.url,
      'og:image:width': '1920',
      'og:image:height': '1080',

      // convert this to function as well
      'og:article:publishedTime': post.seo.opengraphPublishedTime,
      'og:article:modifiedTime': post.seo.opengraphPublishedTime,
      'og:article:author': `${metadata.domain}${post.author.uri}`,
    }
  }

  if(page){}

  return {
    ...metadataTags
  };
}
