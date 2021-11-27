export function getWPMenu(){
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
            path: "http://google.com",
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
          {
            childItems: {
              edges: []
            },
            id: "cG9zdDo4Njk3",
            title: null,
            cssClasses: [],
            parentId: null,
            label: "Resource Library",
            path: "/resource-library",
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
        ]
      }
    ],
  }
}

export const metadata: any = {
  generalSettings: {
    description: "Graphic Design Tips, Tricks, Tutorials and Freebies",
    language: "En",
    title: "Every-Tuesday"
  },
  seo: {
    webmaster: {
      yandexVerify: "",
      msVerify: "",
      googleVerify: "",
      baiduVerify: ""
    },
    social: {
      youTube: {
        url: "http://youtube.com/everytues"
      },
      wikipedia: {
        url: ""
      },
      twitter: {
        username: "teelacunningham",
        cardType: "summary"
      },
      pinterest: {
        metaTag: "",
        url: "http://pinterest.com/teelac"
      },
      mySpace: {
        url: ""
      },
      linkedIn: {
        url: ""
      },
      instagram: {
        url: "http://instagram.com/everytuesday"
      },
      facebook: {
        url: "http://facebook.com/everytues",
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

export function getWPMetadata(domain: string) {

  const { generalSettings } = metadata;

  let { title, description, language } = generalSettings;

  const settings: any = {
    domain: domain,
    title,
    siteTitle: title,
    description,
    language: '',
    social: {}
  };

  // It looks like the value of `language` when US English is set
  // in WordPress is empty or "", meaning, we have to infer that
  // if there's no value, it's English. On the other hand, if there
  // is a code, we need to grab the 2char version of it to use ofr
  // the HTML lang attribute

  if (!language || language === '') {
    settings.language = 'en';
  } else {
    settings.language = language.split('_')[0];
  }

  const { webmaster, social } = metadata.seo;

  if (social) {
    settings.social = {}

    Object.keys(social).forEach((key) => {
      const { url } = social[key];
      const keysArray = Object.keys(social[key])

      if(key === 'twitter' && settings.social){
        settings.social[key] = {
          url: `https://twitter.com/${social.twitter.username}`,
          username: social.twitter.username,
          cardType: social.twitter.cardType,
        }
        return
      }

      if(key === 'pinterest' && settings.social){
        settings.social[key] = url;
        return
      }

      if (!url || key === '__typename') return;

      if(keysArray.length > 2 ){
        settings.social[key] = {
          ...social[key]
        }
        return
      }
      settings.social[key] = url;

    });
  }

  if (webmaster) {
    settings.webmaster = {};

    Object.keys(webmaster).forEach((key) => {
      if (!webmaster[key] || key === '__typename') return;
      settings.webmaster[key] = webmaster[key];
    });
  }

  settings.title = decodeHtmlEntities(settings.title);

  return settings;
}
export const defaultSeoImages = {
  generic: {
    url: '',
    altText: '',
    width: 123,
    height: 123
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
