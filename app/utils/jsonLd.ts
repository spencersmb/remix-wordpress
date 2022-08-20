
/**
 * 
 * @function jsonLdWebsite 
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

export function jsonldImageObject ({pageUrl, image}: IjsonldImageProps): string {

  return `{
        "@context": "https://schema.org",      
        "@type": "ImageObject",
        "@id": "${pageUrl}#primaryimage",
        "author": "Every Tuesday",
        "inLanguage": "en-US",
        "contentLocation": "Georgia, United States",
        "url": "${image.url}",
        "contentUrl": "${image.url}",
        "width": "1920",
        "height": "928",
        "caption": "${image.altText}",
        "description": "${image.altText}",
      }`
}

export function jsonldWebpage (props: IjsonldWebpage) {
  const {pageUrl, publishTime, modifiedTime, title, domain, description} = props

  return `{
        "@context": "https://schema.org", 
        "@type": "WebPage",
        "@id": "${pageUrl}#webpage",
        "url": "${pageUrl}",
        "name": "${title}",
        "isPartOf": {"@id": "${domain}#website"},
        "primaryImageOfPage": {"@id": "${pageUrl}#primaryimage"},
        ${publishTime ? `"datePublished": "{${publishTime}"},` : '' }
        ${modifiedTime ? `"dateModified": "{${modifiedTime}"},` : '' }
        "author": {"@id": "${domain}/#/schema/person/335aa8508f8baa38bcaf8be0a46d6ecb"},
        "description": "${description}",
        "breadcrumb": {"@id": "${pageUrl}#breadcrumb"},
        "inLanguage": "en-US",
        "potentialAction": [{
          "@type": "ReadAction",
          "target": ["${pageUrl}"]
        }]
      }`
}

export function jsonldBlog (props: IJsonldBlog): string{
  const {url, title, dateModified, datePublished, description} = props
  const images = props.images
  return `
  {
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
  }
  `
}

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
  }`
}

export function jsonldPerson (props: IjsonldPersonProps) {
  const {author, domain, description} = props
  return `{
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
}

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
