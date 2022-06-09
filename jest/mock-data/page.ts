import { mockFeaturedImage } from "./images";
import { mockAuthorData, mockSeo } from "./posts";

export const mockPage: IPage = {
  seo: {
    title: "Page Title",
    metaDesc: "Page description",
    opengraphModifiedTime: "2020-01-01T00:00:00.000Z",
    opengraphPublishedTime: "2020-01-01T00:00:00.000Z",
    readingTime: 1
  },
  title: "Page Title",
  slug: "page-slug",
  content: "Page Content",
  author: mockAuthorData,
  featuredImage: mockFeaturedImage,
  date: "2020-01-01",
  id: "page-id",
}