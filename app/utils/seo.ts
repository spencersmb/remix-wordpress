import { getStaticPageMeta } from './pageUtils'
import { getProductStdPrice } from './productPageUtils'
import { defaultFeaturedImage } from '@App/lib/wp/site'
import type { IgetBasicPageMetaTags, IgetHtmlMetadataTags } from '@App/interfaces/seo-exported'
import { isEmpty } from 'lodash'
import { consoleHelper } from './windowUtils'
import { formatePriceClient } from '@App/utils/productPageUtils'


/**
 * @function createOgImages
 * @tested - 6/8/2022
 * @description Returns object of OpenGraph images properties
 * 
 *
 *
 **/
export function createOgImages(image: IOgImageType, type?: string | null) {
  if(type === 'v2'){
    return [
      {
        property: 'og:image:url',
        content: image.url,
      },
      {
        property: 'og:image:alt',
        content: image.altText,
      },
      {
        property: 'og:image:width',
        content: image.width,
      },
      {
        property: 'og:image:height',
        content: image.height,
      }
    ]
  }
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
export function createOgArticle(article: IOgArticle, type?: string | undefined){
  if(type === 'v2'){
    return [
      {
        property: 'og:article:published_time',
        content: article.publishedTime,
      },
      {
        property: 'og:article:modified_time',
        content: article.modifiedTime,
      },
      {
        property: 'og:article:author',
        content: article.author,
      },
      {
        property: 'og:article:tags',
        content: article.tags.map(tag => tag.name).join(', '),
      }
    ]
  }
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
    'robots': follow ? googleFollow : googleNoFollow,
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
    let postMetadataTags = {
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
    return Object.assign(metadataTags, postMetadataTags)
  }

  if(page){
    const pageMetadataTags = {
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
    return Object.assign(metadataTags, pageMetadataTags)
  }

  // Will be used for Shopify
  // if(product){
  //   const price = getProductStdPrice(product, metadata.serverSettings.productPlatform)
  //   console.log('price', price)
  //   metadataTags = {
  //     ...metadataTags,
  //     title: product.seo.title,
  //     description: product.seo.metaDesc,
  //     canonical: url,
  //     'og:title': product.seo.title,
  //     'og:description': product.seo.metaDesc,
  //     ...createOgImages({
  //       altText: product.featuredImage?.node.altText || defaultFeaturedImage.altText,
  //       url: product.featuredImage?.node.sourceUrl || defaultFeaturedImage.sourceUrl,
  //       width:'1920',
  //       height: '1080'
  //     }),
  //     // TODO: Replace with getter fn to get images and check if we are doing shopify or internal
  //     // 'og:image:secure_url': [
  //     //   'https://cdn.shopify.com/s/files/1/0570/8880/3023/products/watercolor-illustration-brushes-1_1200x1200.jpg?v=1622432040',
  //     //   'https://cdn.shopify.com/s/files/1/0570/8880/3023/products/watercolor-illustration-brushes-2_1200x1200.jpg?v=1622432054'
  //     // ],
  //     'og:image:secure_url':[
  //       product.featuredImage?.node.sourceUrl
  //     ],
  //     'og:price:currency': 'USD',
  //     'og:price:amount': price,
  //     // 'og:price:amount_currency': formatePriceClient(price)
  //   }
  // }

  return {
    ...metadataTags
  };
}
const noFollowRoutes = [
  'login',
  'design'
]

export function mdxPageMetaV2({
  data,
  parentsData,
  location,
  matches
}: {
  matches: any[]
  data: {page: any, post: any} | null
  parentsData: {root: any}
  location: any}){

  if (!data || !parentsData || isEmpty(parentsData)) {
    return [
      {
        title: 'Oops! Page Not Found', 
      },
      {
        name: 'description',
        content: 'We couldn\'t find the page you were looking for.'
      }
    ]
  }

  let rootModule = matches.find((match: any) => match.route.id === "root");
  let page = data.page || null
  let post = data.post || null
  let metadata = parentsData.root.metadata
  let url = `${metadata.domain}${location.pathname}`
  let rootOgTags = rootModule.meta

  const noFollow = noFollowRoutes.includes(location.pathname.split('/')[1])
  let googleFollow = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  let googleNoFollow = 'noindex,nofollow'

  if(page){

    let pageImages = createOgImages({
        altText: defaultFeaturedImage.altText,
        url: defaultFeaturedImage.sourceUrl,
        width:'1920',
        height: '1080'
      }, 
    'v2') as []

    return [
      ...rootOgTags,
      {
        robots: noFollow ? googleNoFollow : googleFollow,
      },
      { title: page.seo.title },
      { 
        name: 'description' ,
        content: page.seo.metaDesc
      },
      { canonical: url },
      { 
        property: 'og:title' ,
        content: page.seo.title
      },
      { 
        property: 'og:description' ,
        content: page.seo.metaDesc
      },
      ...pageImages,
    ]
  }else if(post){

    let ogArticleTags = createOgArticle({
        publishedTime:post.seo.opengraphPublishedTime,
        modifiedTime: post.seo.opengraphModifiedTime,
        author: `${metadata.domain}${post.author.uri}`,
        tags: post.tags
      }, 'v2') as []

    let postImages = createOgImages({
        altText: post.featuredImage?.altText || defaultFeaturedImage.altText,
        url: post.featuredImage?.sourceUrl || defaultFeaturedImage.sourceUrl,
        width:'1920',
        height: '1080'
      }, 'v2') as []

    return [
      ...rootOgTags,
      {
        robots: googleFollow,
      },
      { title: post.seo.title },
      { 
        name: 'description' ,
        content: post.seo.metaDesc ? post.seo.metaDesc : metadata.description
      },
      { canonical: url },
      { 
        property: 'og:type' ,
        content: 'article'
      },
      { 
        property: 'og:title' ,
        content: post.seo.title
      },
      { 
        property: 'og:description' ,
        content: post.seo.metaDesc ? post.seo.metaDesc : metadata.description
      },
      ...ogArticleTags,
      ...postImages
    ]
  }else{
    return [
      ...rootOgTags,
      {
        title: 'Not found',
      },
      {
        name: 'description',
        content:
          'You landed on a page that Kody the Coding Koala could not find 🐨😢',
      },
    ]
  }

}

export function getBasicPageMetaTags(metaData: any, newPage:{title: any, desc:any, slug: any}, follow = {googleIndex: true}){
  return function(){
    const { data, location, parentsData } = metaData
    if (!data || !parentsData || isEmpty(parentsData) || !location) {
      return {
        title: '404',
        description: 'error: No metaData or Parents Data',
      }
    }
    const page = getStaticPageMeta({
      title: newPage.title,
      desc: newPage.desc,
      slug: newPage.slug
    })

    return getHtmlMetadataTags({
      follow: follow.googleIndex,
      metadata: parentsData.root.metadata,
      page,
      location
    })
  }
}
