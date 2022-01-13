import { MetaFunction } from "remix";
import { lockedPageEnumSlugs } from "~/enums/lockedPages";
import { getStaticPageMeta } from "./pageUtils";
import { getHtmlMetadataTags } from "./seo";

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

export const getlockedPageMetaTags: MetaFunction = (rootData): any => {

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
    page: skillshare.page,
    location
  })
};