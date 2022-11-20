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

export const mockCourse2: ICourse = {
  id: 2,
  details:{
    courseTags: ['tag2'],
    courseUrl: 'https://www.example2.com'
  },
  slug: 'course2-slug',
  title: 'Course2 Title',
  featuredImage: mockFeatureImageComplete
}

export const mockCourse3: ICourse = {
  id: 3,
  details:{
    courseTags: ['tag3'],
    courseUrl: 'https://www.example3.com'
  },
  slug: 'course3-slug',
  title: 'Course3 Title',
  featuredImage: mockFeatureImageComplete
}