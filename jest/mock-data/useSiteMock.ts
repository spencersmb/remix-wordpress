import { BreakpointEnums } from "@App/enums/breakpointEnums";
import { ShopPlatformEnum } from "@App/enums/products";
import type { ISiteContextState } from "@App/hooks/useSite";
import { siteAuthor, socialUrls } from "@App/lib/wp/site";

export const mockSiteInfo = {
  description: "Graphic Design Tips, Tricks, Tutorials and Freebies",
  language: "En",
  title: "Every-Tuesday",
  shopPlatform: ShopPlatformEnum.GUMROAD,
  author: siteAuthor.author,
  siteTitle: "Every-Tuesday",
}
export const mockUseSiteData_default: ISiteContextState = {
  recentPosts: [],
  categories:[],
  metadata: {
    ...mockSiteInfo,
    domain: '',
    social: {
      youtube: socialUrls.youtube,
      twitter: {
        username: "teelacunningham",
        cardType: "summary",
        url: socialUrls.twitter
      },
      pinterest: socialUrls.pinterest,
      instagram: socialUrls.instagram,
      facebook: socialUrls.facebook,
    },
    serverSettings:{
      productPlatform: ShopPlatformEnum.GUMROAD,
    },
    courseLaunchBanners:{
      basicBanner:{
        showBanner: 'false',
        color: 'null',
        endDate: 'null',
        title: 'null',
        url: 'null'
      },
      lfmBanner:{
        showBanner: 'false',
        endDate: 'null',
        nextLaunchDate: 'null',
        minicourseSignup: true
      }
    }
  },
  menu:[],
  user: {
    resourceUser: null,
    wpAdmin: false
  },
  modal:{
    open: false,
    component: null
  },
  commentsModal:{
    show: false,
    commentOn: 0,
    comments: [],
    pageInfo: {
      hasNextPage: false,
      endCursor: ''
    }
  },
  breakpoint: BreakpointEnums.mobile,
  breakpointLoaded: false,
  nav: {
    mobileNav: {
      isOpen: false
    }
  }
}