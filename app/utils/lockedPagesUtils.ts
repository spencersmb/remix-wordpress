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
      title: `Beautiful Lettering Bonus Downloads - Every-Tuesday`,
      desc: `Beautiful Lettering Bonus Downloads members only access!`,
      slug: lockedPageEnumSlugs.beautifulLettering,
    }),
    membersPage: getStaticPageMeta({
      title: `Procreate 5x Bonus Downloads Members Area`,
      desc: `Procreate 5x Bonus Downloads members only access!`,
      slug: lockedPageEnumSlugs.beautifulLettering,
    })
  }
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

  const skillshare = lockedPagesMeta[lookUpSlug]

  if (!skillshare) {
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
    page: locked ? skillshare.membersPage : skillshare.page,
    location
  })
};

const parentPath = 'cd'
export function getLockedPageRedirectMembersPath(slug: string): string {
  // ex: /class-downloads/bl
  return `/${parentPath}/${slug}/members`
}

export function getLockedPageRedirectLogoutPath(slug: string): string {
  // ex: /class-downloads/bl
  return `/${parentPath}/${slug}`
}