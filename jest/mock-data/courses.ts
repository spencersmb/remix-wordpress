import { mockFeatureImageComplete } from "./images";

export const mockCourseRaw:ICourseRaw = {
  id: 1,
  details:{
    courseTags: [
      {
        tag: 'tag1'
      }
    ],
    courseUrl: 'https://www.example.com'
  },
  slug: 'course-slug',
  title: 'Course Title',
  featuredImage: {
    node: {
      ...mockFeatureImageComplete
    }
  }
}

export const mockCourse: ICourse = {
  id: 1,
  details:{
    courseTags: ['tag1'],
    courseUrl: 'https://www.example.com'
  },
  slug: 'course-slug',
  title: 'Course Title',
  featuredImage: mockFeatureImageComplete
}