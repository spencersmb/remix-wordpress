import { Scripts, useLoaderData, useLocation, useMatches } from "@remix-run/react";
import type { IEnv } from "@App/interfaces/global";
import type { ISelectedMatch } from "@App/interfaces/remix";
import { jsonLdWebsite, jsonldImageObject, jsonldWebpage, jsonldPerson, jsonBreadcrumbsList, jsonldBlog, jsonldProduct } from "@App/utils/jsonLd";
import { defaultFeaturedImage } from "@App/lib/wp/site";

interface IRootData {
  ENV: IEnv
  cart: IShopifyCart
  menus: IMenu[]
  message: string | null
  metadata: ISiteMetaDataMapped
  user: IUser
}
const JsonLd = () => {
  let data = useLoaderData<IRootData>();
  let matches = useMatches();
  let location = useLocation();

  if (!data) {
    return (
      <Scripts />
    )
  }

  let { metadata } = data
  let selectedMatch: undefined | ISelectedMatch = matches.find(match => match.data?.post || match.data?.page || match.data?.product)
  let post: IPost | null = selectedMatch ? selectedMatch?.data?.post : null
  let page: any = selectedMatch?.data?.page
  let product: any = selectedMatch?.data?.product

  let breadcrumbList = [
    {
      position: 1,
      name: "Home",
      item: metadata.domain,
    }
  ]
  let image = {
    url: defaultFeaturedImage.sourceUrl,
    altText: defaultFeaturedImage.altText,
    width: 1920,
    height: 928
  }
  let jsonWebpageSettings: IjsonldWebpage = {
    title: metadata.title,
    domain: metadata.domain,
    description: metadata.description,
    pageUrl: `${metadata.domain}${location.pathname}`,
  }

  if (post) {
    image = {
      ...image,
      url: post.featuredImage?.sourceUrl || image.url, // need default image
      altText: post.featuredImage?.altText || image.altText,
    }
    jsonWebpageSettings = {
      ...jsonWebpageSettings,
      title: post.seo.title,
      publishTime: post.seo.opengraphPublishedTime,
      modifiedTime: post.seo.opengraphModifiedTime,
      description: post.seo.metaDesc,
    }
    breadcrumbList.push(
      {
        position: 2,
        name: `${post.title}`,
        item: `${metadata.domain}${location.pathname}`
      }
    )
  }

  if (page) {

    image = {
      ...image,
      url: page.featuredImage?.sourceUrl || image.url, // need default image
      altText: page.featuredImage?.altText || image.altText,
    }
    jsonWebpageSettings = {
      ...jsonWebpageSettings,
      title: `${page.seo.title} - Every Tuesday`,
      publishTime: page.seo.opengraphPublishedTime,
      modifiedTime: page.seo.opengraphModifiedTime,
      description: page.seo.metaDesc,
    }
    breadcrumbList.push(
      {
        position: 2,
        name: `${page.title}`,
        item: `${metadata.domain}${location.pathname}`
      }
    )

  }

  return (
    <>
      {/* Basic JsonLd Website */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdWebsite(metadata) }} />

      {/*Basic JsonLd Image*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: jsonldImageObject({
          pageUrl: location.pathname,
          image
        })
      }} />

      {/*Basic JsonLd Webpage*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonldWebpage(jsonWebpageSettings) }} />

      {/*Basic JsonLd Person*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonldPerson(metadata) }} />

      {/*Basic JsonLd Breadcrumbs*/}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: jsonBreadcrumbsList({
          domain: metadata.domain,
          breadcrumbList
        })
      }} />

      {/*JsonLd Blog*/}
      {post && <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: jsonldBlog({
          url: `${metadata.domain}${location.pathname}`,
          images: [
            `${post.featuredImage?.sourceUrl}` // need default image
          ],
          datePublished: post.seo.opengraphPublishedTime,
          dateModified: post.seo.opengraphModifiedTime,
          author: post.author.name,
          description: post.seo.metaDesc,
          title: post.seo.title,
        })
      }} />}

      {/*JsonLd Product*/}
      {product && <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: jsonldProduct({
          url: `${metadata.domain}${location.pathname}`,
          images: [
            `${product.featuredImage?.sourceUrl}` // need default image
          ],
          product,
          shopPlatform: metadata.serverSettings.productPlatform
        })
      }} />}

    </>
  )
}

export default JsonLd