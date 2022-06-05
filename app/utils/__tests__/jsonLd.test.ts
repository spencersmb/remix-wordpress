
/**
 * @jest-environment node
 */

import { mockFeatureImageComplete } from "@TestUtils/mock-data/images"
import { mockAuthorData } from "@TestUtils/mock-data/posts"
import { mockPaidProduct } from "@TestUtils/mock-data/products"
import { jsonBreadcrumbsList, jsonldBlog, jsonldImageObject, jsonldPerson, jsonldProduct, jsonldWebpage, jsonLdWebsite } from "../jsonLd"

describe('JSONLD tests', () => {
  it('Should load correct jsonLdWebsite SEO', () => {
  const params:IjsonldWebProps = {
    domain: 'https://www.example.com',
    description: 'This is a description',
    siteTitle: 'Example Site Title',
  }
  const jsonld = jsonLdWebsite(params)
  const result = `{
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'WebSite',
      '@id': '${params.domain}/#website',
      'url': '${params.domain}',
      'name': '${params.siteTitle}',
      'description': ${params.description},
      'potentialAction': [{
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint', 
          'urlTemplate': '${params.domain}/?s={search_term_string}'
          },
        'query-input': 'required name=search_term_string'
      }],
      'inLanguage': 'en-US'
    }`

  expect(jsonld).toEqual(result)
  })

  it('Should load correct jsonldImageObject SEO', () => {
    const params:IjsonldImageProps = {
      pageUrl: 'https://www.example.com/page',
      image: {
        url: 'https://www.example.com/image.jpg',
        altText: 'This is an image alt text',
        height: 928,
        width: 1920,
      }
    }
    const jsonld = jsonldImageObject(params)
    const {image, pageUrl} = params
    const result = `{      
        '@type': 'ImageObject',
        '@id': '${pageUrl}#primaryimage',
        'inLanguage': 'en-US',
        'url': '${image.url}',
        'contentUrl': '${image.url}',
        'width': 1920,
        'height': 928,
        'caption': '${image.altText}'
      }`

    expect(jsonld).toEqual(result)
  })

  it('Should load correct jsonldWebpage SEO', () => {
    const params:IjsonldWebpage = {
      pageUrl: 'https://www.example.com/page',
      publishTime: '2020-01-01',
      description: 'This is a description',
      domain: 'https://www.example.com',
      title: 'Example Title',
      modifiedTime: '2020-01-02'
    }
    const jsonld = jsonldWebpage(params)
    const {pageUrl, publishTime, modifiedTime, title, domain, description} = params
    const result = `{
        "@type": "WebPage",
        "@id": "${pageUrl}#webpage",
        "url": "${pageUrl}",
        "name": "${title}",
        "isPartOf": {"@id": "${domain}#website"},
        "primaryImageOfPage": {"@id": "${pageUrl}#primaryimage"},
        ${publishTime ? `"datePublished": "${publishTime}"` : '' }
        ${modifiedTime ? `"dateModified": "${modifiedTime}"` : '' }
        "author": {"@id": "${domain}/#/schema/person/335aa8508f8baa38bcaf8be0a46d6ecb"},
        "description": "${description}",
        "breadcrumb": {"@id": "${pageUrl}#breadcrumb"},
        "inLanguage": "en-US",
        "potentialAction": [{
          "@type": "ReadAction",
          "target": ["${pageUrl}"]
        }]
      }`

    expect(jsonld).toEqual(result)
  })

  it('Should load correct JsonldBlog SEO', () => {
    const params:IJsonldBlog = {
      author: 'John Doe',
      dateModified: '2020-01-01',
      datePublished: '2020-01-02',
      description: 'This is a description',
      images:[
        'https://www.example.com/image.jpg',
        'https://www.example.com/image-2.jpg',
      ],
      title: 'Example Title',
      url: 'https://www.example.com/page',
    }
    const jsonld = jsonldBlog(params)
    const {author,dateModified,datePublished,description,images,title,url} = params
    const result = `
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${title}",
    "image": ${images},
    "datePublished": "${dateModified}",
    "dateModified": "${datePublished}",
    "author": {"@type": "Person","name": "Teela"},
    "description": "${description}"
  }
  `

    expect(jsonld).toEqual(result)
  })

  it('Should load correct jsonldProduct SEO', () => {
    const params:IJsonldProduct = {
      images:[
        'https://www.example.com/image.jpg',
        'https://www.example.com/image-2.jpg',
      ],
      url: 'https://www.example.com/product',
      shopPlatform: 'gumroad',
      product:{
        featuredImage: {
          node: mockFeatureImageComplete
        },
        productDetails: mockPaidProduct.productDetails,
        seo: mockPaidProduct.seo,
        slug: mockPaidProduct.slug,
        title: mockPaidProduct.title,
      

      }
    }
    const jsonld = jsonldProduct(params)
    const {images,url,shopPlatform,product} = params
    const result =  `{
      "@context": "http://schema.org/",
      "@type": "Product",
      "@id": "${product.slug}",
      "url": "${url}",
      "name": "${product.title}",
      "image": "${product.featuredImage.node.sourceUrl}",
      "description": "${product.seo.metaDesc}",
      "brand": {
        "name": "Every Tuesday"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": ${product.productDetails.licences[0].price},
        "availability": "http://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Every Tuesday Shop"
        }
      }`

    expect(jsonld.replace(/ /g, '')).toEqual(result.replace(/ /g, '') )
  })

  it('Should load correct jsonldPerson SEO', () => {
    const params:IjsonldPersonProps = {
      author: mockAuthorData,
      description: 'This is a description',
      domain: 'https://www.example.com',
    }
    const jsonld = jsonldPerson(params)
    const {author,description,domain} = params
    const result =  `{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "${domain}/#/schema/person/335aa8508f8baa38bcaf8be0a46d6ecb",
          "name": "Teela",
          "image": {
          "@type": "ImageObject",
          "@id": "${domain}/#personlogo",
          "inLanguage": "en-US",
          "url": "${author.avatar.url}",
          "contentUrl": "${author.avatar.url}",
          "caption": "Teela"
        },
        "description": "${description}"
      }`

    expect(jsonld.replace(/ /g, '')).toEqual(result.replace(/ /g, '') )
  })

  it('Should load correct jsonBreadcrumbsList SEO', () => {
    const params:IBreadcrumbList = {
      breadcrumbList:[
        {
          position: 0,
          name: 'Home',
          item: 'https://www.example.com/home',
        },
        {
          position: 1,
          name: 'About',
          item: 'https://www.example.com/about',
        }
      ],
      domain: 'https://www.example.com',
    }
    const jsonld = jsonBreadcrumbsList(params)
    const {breadcrumbList,domain} = params
    const itemListElements = breadcrumbList.map(breadcrumb => `{
      "@type": "ListItem",
      "position": ${breadcrumb.position},
      "item": {
        "@id": "${breadcrumb.item}",
        "name": "${breadcrumb.name}"
      }
    }`)
    const result =  `{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        ${itemListElements}
      ]
    }`

    expect(jsonld.replace(/ /g, '')).toEqual(result.replace(/ /g, '') )
  })
})