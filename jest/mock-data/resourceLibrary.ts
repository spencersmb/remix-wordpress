import { mockFeatureImageComplete } from "./images"

export const mockResourceLibraryItem:IResourceItem = {
  id: "1",
  date: "2020-01-01",
  featuredImage: mockFeatureImageComplete,
  categories: [
    {
      id: "cgAFQj9",
      databaseId: 1,
      name: "Category 1",
      slug: "category-1",
    }
  ],
  subCategories: [
    {
      id: "cgAFQj9",
      databaseId: 1,
      name: "Sub Category 1",
      slug: "Sub category-1",
    }
  ],
  tags: [],
  freebie: {
    downloadLink: '',
    excerpt: '',
    licenseRequired: false,
    product: null
  },
  title: 'mockResourceItemRaw'
}
export const mockCategoriesRaw:ICategoryRaw[] = [
  {
    node: {
      id: "cgAFQj9",
      databaseId: 1,
      name: "Category 1",
      slug: "category-1",
    }
  }
]
export const mockSubCategoriesRaw:ICategoryRaw[] = [
  {
    node: {
      id: "cgAFQj9",
      databaseId: 1,
      name: "Sub Category 1",
      slug: "Sub category-1",
    }
  }
]
export const mockResourceItemRaw:IResourceDataRaw = {
  id: '1',
  date: "2020-01-01",
  featuredImage: {
    node: mockFeatureImageComplete
  },
  categories: {
    edges: mockCategoriesRaw
  },
  subCategories:{
    edges: mockSubCategoriesRaw
  },
  tags:{
    edges: []
  },
  freebie: {
    downloadLink: '',
    excerpt: '',
    licenseRequired: false,
    product: null
  },
  title: 'mockResourceItemRaw'

}