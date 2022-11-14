import type { Params } from "react-router";
import { getHtmlMetadataTags } from "./seo";
import type { Location } from "history";
import { lockedPagesMeta } from "@App/lib/lockedPages/classDownloads";
import type { AppData } from "@remix-run/react/dist/data";
import type { RouteData } from "@remix-run/react/dist/routeData";


type MetaMembers = (args: {
        data: AppData;
        parentsData: RouteData;
        params: Params;
        location: Location;
    }, locked?:{membersPage: boolean}) => any

const parentPath = 'class-downloads'

/**
 * @function getlockedPageMetaTags
 * @tested - 6/6/2022
 * 
 * @description Helper function that gets the static META DATA for both logged in and logged out pages
 * 
 */
export const getlockedPageMetaTags: MetaMembers = (rootData, locked = undefined) => {

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

/**
 * @function getLockedPageRedirectMembersPath
 * @tested - 6/6/2022
 * 
 * @description Helper function to get the redirect path for the members page
 * ex: /class-downloads/bl/members
 * 
 * 
 */
export function getLockedPageRedirectMembersPath(slug: string): string {
  return `/${parentPath}/${slug}/members`
}

/**
 * @function getLockedPageRedirectLogoutPath
 * @tested - 6/6/2022
 * 
 * @description Helper function to get the redirect path for the members page
 * ex: /class-downloads/bl
 * 
 * 
 */
export function getLockedPageRedirectLogoutPath(slug: string): string {
  // ex: /class-downloads/bl
  return `/${parentPath}/${slug}`
}