import { RouteData } from "@remix-run/react/routeData";
import { Params } from "react-router";
import { AppData, MetaFunction } from "remix";
import { lockedPageEnumSlugs } from "~/enums/lockedPages";
import { getStaticPageMeta } from "./pageUtils";
import { getHtmlMetadataTags } from "./seo";
import type { Location } from "history";

interface ILockedPage {
  [id: string]: {
    page: IPage
    membersPage: IPage
  }
}

export const lockedPagesMeta: ILockedPage = {
  [lockedPageEnumSlugs.beautifulLettering]: {
    page: getStaticPageMeta({
      title: `Beautiful Lettering Bonus Downloads`,
      desc: `Beautiful Lettering Bonus Downloads members only access!`,
      slug: lockedPageEnumSlugs.beautifulLettering,
    }),
    membersPage: getStaticPageMeta({
      title: `PBeautiful Lettering Bonus Downloads Members Area`,
      desc: `PBeautiful Lettering Bonus Downloads members only access!`,
      slug: lockedPageEnumSlugs.beautifulLettering,
    })
  },
  [lockedPageEnumSlugs.procreate5x]: {
    page: getStaticPageMeta({
      title: `Procreate 5x Bonus Downloads`,
      desc: `Procreate 5x Bonus Downloads members only access!`,
      slug: lockedPageEnumSlugs.procreate5x,
    }),
    membersPage: getStaticPageMeta({
      title: `Procreate 5x Bonus Downloads Members Area`,
      desc: `Procreate 5x Bonus Downloads members area!`,
      slug: lockedPageEnumSlugs.procreate5x,
    })
  },
  [lockedPageEnumSlugs.procreateFlorals]: {
    page: getStaticPageMeta({
      title: `Procreate Florals Class Bonus Downloads`,
      desc: `Procreate Florals Class Bonus Downloads members only access!`,
      slug: lockedPageEnumSlugs.procreateFlorals,
    }),
    membersPage: getStaticPageMeta({
      title: `Procreate Florals Class Bonus Downloads Members Area`,
      desc: `Procreate Florals Class Bonus Downloads members area!`,
      slug: lockedPageEnumSlugs.procreateFlorals,
    })
  },
  [lockedPageEnumSlugs.procreateWatercolors]: {
    page: getStaticPageMeta({
      title: `Procreate Watercolors Class Bonus Downloads`,
      desc: `Procreate Watercolors Class Bonus Downloads members only access!`,
      slug: lockedPageEnumSlugs.procreateWatercolors,
    }),
    membersPage: getStaticPageMeta({
      title: `Procreate Watercolors Class Bonus Downloads Members Area`,
      desc: `Procreate Watercolors Class Bonus Downloads members area!`,
      slug: lockedPageEnumSlugs.procreateWatercolors,
    })
  },
  [lockedPageEnumSlugs.threeDLettering]: {
    page: getStaticPageMeta({
      title: `Procreate 3d Lettering Class Bonus Downloads`,
      desc: `Procreate 3d Lettering Class Bonus Downloads members only access!`,
      slug: lockedPageEnumSlugs.threeDLettering,
    }),
    membersPage: getStaticPageMeta({
      title: `Procreate 3d Lettering Class Bonus Downloads Members Area`,
      desc: `Procreate 3d Lettering Class Bonus Downloads members area!`,
      slug: lockedPageEnumSlugs.threeDLettering,
    })
  },
  [lockedPageEnumSlugs.etAffiliates]: {
    page: getStaticPageMeta({
      title: `Every Tuesday Affiliate Asset Downloads`,
      desc: `Every Tuesday Affiliate Asset Downloads for cross promotions.`,
      slug: lockedPageEnumSlugs.etAffiliates,
    }),
    membersPage: getStaticPageMeta({
      title: `Every Tuesday Affiliate Asset Downloads`,
      desc: `Every Tuesday Affiliate Asset Downloads for cross promotions.`,
      slug: lockedPageEnumSlugs.etAffiliates,
    })
  },
  [lockedPageEnumSlugs.lfmAffiliates]: {
    page: getStaticPageMeta({
      title: `Learn Font Making Affiliate Asset Downloads`,
      desc: `Learn Font Making Affiliate Asset Downloads`,
      slug: lockedPageEnumSlugs.lfmAffiliates,
    }),
    membersPage: getStaticPageMeta({
      title: `Learn Font Making Affiliate Asset Downloads`,
      desc: `Learn Font Making Affiliate Asset Downloads`,
      slug: lockedPageEnumSlugs.lfmAffiliates,
    })
  },
}

type MetaMembers = (args: {
        data: AppData;
        parentsData: RouteData;
        params: Params;
        location: Location;
    }, locked?:{membersPage: boolean}) => any

export const getlockedPageMetaTags: MetaMembers = (rootData, locked = undefined): any => {

  /*
  rootData gets passed in from the root metadata function
   */
  const { data, location, parentsData, params } = rootData

  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }
  const lookUpSlug = params.slug;
  if (!lookUpSlug) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  const lockedMeta = lockedPagesMeta[lookUpSlug]

  if (!lockedMeta) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  /*
  Build Metadata tags for the page
   */
  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    page: locked ? lockedMeta.membersPage : lockedMeta.page,
    location
  })
};

const parentPath = 'class-downloads'
export function getLockedPageRedirectMembersPath(slug: string): string {
  // ex: /class-downloads/bl
  return `/${parentPath}/${slug}/members`
}

export function getLockedPageRedirectLogoutPath(slug: string): string {
  // ex: /class-downloads/bl
  return `/${parentPath}/${slug}`
}