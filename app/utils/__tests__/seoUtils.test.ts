import type { IgetHtmlMetadataTags } from "@App/interfaces/seo-exported"
import { defaultFeaturedImage } from "@App/lib/wp/site"
import { mockPage } from "@TestUtils/mock-data/page"
import { mockLocationData, mockMetaData, mockPostDataComplete } from "@TestUtils/mock-data/posts"
import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { createOgArticle, createOgImages, getBasicPageMetaTags, getHtmlMetadataTags } from "../seo"

describe('Utils: Seo', () => {
  it('createOgImages() - Should return SEO image object', () => {
    const image: IOgImageType = {
      altText: 'altText',
      height: '200px',
      width: '200px',
      url: 'https://example.com/image.jpg'
    }
    expect(createOgImages(image)).toEqual({
      'og:image:alt': image.altText,
      'og:image:url': image.url,
      'og:image:width': image.width,
      'og:image:height': image.height
    })
  })

  it('createOgArticle() - Should return SEO Article object', () => {
    const article: IOgArticle = {
      publishedTime: '2020-01-01',
      modifiedTime: '2020-01-01',
      author: 'https://example.com/author',
      tags: [{ name: 'tag1' }, { name: 'tag2' }]
    }
    expect(createOgArticle(article)).toEqual({
      'og:article:publishedTime': article.publishedTime,
      'og:article:modifiedTime': article.modifiedTime,
      'og:article:author': article.author,
      "og:article:tags": "tag1, tag2",
    })
  })

  it('getHtmlMetadataTags() - Should create default metadata', () => {
    const content: IgetHtmlMetadataTags = {
      metadata: mockMetaData,
      location: mockLocationData
    }
    const metadata = getHtmlMetadataTags(content)
    const response = {
    'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    title: mockMetaData.title,
    description: mockMetaData.description,
    canonical: "etheadless.local/",
    'og:title': mockMetaData.title,
    'og:locale': 'en_US',
    'og:site_name': `${mockMetaData.siteTitle}.com`,
    'og:type': 'website',
    'og:description': mockMetaData.description,
    ...createOgImages({
      altText: defaultFeaturedImage.altText,
      url: defaultFeaturedImage.sourceUrl,
      height: '1920',
      width: '1080'
    }),
    'twitter:card': `@${mockMetaData.social.twitter.username}`,
    'twitter:site': `@${mockMetaData.social.twitter.username}`,
    'twitter:creator': 'summary_large_image',
    'twitter:label1': `Est. reading time`,
    'twitter:data1': `1 minute`,
    }
    expect(metadata).toEqual(response)
  })

  it('getHtmlMetadataTags() - Should create POST metadata', () => {
    const content: IgetHtmlMetadataTags = {
      metadata: mockMetaData,
      post: mockPostDataComplete,
      location: {
        ...mockLocationData,
        pathname: `/${mockPostDataComplete.slug}`
      }
    }
    const metadata = getHtmlMetadataTags(content)
    const response = {
    'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    title: mockPostDataComplete.seo.title,
    description: mockPostDataComplete.seo.metaDesc,
    canonical: `etheadless.local/${mockPostDataComplete.slug}`,
    'og:locale': 'en_US',
    'og:site_name': `${mockMetaData.siteTitle}.com`,
    'og:title': mockPostDataComplete.seo.title,
    'og:type': 'article',
    'og:description': mockPostDataComplete.seo.metaDesc,
    ...createOgArticle({
      publishedTime:mockPostDataComplete.seo.opengraphPublishedTime,
      modifiedTime: mockPostDataComplete.seo.opengraphPublishedTime,
      author: `${mockMetaData.domain}${mockPostDataComplete.author.uri}`,
      tags: mockPostDataComplete.tags
    }),
    ...createOgImages({
      altText: mockPostDataComplete.featuredImage?.altText || defaultFeaturedImage.altText,
      url: mockPostDataComplete.featuredImage?.sourceUrl || defaultFeaturedImage.sourceUrl,
      width:'1920',
      height: '1080'
    }),

    'twitter:card': `@${mockMetaData.social.twitter.username}`,
    'twitter:site': `@${mockMetaData.social.twitter.username}`,
    'twitter:creator': 'summary_large_image',
    'twitter:label1': `Written by`,
    'twitter:data1': `Teela`,
    'twitter:label2': `Est. reading time`,
    'twitter:data2': `1 minute`,
    }
    expect(metadata).toEqual(response)
  })

  it('getHtmlMetadataTags() - Should create PAGE metadata', () => {
    const content: IgetHtmlMetadataTags = {
      metadata: mockMetaData,
      page: mockPage,
      location: {
        ...mockLocationData,
        pathname: `/${mockPage.slug}`
      }
    }
    const metadata = getHtmlMetadataTags(content)
    const response = {
    'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    title: mockPage.seo.title,
    description: mockPage.seo.metaDesc,
    canonical: `etheadless.local/${mockPage.slug}`,
    'og:locale': 'en_US',
    'og:site_name': `${mockMetaData.siteTitle}.com`,
    // custom data
    'og:title': mockPage.seo.title,
    'og:type': 'article',
    'og:description': mockPage.seo.metaDesc,
    ...createOgImages({
      altText: mockPage.featuredImage?.altText || defaultFeaturedImage.altText,
      url: mockPage.featuredImage?.sourceUrl || defaultFeaturedImage.sourceUrl,
      width:'1920',
      height: '1080'
    }),
    'twitter:card': `@${mockMetaData.social.twitter.username}`,
    'twitter:site': `@${mockMetaData.social.twitter.username}`,
    'twitter:creator': 'summary_large_image',
    'twitter:label1': `Written by`,
    'twitter:data1': `Teela`,
    'twitter:label2': `Est. reading time`,
    'twitter:data2': `1 minute`,
    }
    
    expect(metadata).toEqual(response)
  })

  it.skip('getHtmlMetadataTags() - Should create Product metadata', () => {
    const content: IgetHtmlMetadataTags = {
      metadata: mockMetaData,
      product: mockPaidProduct,
      location: {
        ...mockLocationData,
        pathname: `/${mockPaidProduct.slug}`
      }
    }
    const metadata = getHtmlMetadataTags(content)
    const response = {
    'robots:': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    'og:locale': 'en_US',
    'og:type': 'website',
    'og:site_name': `${mockMetaData.siteTitle}.com`,
    // custom data
    title: mockPaidProduct.seo.title,
    description: mockPaidProduct.seo.metaDesc,
    canonical: `etheadless.local/${mockPaidProduct.slug}`,
    'og:title': mockPaidProduct.seo.title,
    'og:description': mockPaidProduct.seo.metaDesc,
    ...createOgImages({
      altText: mockPaidProduct.featuredImage?.node.altText || defaultFeaturedImage.altText,
      url: mockPaidProduct.featuredImage?.node.sourceUrl || defaultFeaturedImage.sourceUrl,
      width:'1920',
      height: '1080'
    }),
    'og:image:secure_url':[
      mockPaidProduct.featuredImage?.node.sourceUrl
    ],
    'og:price:currency': 'USD',
    'og:price:amount': 15,
    'og:price:amount_currency': '$15.00',
    'twitter:card': `@${mockMetaData.social.twitter.username}`,
    'twitter:site': `@${mockMetaData.social.twitter.username}`,
    'twitter:creator': 'summary_large_image',
    'twitter:label1': `Est. reading time`,
    'twitter:data1': `1 minute`,
    }
    expect(metadata).toEqual(response)
  })

  it('getBasicPageMetaTags() - Should return 404 title for metaTag with no Data', () => {
    const page = {
      title: 'Page Title',
      desc: 'Page Description',
      slug: 'page-slug',
    }
    const response = getBasicPageMetaTags({
      data:null,
      location:{
        hash:'',
        key:'',
        pathname: '/class-downloads/bl',
        search: '',
        state: null
      },
      params:{
        slug: '/test-page'
      },
      parentsData:{
        root: {
          metadata: mockMetaData
        }
      }
    
    }, page)()
    
    expect(response.title)
    .toBe('404')
  })
  
  it('getBasicPageMetaTags() - Should return 404 title for metaTag with no slug in the DB', () => {
    const page = {
      title: 'Page Title',
      desc: 'Page Description',
      slug: 'page-slug',
    }
    const response = getBasicPageMetaTags({
      data:{},
      location:{
        hash:'',
        key:'',
        pathname: '/class-downloads/bl',
        search: '',
        state: null
      },
      params:{},
      parentsData:{}
    
    }, page)()

    expect(response.title)
    .toBe('404')
  })
  
  it('getBasicPageMetaTags() - Should return correct page title for metaTag', () => {

    const page = {
      title: 'Page Title',
      desc: 'Page Description',
      slug: 'page-slug',
    }
    const response = getBasicPageMetaTags({
      data:{},
      location:{
        hash:'',
        key:'',
        pathname: '/class-downloads/bl',
        search: '',
        state: null
      },
      params:{},
      parentsData:{
        root: {
          metadata: mockMetaData
        }
      }
    
    }, page)()

    expect(response.title)
    .toBe('Page Title - Every Tuesday')
  })
})