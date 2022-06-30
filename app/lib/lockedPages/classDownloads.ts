import { lockedPageEnumSlugs } from "@App/enums/lockedPages";
import { getStaticPageMeta } from "@App/utils/pageUtils";

export const lockedPagesMeta: ILockedPage = {
  [lockedPageEnumSlugs.beautifulLettering]: {
    page: getStaticPageMeta({
      title: `Beautiful Lettering Bonus Downloads`,
      desc: `Beautiful Lettering Bonus Downloads`,
      slug: lockedPageEnumSlugs.beautifulLettering,
    }),
    membersPage: getStaticPageMeta({
      title: `Beautiful Lettering Bonus Downloads Members Area`,
      desc: `Beautiful Lettering Bonus Downloads members only access!`,
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