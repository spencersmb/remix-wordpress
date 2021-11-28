import { defaultSeoImages } from '../wp/site'
import type { Location } from "history";

interface IGetMetaTagsFunction{
  metadata: IMetaData
  post: IPost
  page: any
  location: Location
}

interface IOgImageType{
  width: string
  height: string
  url: string
  altText: string
}

interface IOgArticle {
  publishedTime: string
  modifiedTime: string
  author: string
  tags: {name: string}[]
}
function createOgImages(image: IOgImageType) {
  return {
    'og:image:alt': image.altText,
    'og:image:url': image.url,
    'og:image:width': image.width,
    'og:image:height': image.height
  }
}
function createOgArticle(article: IOgArticle){
  return {
    'og:article:publishedTime': article.publishedTime,
    'og:article:modifiedTime': article.modifiedTime,
    'og:article:author': article.author,
    'og:article:tags': article.tags.map(tag => tag.name).join(', '),
  }
}
export function getHtmlMetadataTags({metadata, post, page, location}: IGetMetaTagsFunction){

  let defaultImage = {
    altText: defaultSeoImages.generic.altText,
    url: defaultSeoImages.generic.url,
    height: '1920',
    width: '1080'
  }
  const url = `${metadata.domain}${location.pathname}`
  let metadataTags: any = {
    'robots:': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    title: metadata.title,
    description: metadata.description,
    canonical: url,
    'og:locale': 'en_US',
    'og:title': metadata.title,
    'og:site_name': metadata.siteTitle,
    'og:type': 'website',
    'og:description': metadata.description,
    ...createOgImages(defaultImage),
    'twitter:card': `@${metadata.social.twitter.username}`,
    'twitter:site': `@${metadata.social.twitter.username}`,
    'twitter:creator': 'summary_large_image',
    'twitter:label1': `Est. reading time`,
    'twitter:data1': `1 minute`,
  }

  if(post){
    metadataTags = {
      ...metadataTags,
      title: post.seo.title,
      description: post.seo.metaDesc,
      canonical: url,
      'og:title': post.seo.title,
      'og:type': 'article',
      'og:description': post.seo.metaDesc,
      ...createOgArticle({
        publishedTime:post.seo.opengraphPublishedTime,
        modifiedTime: post.seo.opengraphPublishedTime,
        author: `${metadata.domain}${post.author.uri}`,
        tags: post.tags
      }),
      ...createOgImages({
        altText: post.featuredImage?.altText || defaultSeoImages.generic.altText,
        url: post.featuredImage?.altText || defaultSeoImages.generic.altText,
        width:'1920',
        height: '1080'
      }),

      'twitter:card': `@${metadata.social.twitter.username}`,
      'twitter:site': `@${metadata.social.twitter.username}`,
      'twitter:creator': 'summary_large_image',
      'twitter:label1': `Written by`,
      'twitter:data1': `Teela`,
      'twitter:label2': `Est. reading time`,
      'twitter:data2': `1 minute`,
    }
  }

  if(page){
    metadataTags = {
      ...metadataTags
    }
  }

  return {
    ...metadataTags
  };
}
