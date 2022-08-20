import { getStaticPageMeta } from './pageUtils'
import { getProductStdPrice } from './productPageUtils'
import { formatePrice } from './priceUtils.server'
import { defaultFeaturedImage } from '@App/lib/wp/site'
import type { IgetBasicPageMetaTags, IgetHtmlMetadataTags } from '@App/interfaces/seo-exported'
import { isEmpty } from 'lodash'


/**
 * @function createOgImages
 * @tested - 6/8/2022
 * @description Returns object of OpenGraph images properties
 * 
 *
 *
 **/
export function createOgImages(image: IOgImageType) {
  return {
    'og:image:alt': image.altText,
    'og:image:url': image.url,
    'og:image:width': image.width,
    'og:image:height': image.height
  }
}

/**
 * @function createOgArticle
 * @tested - 6/8/2022
 * @description Returns object of OpenGraph Article properties
 * 
 *
 *
 **/
export function createOgArticle(article: IOgArticle){
  return {
    'og:article:publishedTime': article.publishedTime,
    'og:article:modifiedTime': article.modifiedTime,
    'og:article:author': article.author,
    'og:article:tags': article.tags.map(tag => tag.name).join(', '),
  }
}

/**
 * @function getHtmlMetadataTags
 * @tested - 6/8/2022
 * @description Main function to create default OpenGraph metadata
 * Have Post / Page / Product options to override default values
 * 
 *
 *
 **/
export function getHtmlMetadataTags({
  follow = true,
  metadata, 
  post, 
  page, 
  product,
  location
}: IgetHtmlMetadataTags){

  let defaultImage = {
    altText: defaultFeaturedImage.altText,
    url: defaultFeaturedImage.sourceUrl,
    height: '1920',
    width: '1080'
  }
  let googleFollow = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  let googleNoFollow = 'noindex,nofollow'
  const url = `${metadata.domain}${location.pathname}`
  let metadataTags: any = {
    'robots:': follow ? googleFollow : googleNoFollow,
    title: metadata.title,
    description: metadata.description,
    canonical: url,
    'og:locale': 'en_US',
    'og:title': metadata.title,
    'og:site_name': `${metadata.siteTitle}.com`,
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
      description: post.seo.metaDesc ? post.seo.metaDesc : metadata.description,
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
        altText: post.featuredImage?.altText || defaultFeaturedImage.altText,
        url: post.featuredImage?.sourceUrl || defaultFeaturedImage.sourceUrl,
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
      ...metadataTags,
      title: page.seo.title,
      description: page.seo.metaDesc,
      canonical: url,
      'og:title': page.seo.title,
      'og:type': 'article',
      'og:description': page.seo.metaDesc,
      ...createOgImages({
        altText: page.featuredImage?.altText || defaultFeaturedImage.altText,
        url: page.featuredImage?.sourceUrl || defaultFeaturedImage.sourceUrl,
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

  if(product){
    const price = getProductStdPrice(product, metadata.serverSettings.productPlatform)
    metadataTags = {
      ...metadataTags,
      title: product.seo.title,
      description: product.seo.metaDesc,
      canonical: url,
      'og:title': product.seo.title,
      'og:description': product.seo.metaDesc,
      ...createOgImages({
        altText: product.featuredImage?.node.altText || defaultFeaturedImage.altText,
        url: product.featuredImage?.node.sourceUrl || defaultFeaturedImage.sourceUrl,
        width:'1920',
        height: '1080'
      }),
      // TODO: Replace with getter fn to get images and check if we are doing shopify or internal
      // 'og:image:secure_url': [
      //   'https://cdn.shopify.com/s/files/1/0570/8880/3023/products/watercolor-illustration-brushes-1_1200x1200.jpg?v=1622432040',
      //   'https://cdn.shopify.com/s/files/1/0570/8880/3023/products/watercolor-illustration-brushes-2_1200x1200.jpg?v=1622432054'
      // ],
      'og:image:secure_url':[
        product.featuredImage?.node.sourceUrl
      ],
      'og:price:currency': 'USD',
      'og:price:amount': price,
      'og:price:amount_currency': formatePrice(price)
    }
  }

  return {
    ...metadataTags
  };
}

/**
 * @function getBasicPageMetaTags
 * @tested - 6/8/2022
 * @description Helper function to get static Page MetaData to pass to the primary metadata function
 * getHtmlMetadataTags()
 * 
 *
 *
 **/
export let getBasicPageMetaTags: IgetBasicPageMetaTags = (
  metaData, 
  {title, desc, slug}, 
  follow = {googleIndex: true}
  ) => {
    const { data, location, parentsData } = metaData
  if (!data || !parentsData || isEmpty(parentsData) || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  const page = getStaticPageMeta({
    title,
    desc,
    slug
  })

  return getHtmlMetadataTags({
    follow: follow.googleIndex,
    metadata: parentsData.root.metadata,
    page,
    location
  })
}
