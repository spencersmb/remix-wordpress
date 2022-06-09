import { ckFormIds } from "@App/lib/convertKit/formIds";

/**
 * @function mapResourceData
 * @tested - 6/8/2022
 * @description Map over Resource data, filter and return a clean object
 * 
 *
 **/
export const mapResourceData = (resourceItemRaw: IResourceDataRaw): IResourceItem => {
  return {
    ...resourceItemRaw,
    // id: resourceItemRaw.id,
    // date: resourceItemRaw.date,
    // freebie: resourceItemRaw.freebie,
    // title: resourceItemRaw.title,
    categories: resourceItemRaw.categories.edges.map(({ node }) => node),
    subCategories: resourceItemRaw.subCategories.edges.map(({ node }) => node),
    tags: resourceItemRaw.tags.edges.map(tag => tag.node),
    featuredImage: resourceItemRaw.featuredImage ? resourceItemRaw.featuredImage.node : null
  }
}

/**
 * @function flattenResourceData
 * @tested - 6/8/2022
 * @description Go over all the resourceItems and flatten the data to remove edges and nodes from the keys
 * 
 *
 **/
export const flattenResourceData = (resourceData: IMapResourceData): IResourceItem[] | boolean => {
  const dataFiltered = resourceData?.edges?.map(({ node}) => node);
  return Array.isArray(dataFiltered) && dataFiltered.map(mapResourceData)
}

/**
 * @function flattenResourceData
 * @tested - 6/8/2022
 * @description Get the CK Form ID for the type of form passed in as a string.
 * 
 *
 **/
export function getCKFormId(type: string | null): string {
  switch (type) {
    case 'footer':
      return ckFormIds.resourceLibrary.footer
    default:
      return ckFormIds.resourceLibrary.landingPage
  }
}
