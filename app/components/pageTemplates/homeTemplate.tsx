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

interface Props {
  courses: ICourse[]
  posts: IPost[]
}

function HomeTemplate(props: Props) {
  const { courses, posts } = props

  return (
    <div className={`remix__page`}>

      <TransformSkillsHeader />

      {/* <ClientOnly fallback={<p>Loading...</p>}>
        {() => <IpadVerticalAnimation />}
      </ClientOnly> */}

      <StartHere />

      <FeatureCourses courses={courses} />

      <LfmMiniCourse />

      <ProcreateBrushes />

      <FeaturedBlogPosts posts={posts} />

      <AboutMeFeature />

    </div>
  )
}

export default HomeTemplate
