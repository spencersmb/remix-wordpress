import { ShopPlatformEnum } from "~/enums/products";
import { fetchAPI } from "~/utils/fetch";
import { getGraphQLString } from "~/utils/graphqlUtils";
import { SiteMetaDataQuery } from "../graphql/queries/siteMetaData";

interface IWpMenuFeaturedCourse {
  id: string;
  details: {
    url: string | null;
  }
}
interface IWpMenuItem {
  childItems: {
    edges: any[]
  },
  id: string,
  title: null | string,
  cssClasses: string[],
  parentId: null | string,
  label: string,
  path: string,
  target: null | string,
  featured: {
    courses: IWpMenuFeaturedCourse[] | null
  }
}
export interface IWPMenu {
  name: string,
  slug: string,
  locations: string[],
  menuItems: IWpMenuItem[]

}
export interface IWpMenus {
  menus: IWPMenu[]
}
export function getWPMenu(resourceUser: string | null): IWpMenus{

  return {
    menus: [
      {
        name: "Primary",
        slug: "primary",
        locations: [
          "PRIMARY_MENU"
        ],
        menuItems: [
          {
            childItems: {
              edges: []
            },
            id: "cG9zdDo4Njk2",
            title: null,
            cssClasses: [],
            parentId: null,
            label: "Courses",
            path: "/courses",
            target: null,
            featured: {
              courses: [
                {
                  id: "cG9zdDo4MzM5",
                  details: {
                    url: "http://learn.every-tuesday.com/3d-lettering-in-procreate"
                  }
                },
                {
                  id: "cG9zdDo4MTI2",
                  details: {
                    url: null
                  }
                },
                {
                  id: "cG9zdDo3Njk5",
                  details: {
                    url: null
                  }
                }
              ]
            }
          },
          {
            childItems: {
              edges: []
            },
            id: "cG9zdDo4NzAw",
            title: null,
            cssClasses: [],
            parentId: null,
            label: "Products",
            path: "/products",
            target: "_blank",
            featured: {
              courses: null
            }
          },
          {
            childItems: {
              edges: [
                {
                  node: {
                    id: "cG9zdDo4NzAy",
                    title: null,
                    cssClasses: [],
                    parentId: "cG9zdDo4NzAx",
                    label: "About Us",
                    path: "/about-us",
                    target: null,
                    featured: {
                      courses: null
                    }
                  }
                }
              ]
            },
            id: "cG9zdDo4NzAx",
            title: null,
            cssClasses: [],
            parentId: null,
            label: "Blog",
            path: "/blog",
            target: null,
            featured: {
              courses: null
            }
          },
          {
            childItems: {
              edges: []
            },
            id: "cG9zdDo4NzAy",
            title: null,
            cssClasses: [],
            parentId: "cG9zdDo4NzAx",
            label: "About Us",
            path: "/about-us",
            target: null,
            featured: {
              courses: null
            }
          },
        ]
      }
    ],
  }
}
export const siteAuthor = {
  author: {
    avatar: {
      height: 96,
      url: "https://secure.gravatar.com/avatar/64857a955396b7ae5131db1265407d77?s=96&d=mm&r=g",
      width: 96
    },
    id: "dXNlcjox",
    name: "Teela",
    slug: "teelac"
  }
}
export const siteInfo = {
  description: "Graphic Design Tips, Tricks, Tutorials and Freebies",
  language: "En",
  title: "Every-Tuesday",
  shopPlatform: ShopPlatformEnum.GUMROAD,
  author: siteAuthor.author,
  siteTitle: "Every-Tuesday",
}
export const socialUrls = {
  youtube: "https://youtube.com/everytues",
  instagram: "https://instagram.com/everytuesday",
  twitter: "https://twitter.com/everytuesday",
  facebook: "https://facebook.com/everytuesday",
  pinterest: "https://pinterest.com/everytuesday"
}

// Metadata on the server-side
export const metadata: ISiteMetaDataStarter = {
  generalSettings: {
    ...siteInfo
  },
  seo: {
    social: {
      youTube: {
        url: socialUrls.youtube
      },
      twitter: {
        username: "teelacunningham",
        cardType: "summary"
      },
      pinterest: {
        metaTag: "",
        url: socialUrls.pinterest
      },
      instagram: {
        url: socialUrls.instagram
      },
      facebook: {
        url: socialUrls.facebook,
        defaultImage: {
          altText: "Every-Tuesday Logo Black",
          sourceUrl: "http://etheadless.local/wp-content/uploads/2013/09/et-logo-black.png",
          mediaDetails: {
            "height": 143,
            "width": 510
          }
        }
      }
    }
  },
}

function mapSocialMetaData(social: ISiteSocialStarter): ISocialSettings{

  return {
    youtube: social.youTube.url,
    instagram: social.instagram.url,
    twitter: {
      url: `https://twitter.com/${social.twitter.username}`,
      cardType: social.twitter.cardType,
      username: social.twitter.username
    },
    facebook: social.facebook.url,
    pinterest: social.pinterest.url
  }

}

// simulate a server-side metadata response and merge into default initialState of useSite value for metaData
export async function createSiteMetaData(domain: string): Promise<ISiteMetaDataMapped> {
  const { generalSettings, seo } = metadata;

  let { title, description, language, author} = generalSettings;

  let social = mapSocialMetaData(seo.social)

  // Grab Data from actaul WP backend
  const dynamicData = await getDynamicSiteMetadata()

  return {
    title: decodeHtmlEntities(title),
    siteTitle: title,
    description,
    domain,
    language,
    social,
    author,
    ...dynamicData
  }
}

/**
 * decodeHtmlEntities
 */

export function decodeHtmlEntities(text: string | number) {
  if (typeof text !== 'string') {
    throw new Error(`Failed to decode HTML entity: invalid type ${typeof text}`);
  }

  let decoded = text;

  const entities: {[key: string]: string} = {
    '&amp;': '\u0026',
    '&quot;': '\u0022',
    '&#039;': '\u0027',
  };

  return decoded.replace(/&amp;|&quot;|&#039;/g, (char) => entities[char]);
}


export async function getDynamicSiteMetadata(): Promise<IDynamicMetaData> {
  try {
    const {themeOptions} = await fetchAPI(getGraphQLString(SiteMetaDataQuery),
      {}
    )
    // const products = data.products?.edges?.map(({ node = {} }) => node);

    return themeOptions
  } catch (e) {
    console.log('error', e)
    throw Error('Site connection error');
  }
}