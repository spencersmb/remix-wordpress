import { countSeconds, countVideoTime } from "./timeUtils"

/**
 * 
 * @function jsonLdWebsite 
 * @tested - 08/22/2022
 * @tested googleIndex - https://search.google.com/test/rich-results
 */
export function jsonLdWebsite(data: IjsonldWebProps): string{
  const {domain, description, siteTitle} = data
  return `{
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "WebSite",
      "@id": "${domain}/#website",
      "url": "${domain}",
      "name": "${siteTitle}",
      "description": "${description}",
      "potentialAction": [{
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint", 
          "urlTemplate": "${domain}/?s={search_term_string}"
          },
        "query-input": "required name=search_term_string"
      }],
      "inLanguage": "en-US"
    }]
    }`
}

/**
 * 
 * @function jsonldImageObject 
 * @tested - 08/22/2022
 */
export function jsonldImageObject ({pageUrl, image}: IjsonldImageProps): string {

  return `{
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "@id": "${pageUrl}#primaryimage",
          "author": "Every Tuesday",
          "contentLocation": "Georgia, United States",
          "contentUrl": "${image.url}",
          "url": "${image.url}",
          "caption": "${image.altText}",
          "description": "${image.altText}",
          "width": "1920",
          "height": "928",
          "name": "${image.altText}"
      }`
}

/**
 * 
 * @function jsonldWebpage 
 * @tested - 08/22/2022
 */
export function jsonldWebpage (props: IjsonldWebpage) {
  const {pageUrl, publishTime, modifiedTime, title, domain, description} = props

  return `{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "${title}",
        "url": "${pageUrl}",
        "primaryImageOfPage": {"@id": "${pageUrl}#primaryimage"},
        ${publishTime ? `"datePublished": "{${publishTime}"},` : '' }
        ${modifiedTime ? `"dateModified": "{${modifiedTime}"},` : '' }
        "author": {"@id": "${domain}/#/schema/person/335aa8508f8baa38bcaf8be0a46d6ecb"},
        "description": "${description}",
        "breadcrumb": {
          "@id": "${pageUrl}#breadcrumb"
        },
        "potentialAction": [{
          "@type": "ReadAction",
          "target": ["${pageUrl}"]
        }],
        "publisher": {
            "@type": "Organization",
            "name": "Every Tuesday",
            "url": "https://every-tuesday.com",
        },
        "license": "http://creativecommons.org/licenses/by-nc-sa/3.0/us/deed.en_US"
      }`
}

/**
 * 
 * @function jsonldBlog 
 * @tested - 08/22/2022
 */
export function jsonldBlog (props: IJsonldBlog): string{
  const {url, title, dateModified, datePublished, description} = props
  const images = props.images
  return `{
    "@context": "https://schema.org",
    "@type": "Blog",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${title}",
    "image": "${images}",
    "datePublished": "${dateModified}",
    "dateModified": "${datePublished}",
    "author": {"@type": "Person","name": "Teela"},
    "description": "${description}"
  }`
}

/**
 * 
 * @function jsonldProduct 
 * @tested - 08/22/2022
 */
export function jsonldProduct (props: IJsonldProduct): string{
  const {url, product} = props
  const price = product.productDetails.licences && product.productDetails.licences.length >0 ? product.productDetails.licences[0].price : ''
  return `{
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
      "price": ${price},
      "availability": "http://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Every Tuesday Shop"
      }
    }
  }`
}

/**
 * 
 * @function jsonldPerson 
 * @tested - 08/22/2022
 */
export function jsonldPerson (props: IjsonldPersonProps) {
  const {author, domain, description} = props
  return `{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "${domain}/#/schema/person/335aa8508f8baa38bcaf8be0a46d6ecb",
          "name": "Teela",
          "description": "${description}",
          "image": {
            "@type": "ImageObject",
            "@id": "${domain}/#personlogo",
            "inLanguage": "en-US",
            "url": "${author.avatar.url}",
            "contentUrl": "${author.avatar.url}",
            "caption": "Teela"
          }
      }`
}

/**
 * 
 * @function jsonBreadcrumbsList 
 * @tested - 08/22/2022
 */
export function jsonBreadcrumbsList({breadcrumbList}: IBreadcrumbList): string{
  const itemListElements = breadcrumbList.map(breadcrumb => `{
    "@type": "ListItem",
    "position": ${breadcrumb.position},
    "item": {
      "@id": "${breadcrumb.item}",
      "name": "${breadcrumb.name}"
    }
  }`)
  return `{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      ${itemListElements}
    ]
  }`
}


// &t=32s 
export function jsonVideoObject({videoObject, person}: IJsonldVideo): string{
  // console.log('videoObject', videoObject);
  
  const hasClipElements = videoObject.clipElements?.map(clip => {
    const startOffset = countSeconds(clip.startOffset)
    const endOffset = countSeconds(clip.endOffset)
    return `{
    "@type": "Clip",
    "name": "${clip.name}",
    "startOffset": ${startOffset},
    "endOffset": ${endOffset},
    "url": "${videoObject.url}?t=${startOffset}s"
  }`
  }) || []
  const potentialActions = videoObject.potentialActions?.map(element => {
    const startOffset = countSeconds(element.startOffset)
    return `{
      "@type": "SeekToAction",
      "target": "${videoObject.url}?t={seek_to_second_number}",
      "startOffset": ${startOffset},
      "startOffset-input": "required name=seek_to_second_number",
      "name": "${element.name}"
  }`
  }) || []
  return `{
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name" : "${videoObject.name}",
    "author": ${person},
    "creativeWorkStatus": "Published",
    "description" : "${videoObject.description}",
    "thumbnailUrl" : "${videoObject.thumbnailUrl}",
    "uploadDate" : "${videoObject.uploadDate}",
    "duration" : "${countVideoTime(videoObject.duration)}",
    "embedUrl" : "${videoObject.embedUrl}",
    "hasPart": [${hasClipElements}],
    "potentialAction": [${potentialActions}],
    "isFamilyFriendly":"true",
    "inLanguage":"en-US"
  }`
}
