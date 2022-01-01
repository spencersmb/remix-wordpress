
interface IjsonldWebProps {
  domain: string
  description: string
  siteTitle: string
}
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

interface IjsonldImageProps {
  pageUrl: string
  image: {
    url: string
    width: number
    height: number
    altText: string
  }
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

interface IJsonldBlog {
  url: string
  images: string[]
  datePublished: string
  dateModified: string
  author: string
  description: string
  title: string
}

export function jsonldBlog (props: IJsonldBlog): string{
  const {url, title} = props
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
    "datePublished": "2019-02-26T13:01:10+00:00",
    "dateModified": "2021-10-10T01:57:58+00:00",
    "author": {"@type": "Person","name": "Teela"},
    "description": "Create a cute vector notebook icon in Adobe Illustrator in this week's video tutorial, perfect for Illustrator beginners!"
  }
  `
}

export function jsonldPerson (props: IjsonldPersonProps) {
  const {avatarUrl, domain, description} = props
  return `{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "${domain}/#/schema/person/335aa8508f8baa38bcaf8be0a46d6ecb",
          "name": "Teela",
          "image": {
          "@type": "ImageObject",
          "@id": "${domain}/#personlogo",
          "inLanguage": "en-US",
          "url": "${avatarUrl}",
          "contentUrl": "${avatarUrl}",
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
