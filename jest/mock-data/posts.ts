import { LicenseEnum } from "@App/enums/products"
import { mockFeaturedImage } from "./images"
import { mockGenericProduct, mockPaidProduct } from "./products"


  
export const mockTutorailManager__default: ITutorialManager = {
  paidProducts: [],
  colorPalette: {
    downloadUrl: 'https://google.com',
    iconBackgroundColor: '#000',
    iconTextColor: '#000'
  },
  downloads: [
    {
      title: 'download 1',
      freebie: {
        downloadLink: ''
      }
    },
  ],
  postExcerpt: 'EXCERPT',
  status: 'PUBLISHED',
  thumbnail: {
    type: '',
    image: {
      altText: '',
      sourceUrl: '',
      mediaDetails: {
        sizes: [],
        height: 0,
        width: 0,
      },
      id: '',
      mimeType: '',
      sizes: '',
      srcSet: '',
    }
  },
  youtube: {
    embedUrl: ''
  }
}

const paidProduct: IProduct = {
  ...mockGenericProduct
}
const mockAuthorData:IAuthor ={
      avatar: {
        height: 96,
        url: "https://secure.gravatar.com/avatar/64857a955396b7ae5131db1265407d77?s=96&d=mm&r=g",
        width: 96
      },
      id: "dXNlcjox",
      name: "Teela",
      slug: "teelac",
      uri: "/author/teelac/"
}
const mockEtSocialNav = {
  pinterestMeta: {
    description: "Create Candy Cane Lettering in Procreate  | video tutorial: etheadlessdev.wpengine.com"
  },
  pinterestImage: {
    altText: "Create Candy Cane Lettering in Procreate",
    sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest.jpg",
    srcSet: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-333x500.jpg 333w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-683x1024.jpg 683w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-67x100.jpg 67w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest.jpg 1000w",
    sizes: "(max-width: 333px) 100vw, 333px",
    id: "cG9zdDoxMDA4NA==",
    mimeType: "image/jpeg",
    mediaDetails: {
      width: 333,
      height: 500,
      sizes: [
        {
          width: "1000",
          file: "create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
          height: "749",
          name: "headless_post_thumbnail",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "600",
          file: "create-candy-cane-lettering-in-procreate-pinterest-600x360.jpg",
          height: "360",
          name: "headless_resource_image",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-600x360.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "20",
          file: "create-candy-cane-lettering-in-procreate-pinterest-20x20.jpg",
          height: "20",
          name: "placeholder",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-20x20.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "1000",
          file: "create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
          height: "749",
          name: "headless_ipad",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "150",
          file: "create-candy-cane-lettering-in-procreate-pinterest-150x150.jpg",
          height: "150",
          name: "thumbnail",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-150x150.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "333",
          file: "create-candy-cane-lettering-in-procreate-pinterest-333x500.jpg",
          height: "500",
          name: "medium",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-333x500.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "683",
          file: "create-candy-cane-lettering-in-procreate-pinterest-683x1024.jpg",
          height: "1024",
          name: "large",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-683x1024.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "67",
          file: "create-candy-cane-lettering-in-procreate-pinterest-67x100.jpg",
          height: "100",
          name: "et_thumbnail",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-67x100.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "550",
          file: "create-candy-cane-lettering-in-procreate-pinterest-550x550.jpg",
          height: "550",
          name: "readanddigest_square",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-550x550.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "800",
          file: "create-candy-cane-lettering-in-procreate-pinterest-800x600.jpg",
          height: "600",
          name: "readanddigest_landscape",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-800x600.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "600",
          file: "create-candy-cane-lettering-in-procreate-pinterest-600x800.jpg",
          height: "800",
          name: "readanddigest_portrait",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-600x800.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "128",
          file: "create-candy-cane-lettering-in-procreate-pinterest-128x86.jpg",
          height: "86",
          name: "readanddigest_thumb",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-128x86.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "1000",
          file: "create-candy-cane-lettering-in-procreate-pinterest-1000x580.jpg",
          height: "580",
          name: "readanddigest_single_post_title",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x580.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "1000",
          file: "create-candy-cane-lettering-in-procreate-pinterest-1000x550.jpg",
          height: "550",
          name: "readanddigest_large_width",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x550.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "550",
          file: "create-candy-cane-lettering-in-procreate-pinterest-550x1100.jpg",
          height: "1100",
          name: "readanddigest_large_height",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-550x1100.jpg",
          mimeType: "image/jpeg"
        },
        {
          width: "421",
          file: "create-candy-cane-lettering-in-procreate-pinterest-421x203.jpg",
          height: "203",
          name: "wp_rp_thumbnail",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-421x203.jpg",
          mimeType: "image/jpeg"
        }
      ]
    }
  }
}
export const mockTutorailManager__withPaidProducts: ITutorialManager = {
  paidProducts: [
    { ...paidProduct },
    { ...paidProduct }
  ],
  colorPalette: {
    downloadUrl: 'https://google.com',
    iconBackgroundColor: '#000',
    iconTextColor: '#000'
  },
  downloads: [
    {
      title: 'download 1',
      freebie: {
        downloadLink: ''
      }
    },
    {
      title: 'download 2',
      freebie: {
        downloadLink: ''
      }
    }
  ],
  postExcerpt: 'EXCERPT',
  status: 'PUBLISHED',
  thumbnail: {
    type: '',
    image: {
      altText: '',
      sourceUrl: '',
      mediaDetails: {
        sizes: [],
        height: 0,
        width: 0,
      },
      id: '',
      mimeType: '',
      sizes: '',
      srcSet: '',
    }
  },
  youtube: {
    embedUrl: ''
  }
}

const mockTags = [
  {
    
      name: "3D lettering",
      slug: "3d-lettering"
  },
  {
    
      name: "candy cane",
      slug: "candy-cane"
  },
  {
    
      name: "candy cane lettering",
      slug: "candy-cane-lettering"
  },
  {
    
      name: "design",
      slug: "design"
  },
  {
    
      name: "doodle",
      slug: "doodle"
  },
  {
    
      name: "every tuesday",
      slug: "every-tuesday"
  },
  {
    
      name: "every tuesday tutorial",
      slug: "every-tuesday-tutorial"
  },
  {
    
      name: "free",
      slug: "free"
  },
  {
    
      name: "freebie",
      slug: "freebie"
  },
  {
    
      name: "highlights",
      slug: "highlights"
  }
]

export const mockSeo = {
  title: "Create Candy Cane Lettering in Procreate - Every-Tuesday",
  opengraphPublishedTime: "2021-11-30T14:36:00+00:00",
  opengraphModifiedTime: "2022-05-20T01:15:37+00:00",
  metaDesc: "This week we are creating candy cane lettering entirely in Procreate! Read on for the free color palette, brushes used and simple process!",
  readingTime: 2
}

const mockRelatedPost = {
    seo: {
      ...mockSeo
    },
    databaseId: 5,
    content:'',
    id: '5',
    date: '2020-11-20T00:00:00',
    etSocialNav: {
      ...mockEtSocialNav
    },
    tags: mockTags,
    comments: {
      pageInfo: {
        endCursor: 'null',
        hasNextPage: false
      },
      list: []
    },
    relatedPosts: [],
    author: {
      ...mockAuthorData
    },
    featuredImage: {
        mimeType: "image/jpeg",
        mediaDetails: {
          height: 0,
          width:0,
          sizes: [
            {
              width: "1000",
              file: "create-quick-floral-wreaths-in-procreate-hero-1000x749.jpg",
              height: "749",
              name: "headless_post_thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-1000x749.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "600",
              file: "create-quick-floral-wreaths-in-procreate-hero-600x360.jpg",
              height: "360",
              name: "headless_resource_image",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-600x360.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "20",
              file: "create-quick-floral-wreaths-in-procreate-hero-20x20.jpg",
              height: "20",
              name: "placeholder",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-20x20.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1000",
              file: "create-quick-floral-wreaths-in-procreate-hero-1000x749.jpg",
              height: "749",
              name: "headless_ipad",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-1000x749.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1440",
              file: "create-quick-floral-wreaths-in-procreate-hero-1440x696.jpg",
              height: "696",
              name: "headless_post_feature_image",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-1440x696.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "150",
              file: "create-quick-floral-wreaths-in-procreate-hero-150x150.jpg",
              height: "150",
              name: "thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-150x150.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "500",
              file: "create-quick-floral-wreaths-in-procreate-hero-500x242.jpg",
              height: "242",
              name: "medium",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-500x242.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1024",
              file: "create-quick-floral-wreaths-in-procreate-hero-1024x495.jpg",
              height: "495",
              name: "large",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-1024x495.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "550",
              file: "create-quick-floral-wreaths-in-procreate-hero-550x550.jpg",
              height: "550",
              name: "readanddigest_square",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-550x550.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "800",
              file: "create-quick-floral-wreaths-in-procreate-hero-800x600.jpg",
              height: "600",
              name: "readanddigest_landscape",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-800x600.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "600",
              file: "create-quick-floral-wreaths-in-procreate-hero-600x800.jpg",
              height: "800",
              name: "readanddigest_portrait",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-600x800.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1200",
              file: "create-quick-floral-wreaths-in-procreate-hero-1200x580.jpg",
              height: "580",
              name: "readanddigest_post_feature_image",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-1200x580.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "128",
              file: "create-quick-floral-wreaths-in-procreate-hero-128x86.jpg",
              height: "86",
              name: "readanddigest_thumb",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-128x86.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1200",
              file: "create-quick-floral-wreaths-in-procreate-hero-1200x580.jpg",
              height: "580",
              name: "readanddigest_single_post_title",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-1200x580.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1100",
              file: "create-quick-floral-wreaths-in-procreate-hero-1100x550.jpg",
              height: "550",
              name: "readanddigest_large_width",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-1100x550.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "550",
              file: "create-quick-floral-wreaths-in-procreate-hero-550x928.jpg",
              height: "928",
              name: "readanddigest_large_height",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-550x928.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "421",
              file: "create-quick-floral-wreaths-in-procreate-hero-421x203.jpg",
              height: "203",
              name: "wp_rp_thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-421x203.jpg",
              mimeType: "image/jpeg"
            }
          ]
        },
        altText: "create easy floral wreaths in procreate",
        sourceUrl: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero.jpg",
        srcSet: "https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-500x242.jpg 500w, https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-1440x696.jpg 1440w, https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-1024x495.jpg 1024w, https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-1200x580.jpg 1200w, https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero-421x203.jpg 421w, https://etheadless.local/wp-content/uploads/2018/04/create-quick-floral-wreaths-in-procreate-hero.jpg 1920w",
        sizes: "(max-width: 500px) 100vw, 500px",
        id: "cG9zdDo4MTY4"
    },
    title: "Create Easy Floral Wreaths in Procreate",
    slug: "floral-wreaths-in-procreate",
    tutorialManager: {
      ...mockTutorailManager__withPaidProducts,
      thumbnail:{
        image: mockFeaturedImage,
        type: "make"
      }
    },
          categories: [
    {
        databaseId: 657,
        id: "dGVybTo2NTc=",
        name: "Color",
        slug: "color"
    },
    {
        databaseId: 5,
        id: "dGVybTo1",
        name: "Freebies",
        slug: "freebies"
    },
    {
      
        databaseId: 816,
        id: "dGVybTo4MTY=",
        name: "Hand Drawn",
        slug: "hand-drawn"
    },
    {
      
        databaseId: 559,
        id: "dGVybTo1NTk=",
        name: "Hand Lettering",
        slug: "hand-lettering-2"
    },
    {
      
        databaseId: 69,
        id: "dGVybTo2OQ==",
        name: "Holiday",
        slug: "holiday"
    },
    {
      
        databaseId: 1182,
        id: "dGVybToxMTgy",
        name: "Illustration",
        slug: "illustration"
    },
    {
      
        databaseId: 2447,
        id: "dGVybToyNDQ3",
        name: "Intermediate",
        slug: "intermediate"
    },
    {
      
        databaseId: 2047,
        id: "dGVybToyMDQ3",
        name: "Procreate",
        slug: "procreate"
    },
    {
      
        databaseId: 9,
        id: "dGVybTo5",
        name: "Tutorials",
        slug: "tutorials"
    }
  ],
} 

export const mockTutorialManagerDownloads = [
        {
          title: "Floral Postage Stamps Tutorial colors",
          freebie: {
            downloadLink: "http://bit.ly/et-procreate-10-lettering-guides"
          }
        },
        {
          title: "Ep.1 Style Studies",
          freebie: {
            downloadLink: "http://bit.ly/et-ss-ep1-printable"
          }
        }
      ]


export const mockPostData: IPost = {
  title: "test-title",
  slug: "test-slug",
  featuredImage: mockFeaturedImage,
  author: mockAuthorData,
  categories: [],
  content: '',
  comments: {
    list: [],
    pageInfo: {
      hasNextPage: false,
      endCursor: ''
    }
  },
  databaseId: 0,
  date: '',
  etSocialNav: {
    pinterestImage: mockFeaturedImage,
    pinterestMeta: {
      description: '',
    }
  },
  tutorialManager: {
    paidProducts: [],
    colorPalette: null,
    downloads: [],
    postExcerpt: 'EXCERPT',
    status: 'PUBLISHED',
    thumbnail: {
      type: '',
      image: {
        altText: '',
        sourceUrl: '',
        mediaDetails: {
          sizes: [],
          height: 0,
          width: 0,
        },
        id: '',
        mimeType: '',
        sizes: '',
        srcSet: '',
      }
    },
    youtube: {
      embedUrl: ''
    }
  },
  tags: [],
  id: '',
  relatedPosts: [],
  seo: {
    metaDesc: '',
    opengraphModifiedTime: '',
    opengraphPublishedTime: '',
    readingTime: 0,
    title: '',
  }
}

export const mockComments: IComments = {
    pageInfo: {
    endCursor: "YXJyYXljb25uZWN0aW9uOjIxODQyNA==",
    hasNextPage: true
  },
  list: [
    {
      databaseId: 218427,
      // approved: true,
      parent: null,
      id: "Y29tbWVudDoyMTg0Mjc=",
      author: {
        id: "YWRtaW5pc3RyYXRvcjox",
        databaseId: "1",
        name: "Spencer Bigum",
        gravatar: {
          url: "https://secure.gravatar.com/avatar/9119dc766dbfe9f6b05b7f39f9dbd9ce?s=96&d=mm&r=g"
        }
      },
      date: "2022-01-27 21:08:02",
      // commentedOn: {
      //   node: {
      //     id: "cG9zdDo1NDM0",
      //     status: "publish"
      //   }
      // },
      content: "<p>4</p>\n",
      replies: []
      },
    {
      databaseId: 218426,
      // approved: true,
      parent: null,
      id: "Y29tbWVudDoyMTg0MjY=",
      author: {
        databaseId: "1",
        id: "YWRtaW5pc3RyYXRvcjox",
        name: "Spencer Bigum",
        gravatar: {
          url: "https://secure.gravatar.com/avatar/9119dc766dbfe9f6b05b7f39f9dbd9ce?s=96&d=mm&r=g"
        }
      },
      date: "2022-01-27 21:07:22",
      // commentedOn: {
      //   node: {
      //     id: "cG9zdDo1NDM0",
      //     status: "publish"
      //   }
      // },
      content: "<p>3</p>\n",
      replies: [
          {
            id: "Y29tbWVudDoyMTg0MzM=",
            databaseId: 218433,
            content: "<p>two test</p>\n",
            date: "2022-01-28 01:31:37",
            parent: 218426,
            author: {
              databaseId: "2",
              id: "YWRtaW5pc3RyYXRvcjoxMg==",
              name: "twotest",
              gravatar: {
                url: "https://secure.gravatar.com/avatar/9119dc766dbfe9f6b05b7f39f9dbd9ce?s=96&d=mm&r=g"
              }
            }
          },
          {
            id: "Y29tbWVudDoyMTg0MzI=",
            databaseId: 218432,
            content: "<p>test</p>\n",
            date: "2022-01-28 01:26:12",
            parent: 218426,
            author: {
              databaseId: "1",
              id: "YWRtaW5pc3RyYXRvcjox",
              name: "Spencer M Bigum",
              gravatar: {
              url: "https://secure.gravatar.com/avatar/9119dc766dbfe9f6b05b7f39f9dbd9ce?s=96&d=mm&r=g"
              }
            }
            },
          {
            id: "Y29tbWVudDoyMTg0Mjg=",
            databaseId: 218428,
            content: "<p>tes</p>\n",
            date: "2022-01-27 21:08:26",
            parent: 218426,
            author: {
              databaseId: "3",
              id: "YWRtaW5pc3RyYXRvcjoxMw==",
              name: "Teela Bigum",
              gravatar: {
                url: "https://secure.gravatar.com/avatar/aac786a8b226660a1064233ededdda6b?s=96&d=mm&r=g"
              }
            }
          }
        ]
      },
    {
      databaseId: 218424,
      // approved: true,
      parent: null,
      id: "Y29tbWVudDoyMTg0MjQ=",
      author: {
        databaseId: "1",
        id: "YWRtaW5pc3RyYXRvcjox",
        name: "Spencer",
        gravatar: {
          url: "https://secure.gravatar.com/avatar/9119dc766dbfe9f6b05b7f39f9dbd9ce?s=96&d=mm&r=g"
        }
      },
      date: "2022-01-27 21:05:42",
      // commentedOn: {
      //   node: {
      //     id: "cG9zdDo1NDM0",
      //     status: "publish"
      //   }
      // },
      content: "<p>test</p>\n",
      replies: []
      }
  ]
}

export const mockPostDataComplete: IPost = {
  id: "cG9zdDoxMDA4Mw==",
    content: "\n<h5>Here&#8217;s a written overview of how to candy cane lettering in Procreate :</h5>\n\n\n\n<ul><li>Set your background color and write out your typography with the <a href=\"https://etheadless.local/beautiful-lettering-brushes\" target=\"_blank\" rel=\"noreferrer noopener\">pencil pro brush</a> at 25%. Fill up a large amount of the canvas with your lettering since it will be the focus. </li><li>Create your candies by creating a new layer and draw in little triangles in the letter o&#8217;s. Switch colors and fill in the gaps. Choose liquify and choose twirl left or right and tap and hold right in the center of the candy and push down. Complete the candy by giving it a background circle. Apply a clipping mask to the swirl to lock it into the shape. </li><li>Erase the o&#8217;s from the lettering layer. Add a wrapper to the candy. Duplicate the candy layer and move it down into jolly, and reflect it so that it does not look the exact same. </li><li>Create a new layer above your lettering layer and draw in lines on all of your letters. Once the lines are done, apply a clipping mask to lock in the stripes. </li><li>Add in a shadow by creating a copy of your lettering layer, choose motion blur and drag it down and to the right. </li><li>To make it pop even more, add in a highlight. Draw a line on the letters on the left side. Apply a gaussian blur and change the blend mode to overlay. </li><li>Draw in some wintery swirls to fill the canvas, draw in some dots that vary in size to mimic snow. Finally, add in some asterisks so they look like little stars. </li><li>Done!</li></ul>\n\n\n\n<p></p>\n",
    date: "2021-11-30T09:36:00",
    databaseId: 10083,
    title: "Create Candy Cane Lettering in Procreate",
    slug: "create-candy-cane-lettering-procreate",
    featuredImage: {
      mediaDetails: {
        height: 0,
        width:  0,
        sizes: [
          {
            width: "1000",
            file: "create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
            height: "749",
            name: "headless_post_thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "600",
            file: "create-candy-cane-lettering-in-procreate-hero-600x360.jpg",
            height: "360",
            name: "headless_resource_image",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-600x360.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "20",
            file: "create-candy-cane-lettering-in-procreate-hero-20x20.jpg",
            height: "20",
            name: "placeholder",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-20x20.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1000",
            file: "create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
            height: "749",
            name: "headless_ipad",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1440",
            file: "create-candy-cane-lettering-in-procreate-hero-1440x810.jpg",
            height: "810",
            name: "headless_post_feature_image",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1440x810.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "150",
            file: "create-candy-cane-lettering-in-procreate-hero-150x150.jpg",
            height: "150",
            name: "thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-150x150.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "500",
            file: "create-candy-cane-lettering-in-procreate-hero-500x281.jpg",
            height: "281",
            name: "medium",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-500x281.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1024",
            file: "create-candy-cane-lettering-in-procreate-hero-1024x576.jpg",
            height: "576",
            name: "large",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1024x576.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1536",
            file: "create-candy-cane-lettering-in-procreate-hero-1536x864.jpg",
            height: "864",
            name: "1536x1536",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1536x864.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "100",
            file: "create-candy-cane-lettering-in-procreate-hero-100x56.jpg",
            height: "56",
            name: "et_thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-100x56.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "550",
            file: "create-candy-cane-lettering-in-procreate-hero-550x550.jpg",
            height: "550",
            name: "readanddigest_square",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-550x550.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "800",
            file: "create-candy-cane-lettering-in-procreate-hero-800x600.jpg",
            height: "600",
            name: "readanddigest_landscape",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-800x600.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "600",
            file: "create-candy-cane-lettering-in-procreate-hero-600x800.jpg",
            height: "800",
            name: "readanddigest_portrait",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-600x800.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1200",
            file: "create-candy-cane-lettering-in-procreate-hero-1200x675.jpg",
            height: "675",
            name: "readanddigest_post_feature_image",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1200x675.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "128",
            file: "create-candy-cane-lettering-in-procreate-hero-128x86.jpg",
            height: "86",
            name: "readanddigest_thumb",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-128x86.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1200",
            file: "create-candy-cane-lettering-in-procreate-hero-1200x580.jpg",
            height: "580",
            name: "readanddigest_single_post_title",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1200x580.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1100",
            file: "create-candy-cane-lettering-in-procreate-hero-1100x550.jpg",
            height: "550",
            name: "readanddigest_large_width",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1100x550.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "550",
            file: "create-candy-cane-lettering-in-procreate-hero-550x1080.jpg",
            height: "1080",
            name: "readanddigest_large_height",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-550x1080.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "421",
            file: "create-candy-cane-lettering-in-procreate-hero-421x203.jpg",
            height: "203",
            name: "wp_rp_thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-421x203.jpg",
            mimeType: "image/jpeg"
          }
        ]
        },
      
        mimeType: "image/jpeg",
        altText: "Create Candy Cane Lettering in Procreate",
        sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero.jpg",
        srcSet: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-500x281.jpg 500w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1440x810.jpg 1440w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1024x576.jpg 1024w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1536x864.jpg 1536w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-100x56.jpg 100w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1200x675.jpg 1200w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero.jpg 1920w",
        sizes: "(max-width: 500px) 100vw, 500px",
        id: "cG9zdDoxMDA4NQ=="
    },
    categories: [
        {
            databaseId: 657,
            id: "dGVybTo2NTc=",
            name: "Color",
            slug: "color"
        },
        {
            databaseId: 5,
            id: "dGVybTo1",
            name: "Freebies",
            slug: "freebies"
        },
        {
          
            databaseId: 816,
            id: "dGVybTo4MTY=",
            name: "Hand Drawn",
            slug: "hand-drawn"
        },
        {
          
            databaseId: 559,
            id: "dGVybTo1NTk=",
            name: "Hand Lettering",
            slug: "hand-lettering-2"
        },
        {
          
            databaseId: 69,
            id: "dGVybTo2OQ==",
            name: "Holiday",
            slug: "holiday"
        },
        {
          
            databaseId: 1182,
            id: "dGVybToxMTgy",
            name: "Illustration",
            slug: "illustration"
        },
        {
          
            databaseId: 2447,
            id: "dGVybToyNDQ3",
            name: "Intermediate",
            slug: "intermediate"
        },
        {
          
            databaseId: 2047,
            id: "dGVybToyMDQ3",
            name: "Procreate",
            slug: "procreate"
        },
        {
          
            databaseId: 9,
            id: "dGVybTo5",
            name: "Tutorials",
            slug: "tutorials"
        }
      ],
    tags: [
        {
          
            name: "3D lettering",
            slug: "3d-lettering"
        },
        {
          
            name: "candy cane",
            slug: "candy-cane"
        },
        {
          
            name: "candy cane lettering",
            slug: "candy-cane-lettering"
        },
        {
          
            name: "design",
            slug: "design"
        },
        {
          
            name: "doodle",
            slug: "doodle"
        },
        {
          
            name: "every tuesday",
            slug: "every-tuesday"
        },
        {
          
            name: "every tuesday tutorial",
            slug: "every-tuesday-tutorial"
        },
        {
          
            name: "free",
            slug: "free"
        },
        {
          
            name: "freebie",
            slug: "freebie"
        },
        {
          
            name: "highlights",
            slug: "highlights"
        }
      ],
    seo: {
      title: "Create Candy Cane Lettering in Procreate - Every-Tuesday",
      opengraphPublishedTime: "2021-11-30T14:36:00+00:00",
      opengraphModifiedTime: "2022-05-20T01:15:37+00:00",
      metaDesc: "This week we are creating candy cane lettering entirely in Procreate! Read on for the free color palette, brushes used and simple process!",
      readingTime: 2
    },
    author: {
      avatar: {
        height: 96,
        url: "https://secure.gravatar.com/avatar/64857a955396b7ae5131db1265407d77?s=96&d=mm&r=g",
        width: 96
      },
      id: "dXNlcjox",
      name: "Teela",
      slug: "teelac",
      uri: "/author/teelac/"
    },
    etSocialNav: {
      pinterestMeta: {
        description: "Create Candy Cane Lettering in Procreate  | video tutorial: etheadlessdev.wpengine.com"
      },
      pinterestImage: {
        altText: "Create Candy Cane Lettering in Procreate",
        sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest.jpg",
        srcSet: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-333x500.jpg 333w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-683x1024.jpg 683w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-67x100.jpg 67w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest.jpg 1000w",
        sizes: "(max-width: 333px) 100vw, 333px",
        id: "cG9zdDoxMDA4NA==",
        mimeType: "image/jpeg",
        mediaDetails: {
          width: 333,
          height: 500,
          sizes: [
            {
              width: "1000",
              file: "create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
              height: "749",
              name: "headless_post_thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "600",
              file: "create-candy-cane-lettering-in-procreate-pinterest-600x360.jpg",
              height: "360",
              name: "headless_resource_image",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-600x360.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "20",
              file: "create-candy-cane-lettering-in-procreate-pinterest-20x20.jpg",
              height: "20",
              name: "placeholder",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-20x20.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1000",
              file: "create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
              height: "749",
              name: "headless_ipad",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "150",
              file: "create-candy-cane-lettering-in-procreate-pinterest-150x150.jpg",
              height: "150",
              name: "thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-150x150.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "333",
              file: "create-candy-cane-lettering-in-procreate-pinterest-333x500.jpg",
              height: "500",
              name: "medium",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-333x500.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "683",
              file: "create-candy-cane-lettering-in-procreate-pinterest-683x1024.jpg",
              height: "1024",
              name: "large",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-683x1024.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "67",
              file: "create-candy-cane-lettering-in-procreate-pinterest-67x100.jpg",
              height: "100",
              name: "et_thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-67x100.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "550",
              file: "create-candy-cane-lettering-in-procreate-pinterest-550x550.jpg",
              height: "550",
              name: "readanddigest_square",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-550x550.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "800",
              file: "create-candy-cane-lettering-in-procreate-pinterest-800x600.jpg",
              height: "600",
              name: "readanddigest_landscape",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-800x600.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "600",
              file: "create-candy-cane-lettering-in-procreate-pinterest-600x800.jpg",
              height: "800",
              name: "readanddigest_portrait",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-600x800.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "128",
              file: "create-candy-cane-lettering-in-procreate-pinterest-128x86.jpg",
              height: "86",
              name: "readanddigest_thumb",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-128x86.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1000",
              file: "create-candy-cane-lettering-in-procreate-pinterest-1000x580.jpg",
              height: "580",
              name: "readanddigest_single_post_title",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x580.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1000",
              file: "create-candy-cane-lettering-in-procreate-pinterest-1000x550.jpg",
              height: "550",
              name: "readanddigest_large_width",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x550.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "550",
              file: "create-candy-cane-lettering-in-procreate-pinterest-550x1100.jpg",
              height: "1100",
              name: "readanddigest_large_height",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-550x1100.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "421",
              file: "create-candy-cane-lettering-in-procreate-pinterest-421x203.jpg",
              height: "203",
              name: "wp_rp_thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-421x203.jpg",
              mimeType: "image/jpeg"
            }
          ]
        }
      }
    },
    relatedPosts: [
      mockRelatedPost,
      mockRelatedPost,
      mockRelatedPost
    ],
    tutorialManager: {
      status: "success",
      postExcerpt: "<p>Happy Tuesday! Time for tutorial no.3 (of 6!) in my holiday tutorial series! This week, we’re creating candy cane lettering, complete with wrapped peppermints and decorative, wintery swirls.</p>\n",
      thumbnail: {
        type: 'make',
        image: {
          mimeType: "image/jpeg",
          altText: "test -3",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3.jpg",
          srcSet: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-500x444.jpg 500w, https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3.jpg 1000w",
          sizes: "(max-width: 500px) 100vw, 500px",
          id: "cG9zdDoxMDQxNw==",
          mediaDetails: {
            width: 500,
            height: 444,
            sizes: [
              {
                width: "1000",
                file: "thumb-test-3-1000x749.jpg",
                height: "749",
                name: "headless_post_thumbnail",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-1000x749.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "600",
                file: "thumb-test-3-600x360.jpg",
                height: "360",
                name: "headless_resource_image",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-600x360.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "20",
                file: "thumb-test-3-20x20.jpg",
                height: "20",
                name: "placeholder",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-20x20.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "500",
                file: "thumb-test-3-500x444.jpg",
                height: "444",
                name: "medium",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-500x444.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "150",
                file: "thumb-test-3-150x150.jpg",
                height: "150",
                name: "thumbnail",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-150x150.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "1000",
                file: "thumb-test-3-1000x749.jpg",
                height: "749",
                name: "headless_ipad",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-1000x749.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "120",
                file: "thumb-test-3-120x120.jpg",
                height: "120",
                name: "yarpp-thumbnail",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-120x120.jpg",
                mimeType: "image/jpeg"
              }
            ]
          }
        }
      },
      colorPalette: {
          downloadUrl: "http://bit.ly/polaroids-swatch",
          iconBackgroundColor: "#00998e",
          iconTextColor: "#ffffff"
        },
      paidProducts: [
        {...mockPaidProduct}
      ],
      youtube: {
        embedUrl: "https://www.youtube.com/embed/tZce1wvLzDE"
      },
      downloads: mockTutorialManagerDownloads
    },
    comments: {
      pageInfo: {
        endCursor: 'null',
        hasNextPage: false
      },
      list: []
    }
}

export const mockPostDataComplete_2: IPost = {
  id: "cG9zdDoxMDA4Mw++",
    content: "\n<h5>Here&#8217;s a written overview of how to candy cane lettering in Procreate :</h5>\n\n\n\n<ul><li>Set your background color and write out your typography with the <a href=\"https://etheadless.local/beautiful-lettering-brushes\" target=\"_blank\" rel=\"noreferrer noopener\">pencil pro brush</a> at 25%. Fill up a large amount of the canvas with your lettering since it will be the focus. </li><li>Create your candies by creating a new layer and draw in little triangles in the letter o&#8217;s. Switch colors and fill in the gaps. Choose liquify and choose twirl left or right and tap and hold right in the center of the candy and push down. Complete the candy by giving it a background circle. Apply a clipping mask to the swirl to lock it into the shape. </li><li>Erase the o&#8217;s from the lettering layer. Add a wrapper to the candy. Duplicate the candy layer and move it down into jolly, and reflect it so that it does not look the exact same. </li><li>Create a new layer above your lettering layer and draw in lines on all of your letters. Once the lines are done, apply a clipping mask to lock in the stripes. </li><li>Add in a shadow by creating a copy of your lettering layer, choose motion blur and drag it down and to the right. </li><li>To make it pop even more, add in a highlight. Draw a line on the letters on the left side. Apply a gaussian blur and change the blend mode to overlay. </li><li>Draw in some wintery swirls to fill the canvas, draw in some dots that vary in size to mimic snow. Finally, add in some asterisks so they look like little stars. </li><li>Done!</li></ul>\n\n\n\n<p></p>\n",
    date: "2021-11-30T09:36:00",
    databaseId: 10073,
    title: "Battling Self Doubt as a Graphic Designer",
    slug: "battling-self-doubt-graphic-designer",
    featuredImage: {
      mediaDetails: {
        height: 0,
        width:  0,
        sizes: [
          {
            width: "1000",
            file: "create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
            height: "749",
            name: "headless_post_thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "600",
            file: "create-candy-cane-lettering-in-procreate-hero-600x360.jpg",
            height: "360",
            name: "headless_resource_image",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-600x360.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "20",
            file: "create-candy-cane-lettering-in-procreate-hero-20x20.jpg",
            height: "20",
            name: "placeholder",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-20x20.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1000",
            file: "create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
            height: "749",
            name: "headless_ipad",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1440",
            file: "create-candy-cane-lettering-in-procreate-hero-1440x810.jpg",
            height: "810",
            name: "headless_post_feature_image",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1440x810.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "150",
            file: "create-candy-cane-lettering-in-procreate-hero-150x150.jpg",
            height: "150",
            name: "thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-150x150.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "500",
            file: "create-candy-cane-lettering-in-procreate-hero-500x281.jpg",
            height: "281",
            name: "medium",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-500x281.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1024",
            file: "create-candy-cane-lettering-in-procreate-hero-1024x576.jpg",
            height: "576",
            name: "large",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1024x576.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1536",
            file: "create-candy-cane-lettering-in-procreate-hero-1536x864.jpg",
            height: "864",
            name: "1536x1536",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1536x864.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "100",
            file: "create-candy-cane-lettering-in-procreate-hero-100x56.jpg",
            height: "56",
            name: "et_thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-100x56.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "550",
            file: "create-candy-cane-lettering-in-procreate-hero-550x550.jpg",
            height: "550",
            name: "readanddigest_square",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-550x550.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "800",
            file: "create-candy-cane-lettering-in-procreate-hero-800x600.jpg",
            height: "600",
            name: "readanddigest_landscape",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-800x600.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "600",
            file: "create-candy-cane-lettering-in-procreate-hero-600x800.jpg",
            height: "800",
            name: "readanddigest_portrait",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-600x800.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1200",
            file: "create-candy-cane-lettering-in-procreate-hero-1200x675.jpg",
            height: "675",
            name: "readanddigest_post_feature_image",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1200x675.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "128",
            file: "create-candy-cane-lettering-in-procreate-hero-128x86.jpg",
            height: "86",
            name: "readanddigest_thumb",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-128x86.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1200",
            file: "create-candy-cane-lettering-in-procreate-hero-1200x580.jpg",
            height: "580",
            name: "readanddigest_single_post_title",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1200x580.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1100",
            file: "create-candy-cane-lettering-in-procreate-hero-1100x550.jpg",
            height: "550",
            name: "readanddigest_large_width",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1100x550.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "550",
            file: "create-candy-cane-lettering-in-procreate-hero-550x1080.jpg",
            height: "1080",
            name: "readanddigest_large_height",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-550x1080.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "421",
            file: "create-candy-cane-lettering-in-procreate-hero-421x203.jpg",
            height: "203",
            name: "wp_rp_thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-421x203.jpg",
            mimeType: "image/jpeg"
          }
        ]
        },
      
        mimeType: "image/jpeg",
        altText: "Create Candy Cane Lettering in Procreate",
        sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero.jpg",
        srcSet: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-500x281.jpg 500w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1440x810.jpg 1440w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1024x576.jpg 1024w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1536x864.jpg 1536w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-100x56.jpg 100w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1200x675.jpg 1200w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero.jpg 1920w",
        sizes: "(max-width: 500px) 100vw, 500px",
        id: "cG9zdDoxMDA4NQ=="
    },
    categories: [
        {
            databaseId: 657,
            id: "dGVybTo2NTc=",
            name: "Color",
            slug: "color"
        },
        {
            databaseId: 5,
            id: "dGVybTo1",
            name: "Freebies",
            slug: "freebies"
        },
        {
          
            databaseId: 816,
            id: "dGVybTo4MTY=",
            name: "Hand Drawn",
            slug: "hand-drawn"
        },
        {
          
            databaseId: 559,
            id: "dGVybTo1NTk=",
            name: "Hand Lettering",
            slug: "hand-lettering-2"
        },
        {
          
            databaseId: 69,
            id: "dGVybTo2OQ==",
            name: "Holiday",
            slug: "holiday"
        },
        {
          
            databaseId: 1182,
            id: "dGVybToxMTgy",
            name: "Illustration",
            slug: "illustration"
        },
        {
          
            databaseId: 2447,
            id: "dGVybToyNDQ3",
            name: "Beginner",
            slug: "Beginner"
        },
        {
          
            databaseId: 2047,
            id: "dGVybToyMDQ3",
            name: "Procreate",
            slug: "procreate"
        },
        {
          
            databaseId: 9,
            id: "dGVybTo5",
            name: "Tutorials",
            slug: "tutorials"
        }
      ],
    tags: [
        {
          
            name: "3D lettering",
            slug: "3d-lettering"
        },
        {
          
            name: "candy cane",
            slug: "candy-cane"
        },
        {
          
            name: "candy cane lettering",
            slug: "candy-cane-lettering"
        },
        {
          
            name: "design",
            slug: "design"
        },
        {
          
            name: "doodle",
            slug: "doodle"
        },
        {
          
            name: "every tuesday",
            slug: "every-tuesday"
        },
        {
          
            name: "every tuesday tutorial",
            slug: "every-tuesday-tutorial"
        },
        {
          
            name: "free",
            slug: "free"
        },
        {
          
            name: "freebie",
            slug: "freebie"
        },
        {
          
            name: "highlights",
            slug: "highlights"
        }
      ],
    seo: {
      title: "Create Candy Cane Lettering in Procreate - Every-Tuesday",
      opengraphPublishedTime: "2021-11-30T14:36:00+00:00",
      opengraphModifiedTime: "2022-05-20T01:15:37+00:00",
      metaDesc: "This week we are creating candy cane lettering entirely in Procreate! Read on for the free color palette, brushes used and simple process!",
      readingTime: 2
    },
    author: {
      avatar: {
        height: 96,
        url: "https://secure.gravatar.com/avatar/64857a955396b7ae5131db1265407d77?s=96&d=mm&r=g",
        width: 96
      },
      id: "dXNlcjox",
      name: "Teela",
      slug: "teelac",
      uri: "/author/teelac/"
    },
    etSocialNav: {
      pinterestMeta: {
        description: "Create Candy Cane Lettering in Procreate  | video tutorial: etheadlessdev.wpengine.com"
      },
      pinterestImage: {
        altText: "Create Candy Cane Lettering in Procreate",
        sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest.jpg",
        srcSet: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-333x500.jpg 333w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-683x1024.jpg 683w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-67x100.jpg 67w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest.jpg 1000w",
        sizes: "(max-width: 333px) 100vw, 333px",
        id: "cG9zdDoxMDA4NA==",
        mimeType: "image/jpeg",
        mediaDetails: {
          width: 333,
          height: 500,
          sizes: [
            {
              width: "1000",
              file: "create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
              height: "749",
              name: "headless_post_thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "600",
              file: "create-candy-cane-lettering-in-procreate-pinterest-600x360.jpg",
              height: "360",
              name: "headless_resource_image",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-600x360.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "20",
              file: "create-candy-cane-lettering-in-procreate-pinterest-20x20.jpg",
              height: "20",
              name: "placeholder",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-20x20.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1000",
              file: "create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
              height: "749",
              name: "headless_ipad",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "150",
              file: "create-candy-cane-lettering-in-procreate-pinterest-150x150.jpg",
              height: "150",
              name: "thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-150x150.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "333",
              file: "create-candy-cane-lettering-in-procreate-pinterest-333x500.jpg",
              height: "500",
              name: "medium",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-333x500.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "683",
              file: "create-candy-cane-lettering-in-procreate-pinterest-683x1024.jpg",
              height: "1024",
              name: "large",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-683x1024.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "67",
              file: "create-candy-cane-lettering-in-procreate-pinterest-67x100.jpg",
              height: "100",
              name: "et_thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-67x100.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "550",
              file: "create-candy-cane-lettering-in-procreate-pinterest-550x550.jpg",
              height: "550",
              name: "readanddigest_square",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-550x550.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "800",
              file: "create-candy-cane-lettering-in-procreate-pinterest-800x600.jpg",
              height: "600",
              name: "readanddigest_landscape",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-800x600.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "600",
              file: "create-candy-cane-lettering-in-procreate-pinterest-600x800.jpg",
              height: "800",
              name: "readanddigest_portrait",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-600x800.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "128",
              file: "create-candy-cane-lettering-in-procreate-pinterest-128x86.jpg",
              height: "86",
              name: "readanddigest_thumb",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-128x86.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1000",
              file: "create-candy-cane-lettering-in-procreate-pinterest-1000x580.jpg",
              height: "580",
              name: "readanddigest_single_post_title",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x580.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1000",
              file: "create-candy-cane-lettering-in-procreate-pinterest-1000x550.jpg",
              height: "550",
              name: "readanddigest_large_width",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x550.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "550",
              file: "create-candy-cane-lettering-in-procreate-pinterest-550x1100.jpg",
              height: "1100",
              name: "readanddigest_large_height",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-550x1100.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "421",
              file: "create-candy-cane-lettering-in-procreate-pinterest-421x203.jpg",
              height: "203",
              name: "wp_rp_thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-421x203.jpg",
              mimeType: "image/jpeg"
            }
          ]
        }
      }
    },
    relatedPosts: [
      mockRelatedPost,
      mockRelatedPost,
      mockRelatedPost
    ],
    tutorialManager: {
      status: "success",
      postExcerpt: "<p>Happy Tuesday! Time for tutorial no.3 (of 6!) in my holiday tutorial series! This week, we’re creating candy cane lettering, complete with wrapped peppermints and decorative, wintery swirls.</p>\n",
      thumbnail: {
        type: 'make',
        image: {
          mimeType: "image/jpeg",
          altText: "test -3",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3.jpg",
          srcSet: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-500x444.jpg 500w, https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3.jpg 1000w",
          sizes: "(max-width: 500px) 100vw, 500px",
          id: "cG9zdDoxMDQxNw==",
          mediaDetails: {
            width: 500,
            height: 444,
            sizes: [
              {
                width: "1000",
                file: "thumb-test-3-1000x749.jpg",
                height: "749",
                name: "headless_post_thumbnail",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-1000x749.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "600",
                file: "thumb-test-3-600x360.jpg",
                height: "360",
                name: "headless_resource_image",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-600x360.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "20",
                file: "thumb-test-3-20x20.jpg",
                height: "20",
                name: "placeholder",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-20x20.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "500",
                file: "thumb-test-3-500x444.jpg",
                height: "444",
                name: "medium",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-500x444.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "150",
                file: "thumb-test-3-150x150.jpg",
                height: "150",
                name: "thumbnail",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-150x150.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "1000",
                file: "thumb-test-3-1000x749.jpg",
                height: "749",
                name: "headless_ipad",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-1000x749.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "120",
                file: "thumb-test-3-120x120.jpg",
                height: "120",
                name: "yarpp-thumbnail",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-120x120.jpg",
                mimeType: "image/jpeg"
              }
            ]
          }
        }
      },
      colorPalette: {
          downloadUrl: "http://bit.ly/polaroids-swatch",
          iconBackgroundColor: "#00998e",
          iconTextColor: "#ffffff"
        },
      paidProducts: [
        {...mockPaidProduct}
      ],
      youtube: {
        embedUrl: "https://www.youtube.com/embed/tZce1wvLzDE"
      },
      downloads: mockTutorialManagerDownloads
    },
    comments: {
      pageInfo: {
        endCursor: 'null',
        hasNextPage: false
      },
      list: []
    }
}

export const mockPostDataComplete_3: IPost = {
  id: "cG9zdDoxMDA4Mw--",
    content: "\n<h5>Here&#8217;s a written overview of how to candy cane lettering in Procreate :</h5>\n\n\n\n<ul><li>Set your background color and write out your typography with the <a href=\"https://etheadless.local/beautiful-lettering-brushes\" target=\"_blank\" rel=\"noreferrer noopener\">pencil pro brush</a> at 25%. Fill up a large amount of the canvas with your lettering since it will be the focus. </li><li>Create your candies by creating a new layer and draw in little triangles in the letter o&#8217;s. Switch colors and fill in the gaps. Choose liquify and choose twirl left or right and tap and hold right in the center of the candy and push down. Complete the candy by giving it a background circle. Apply a clipping mask to the swirl to lock it into the shape. </li><li>Erase the o&#8217;s from the lettering layer. Add a wrapper to the candy. Duplicate the candy layer and move it down into jolly, and reflect it so that it does not look the exact same. </li><li>Create a new layer above your lettering layer and draw in lines on all of your letters. Once the lines are done, apply a clipping mask to lock in the stripes. </li><li>Add in a shadow by creating a copy of your lettering layer, choose motion blur and drag it down and to the right. </li><li>To make it pop even more, add in a highlight. Draw a line on the letters on the left side. Apply a gaussian blur and change the blend mode to overlay. </li><li>Draw in some wintery swirls to fill the canvas, draw in some dots that vary in size to mimic snow. Finally, add in some asterisks so they look like little stars. </li><li>Done!</li></ul>\n\n\n\n<p></p>\n",
    date: "2021-11-30T09:36:00",
    databaseId: 10063,
    title: "Draw a Wrapped Flower Bouquet in Procreate",
    slug: "wrapped-flower-bouquet-procreate",
    featuredImage: {
      mediaDetails: {
        height: 0,
        width:  0,
        sizes: [
          {
            width: "1000",
            file: "create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
            height: "749",
            name: "headless_post_thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "600",
            file: "create-candy-cane-lettering-in-procreate-hero-600x360.jpg",
            height: "360",
            name: "headless_resource_image",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-600x360.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "20",
            file: "create-candy-cane-lettering-in-procreate-hero-20x20.jpg",
            height: "20",
            name: "placeholder",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-20x20.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1000",
            file: "create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
            height: "749",
            name: "headless_ipad",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1000x749.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1440",
            file: "create-candy-cane-lettering-in-procreate-hero-1440x810.jpg",
            height: "810",
            name: "headless_post_feature_image",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1440x810.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "150",
            file: "create-candy-cane-lettering-in-procreate-hero-150x150.jpg",
            height: "150",
            name: "thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-150x150.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "500",
            file: "create-candy-cane-lettering-in-procreate-hero-500x281.jpg",
            height: "281",
            name: "medium",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-500x281.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1024",
            file: "create-candy-cane-lettering-in-procreate-hero-1024x576.jpg",
            height: "576",
            name: "large",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1024x576.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1536",
            file: "create-candy-cane-lettering-in-procreate-hero-1536x864.jpg",
            height: "864",
            name: "1536x1536",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1536x864.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "100",
            file: "create-candy-cane-lettering-in-procreate-hero-100x56.jpg",
            height: "56",
            name: "et_thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-100x56.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "550",
            file: "create-candy-cane-lettering-in-procreate-hero-550x550.jpg",
            height: "550",
            name: "readanddigest_square",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-550x550.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "800",
            file: "create-candy-cane-lettering-in-procreate-hero-800x600.jpg",
            height: "600",
            name: "readanddigest_landscape",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-800x600.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "600",
            file: "create-candy-cane-lettering-in-procreate-hero-600x800.jpg",
            height: "800",
            name: "readanddigest_portrait",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-600x800.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1200",
            file: "create-candy-cane-lettering-in-procreate-hero-1200x675.jpg",
            height: "675",
            name: "readanddigest_post_feature_image",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1200x675.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "128",
            file: "create-candy-cane-lettering-in-procreate-hero-128x86.jpg",
            height: "86",
            name: "readanddigest_thumb",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-128x86.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1200",
            file: "create-candy-cane-lettering-in-procreate-hero-1200x580.jpg",
            height: "580",
            name: "readanddigest_single_post_title",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1200x580.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "1100",
            file: "create-candy-cane-lettering-in-procreate-hero-1100x550.jpg",
            height: "550",
            name: "readanddigest_large_width",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1100x550.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "550",
            file: "create-candy-cane-lettering-in-procreate-hero-550x1080.jpg",
            height: "1080",
            name: "readanddigest_large_height",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-550x1080.jpg",
            mimeType: "image/jpeg"
          },
          {
            width: "421",
            file: "create-candy-cane-lettering-in-procreate-hero-421x203.jpg",
            height: "203",
            name: "wp_rp_thumbnail",
            sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-421x203.jpg",
            mimeType: "image/jpeg"
          }
        ]
        },
      
        mimeType: "image/jpeg",
        altText: "Create Candy Cane Lettering in Procreate",
        sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero.jpg",
        srcSet: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-500x281.jpg 500w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1440x810.jpg 1440w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1024x576.jpg 1024w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1536x864.jpg 1536w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-100x56.jpg 100w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero-1200x675.jpg 1200w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-hero.jpg 1920w",
        sizes: "(max-width: 500px) 100vw, 500px",
        id: "cG9zdDoxMDA4NQ=="
    },
    categories: [
        {
            databaseId: 657,
            id: "dGVybTo2NTc=",
            name: "Color",
            slug: "color"
        },
        {
            databaseId: 5,
            id: "dGVybTo1",
            name: "Freebies",
            slug: "freebies"
        },
        {
          
            databaseId: 816,
            id: "dGVybTo4MTY=",
            name: "Hand Drawn",
            slug: "hand-drawn"
        },
        {
          
            databaseId: 559,
            id: "dGVybTo1NTk=",
            name: "Hand Lettering",
            slug: "hand-lettering-2"
        },
        {
          
            databaseId: 69,
            id: "dGVybTo2OQ==",
            name: "Holiday",
            slug: "holiday"
        },
        {
          
            databaseId: 1182,
            id: "dGVybToxMTgy",
            name: "Illustration",
            slug: "illustration"
        },
        {
          
            databaseId: 2447,
            id: "dGVybToyNDQ3",
            name: "Beginner",
            slug: "Beginner"
        },
        {
          
            databaseId: 2047,
            id: "dGVybToyMDQ3",
            name: "Procreate",
            slug: "procreate"
        },
        {
          
            databaseId: 9,
            id: "dGVybTo5",
            name: "Tutorials",
            slug: "tutorials"
        }
      ],
    tags: [
        {
          
            name: "3D lettering",
            slug: "3d-lettering"
        },
        {
          
            name: "candy cane",
            slug: "candy-cane"
        },
        {
          
            name: "candy cane lettering",
            slug: "candy-cane-lettering"
        },
        {
          
            name: "design",
            slug: "design"
        },
        {
          
            name: "doodle",
            slug: "doodle"
        },
        {
          
            name: "every tuesday",
            slug: "every-tuesday"
        },
        {
          
            name: "every tuesday tutorial",
            slug: "every-tuesday-tutorial"
        },
        {
          
            name: "free",
            slug: "free"
        },
        {
          
            name: "freebie",
            slug: "freebie"
        },
        {
          
            name: "highlights",
            slug: "highlights"
        }
      ],
    seo: {
      title: "Create Candy Cane Lettering in Procreate - Every-Tuesday",
      opengraphPublishedTime: "2021-11-30T14:36:00+00:00",
      opengraphModifiedTime: "2022-05-20T01:15:37+00:00",
      metaDesc: "This week we are creating candy cane lettering entirely in Procreate! Read on for the free color palette, brushes used and simple process!",
      readingTime: 2
    },
    author: {
      avatar: {
        height: 96,
        url: "https://secure.gravatar.com/avatar/64857a955396b7ae5131db1265407d77?s=96&d=mm&r=g",
        width: 96
      },
      id: "dXNlcjox",
      name: "Teela",
      slug: "teelac",
      uri: "/author/teelac/"
    },
    etSocialNav: {
      pinterestMeta: {
        description: "Create Candy Cane Lettering in Procreate  | video tutorial: etheadlessdev.wpengine.com"
      },
      pinterestImage: {
        altText: "Create Candy Cane Lettering in Procreate",
        sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest.jpg",
        srcSet: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-333x500.jpg 333w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-683x1024.jpg 683w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-67x100.jpg 67w, https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest.jpg 1000w",
        sizes: "(max-width: 333px) 100vw, 333px",
        id: "cG9zdDoxMDA4NA==",
        mimeType: "image/jpeg",
        mediaDetails: {
          width: 333,
          height: 500,
          sizes: [
            {
              width: "1000",
              file: "create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
              height: "749",
              name: "headless_post_thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "600",
              file: "create-candy-cane-lettering-in-procreate-pinterest-600x360.jpg",
              height: "360",
              name: "headless_resource_image",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-600x360.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "20",
              file: "create-candy-cane-lettering-in-procreate-pinterest-20x20.jpg",
              height: "20",
              name: "placeholder",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-20x20.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1000",
              file: "create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
              height: "749",
              name: "headless_ipad",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x749.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "150",
              file: "create-candy-cane-lettering-in-procreate-pinterest-150x150.jpg",
              height: "150",
              name: "thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-150x150.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "333",
              file: "create-candy-cane-lettering-in-procreate-pinterest-333x500.jpg",
              height: "500",
              name: "medium",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-333x500.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "683",
              file: "create-candy-cane-lettering-in-procreate-pinterest-683x1024.jpg",
              height: "1024",
              name: "large",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-683x1024.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "67",
              file: "create-candy-cane-lettering-in-procreate-pinterest-67x100.jpg",
              height: "100",
              name: "et_thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-67x100.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "550",
              file: "create-candy-cane-lettering-in-procreate-pinterest-550x550.jpg",
              height: "550",
              name: "readanddigest_square",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-550x550.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "800",
              file: "create-candy-cane-lettering-in-procreate-pinterest-800x600.jpg",
              height: "600",
              name: "readanddigest_landscape",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-800x600.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "600",
              file: "create-candy-cane-lettering-in-procreate-pinterest-600x800.jpg",
              height: "800",
              name: "readanddigest_portrait",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-600x800.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "128",
              file: "create-candy-cane-lettering-in-procreate-pinterest-128x86.jpg",
              height: "86",
              name: "readanddigest_thumb",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-128x86.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1000",
              file: "create-candy-cane-lettering-in-procreate-pinterest-1000x580.jpg",
              height: "580",
              name: "readanddigest_single_post_title",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x580.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "1000",
              file: "create-candy-cane-lettering-in-procreate-pinterest-1000x550.jpg",
              height: "550",
              name: "readanddigest_large_width",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-1000x550.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "550",
              file: "create-candy-cane-lettering-in-procreate-pinterest-550x1100.jpg",
              height: "1100",
              name: "readanddigest_large_height",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-550x1100.jpg",
              mimeType: "image/jpeg"
            },
            {
              width: "421",
              file: "create-candy-cane-lettering-in-procreate-pinterest-421x203.jpg",
              height: "203",
              name: "wp_rp_thumbnail",
              sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/create-candy-cane-lettering-in-procreate-pinterest-421x203.jpg",
              mimeType: "image/jpeg"
            }
          ]
        }
      }
    },
    relatedPosts: [
      mockRelatedPost,
      mockRelatedPost,
      mockRelatedPost
    ],
    tutorialManager: {
      status: "success",
      postExcerpt: "<p>Happy Tuesday! Time for tutorial no.3 (of 6!) in my holiday tutorial series! This week, we’re creating candy cane lettering, complete with wrapped peppermints and decorative, wintery swirls.</p>\n",
      thumbnail: {
        type: 'make',
        image: {
          mimeType: "image/jpeg",
          altText: "test -3",
          sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3.jpg",
          srcSet: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-500x444.jpg 500w, https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3.jpg 1000w",
          sizes: "(max-width: 500px) 100vw, 500px",
          id: "cG9zdDoxMDQxNw==",
          mediaDetails: {
            width: 500,
            height: 444,
            sizes: [
              {
                width: "1000",
                file: "thumb-test-3-1000x749.jpg",
                height: "749",
                name: "headless_post_thumbnail",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-1000x749.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "600",
                file: "thumb-test-3-600x360.jpg",
                height: "360",
                name: "headless_resource_image",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-600x360.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "20",
                file: "thumb-test-3-20x20.jpg",
                height: "20",
                name: "placeholder",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-20x20.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "500",
                file: "thumb-test-3-500x444.jpg",
                height: "444",
                name: "medium",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-500x444.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "150",
                file: "thumb-test-3-150x150.jpg",
                height: "150",
                name: "thumbnail",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-150x150.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "1000",
                file: "thumb-test-3-1000x749.jpg",
                height: "749",
                name: "headless_ipad",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-1000x749.jpg",
                mimeType: "image/jpeg"
              },
              {
                width: "120",
                file: "thumb-test-3-120x120.jpg",
                height: "120",
                name: "yarpp-thumbnail",
                sourceUrl: "https://etheadless.local/wp-content/uploads/2021/11/thumb-test-3-120x120.jpg",
                mimeType: "image/jpeg"
              }
            ]
          }
        }
      },
      colorPalette: {
          downloadUrl: "http://bit.ly/polaroids-swatch",
          iconBackgroundColor: "#00998e",
          iconTextColor: "#ffffff"
        },
      paidProducts: [
        {...mockPaidProduct}
      ],
      youtube: {
        embedUrl: "https://www.youtube.com/embed/tZce1wvLzDE"
      },
      downloads: mockTutorialManagerDownloads
    },
    comments: {
      pageInfo: {
        endCursor: 'null',
        hasNextPage: false
      },
      list: []
    }
}

