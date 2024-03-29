import { navStyles } from '@App/utils/pageUtils'
import React from 'react'
import CourseCard from '../cards/courseCard'
import CourseHeader from '../courses/courseHeader'
import CourseHighQuality from '../courses/courseHighQuality'
import TransformSkillsHeader from '../headers/transformSkillsHeader'
import AboutMeFeature from '../homePage/aboutMeFeature'
import FeatureCourses from '../homePage/featureCourses'
import FeaturedBlogPosts from '../homePage/featuredBlogPosts'
import LfmMiniCourse from '../homePage/lfmMiniCourse'
import ProcreateBrushes from '../homePage/procreateBrushes'
import StartHere from '../homePage/startHere'
import YourInstructor from '../homePage/yourInstructor'

interface Props {
  courses: ICourse[]
  posts: IPost[]
}

function HomeTemplate(props: Props) {
  const { courses, posts } = props

  return (
    <>

      <TransformSkillsHeader />

      {/* <ClientOnly fallback={<p>Loading...</p>}>
        {() => <IpadVerticalAnimation />}
      </ClientOnly> */}

      <YourInstructor />

      <StartHere />

      <FeatureCourses courses={courses} />

      <LfmMiniCourse />

      <ProcreateBrushes />

      <FeaturedBlogPosts posts={posts} />

      <AboutMeFeature />

    </>
  )
}

export default HomeTemplate
