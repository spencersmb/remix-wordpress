import { Scripts, useLoaderData, useLocation, useMatches } from "@remix-run/react";
import type { IEnv } from "@App/interfaces/global";
import type { ISelectedMatch } from "@App/interfaces/remix";
import { jsonLdWebsite, jsonldImageObject, jsonldWebpage, jsonldPerson, jsonBreadcrumbsList, jsonldBlog, jsonldProduct, jsonVideoObject } from "@App/utils/jsonLd";
import { defaultFeaturedImage } from "@App/lib/wp/site";
import { defaultImages, loadImageSrc } from "@App/utils/imageHelpers";
import { ImageSizeEnums } from "@App/enums/imageEnums";

interface IRootData {
  ENV: IEnv
  cart: IShopifyCart
  menus: IMenu[]
  message: string | null
  metadata: ISiteMetaDataMapped
  user: IUser
}
const JsonLd = ({ data }: { data: any }) => {
  const matches = useMatches()
  if (!data) {
    return null
  }

  let metadata = data.metadata
  let selectedMatch: undefined | ISelectedMatch = matches.find((match: any) => match.data?.post || match.data?.page || match.data?.product)
  let post: IPost | null = selectedMatch ? selectedMatch?.data?.post : null
  let page: any = selectedMatch?.data?.page
  // let product: any = selectedMatch?.data?.product
  let videoObject: IVideoObject | null = null
  let location = {
    pathname: selectedMatch?.pathname || '/',
  }
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
    height: 928,
    name: "Every Tuesday iPad Art"
  }

  let jsonWebpageSettings: IjsonldWebpage = {
    title: metadata.title,
    domain: metadata.domain,
    description: metadata.description,
    pageUrl: `${metadata.domain}${location.pathname}`,
  }

  if (post) {

    const featuredImage = loadImageSrc({
      imageSizeName: ImageSizeEnums.FEATURE, // image name to try and get
      imageObject: post.featuredImage, // the featured image object
      fallbackSize: ImageSizeEnums.LARGE, // fallback size to use if the image name doesn't exist
      fallbackImage: defaultImages.featured
    })

    image = {
      ...image,
      url: post.featuredImage?.sourceUrl || image.url, // need default image
      altText: post.featuredImage?.altText || image.altText,
      name: post.title,
    }
    jsonWebpageSettings = {
      ...jsonWebpageSettings,
      title: post.seo.title,
      publishTime: post.seo.opengraphPublishedTime,
      modifiedTime: post.seo.opengraphModifiedTime,
      description: post.seo.metaDesc,
      featuredImage: featuredImage,
    }
    breadcrumbList.push(
      {
        position: 2,
        name: "Blog",
        item: `${metadata.domain}/blog`
      },
      {
        position: 3,
        name: `${post.title}`,
        item: `${metadata.domain}${location.pathname}`
      }
    )

    if (post.tutorialManager.youtube.addVideoMetadata) {
      const id = post.tutorialManager.youtube.id
      const youtube = {
        ...post.tutorialManager.youtube.videoObject,
        duration: post.tutorialManager.youtube.duration
      }
      videoObject = {
        name: post.title,
        description: youtube.description,
        thumbnailUrl: 'https://i.ytimg.com/vi/4ewfn5Y8_Xs/maxresdefault.jpg',
        duration: youtube.duration, // PT15M36S
        embedUrl: `https://www.youtube.com/embed/${id}`,
        uploadDate: youtube.uploadDate,
        url: `https://www.youtube.com/watch?v=${id}`,
        clipElements: youtube.clipElements,
        potentialActions: youtube.potentialActions
      }
    }
  }

  if (page) {

    image = {
      ...image,
      url: page.featuredImage?.sourceUrl || image.url, // need default image
      altText: page.featuredImage?.altText || image.altText,
      name: page.title,
    }
    jsonWebpageSettings = {
      ...jsonWebpageSettings,
      title: `${page.seo.title}`, // Every-Tuesday is added in getStaticPageMeta for static pages
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
      {post &&
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{
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
          }} />
          {/* Preload the LCP image with a high fetchpriority so it starts loading with the stylesheet.*/}

          {jsonWebpageSettings.featuredImage && <>
            {/* @ts-ignore */}
            <link rel="preload" fetchpriority="high" as="image" href={jsonWebpageSettings.featuredImage.sourceUrl} type="image/jpg" />
          </>}

        </>
      }

      {videoObject && <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: jsonVideoObject({
          videoObject,
          person: jsonldPerson(metadata)
        })
      }} />}

      {/*JsonLd Product*/}
      {/* {product && <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: jsonldProduct({
          url: `${metadata.domain}${location.pathname}`,
          images: [
            `${product.featuredImage?.sourceUrl}` // need default image
          ],
          product,
          shopPlatform: metadata.serverSettings.productPlatform
        })
      }} />} */}

    </>
  )
}

export default JsonLd