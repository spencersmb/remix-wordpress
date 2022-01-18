
export function jsonLdWebsite(data: IjsonldWebProps): string{
  const {domain, description, siteTitle} = data
  return `{
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'WebSite',
      '@id': '${domain}/#website',
      'url': '${domain}',
      'name': '${siteTitle}',
      'description': ${description},
      'potentialAction': [{
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint', 
          'urlTemplate': '${domain}/?s={search_term_string}'
          },
        'query-input': 'required name=search_term_string'
      }],
      'inLanguage': 'en-US'
    }`
}

export function jsonldImageObject ({pageUrl, image}: IjsonldImageProps): string {

  return `      
        '@type': 'ImageObject',
        '@id': '${pageUrl}#primaryimage',
        'inLanguage': 'en-US',
        'url': '${image.url}',
        'contentUrl': '${image.url}',
        'width': 1920,
        'height': 928,
        'caption': '${image.altText}'
      }`
}

export function jsonldWebpage (props: IjsonldWebpage) {
  const {pageUrl, publishTime, modifiedTime, title, domain, description} = props

  return `{
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
}

export function jsonldBlog (props: IJsonldBlog): string{
  const {url, title, dateModified, datePublished, description} = props
  return `
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${title}",
    "image": [
      "https://res.cloudinary.com/every-tuesday/images/f_auto,q_auto/v1633831040/create-a-cute-notebook-icon-in-adobe-illustrator/create-a-cute-notebook-icon-in-adobe-illustrator.jpg?_i=AA"
     ],
    "datePublished": "${dateModified}",
    "dateModified": "${datePublished}",
    "author": {"@type": "Person","name": "Teela"},
    "description": "${description}"
  }
  `
}

export function jsonldProduct (props: IJsonldProduct): string{
  const {url, product} = props
  
  return `
  {
  "@context": "http://schema.org/",
  "@type": "Product",
  "@id": "${product.id}",
  "url": "${url}",
  "name": "${product.title}",
  "image": "${product.featuredImage.node.sourceUrl}",
  "description": "${product.seo.metaDesc}",
  "brand": {
    "name": "Every Tuesday"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "{{ shop.currency }}",
    "price": "{{ current_variant.price | money_without_currency }}",
    "availability": "http://schema.org/{% if product.available %}InStock{% else %}OutOfStock{% endif %}",
    "seller": {
      "@type": "Organization",
      "name": "{{ shop.name }}"
    }
  }
  `
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
