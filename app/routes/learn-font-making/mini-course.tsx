import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { lfmMiniCourseCookie } from '@App/cookies.server'
import { findCookie } from '@App/utils/loaderHelpers'
import { consoleHelper } from '@App/utils/windowUtils';
import { isEmpty } from 'lodash';
import MiniCourseBanner from '@App/components/lfm/mini-course/miniCourseBanner';
import Layout from '@App/components/layoutTemplates/layout';
import LfmMiniCourseNavMobile from '@App/components/lfm/mini-course/nav/miniCourseNav';
import useSite from '@App/hooks/useSite';
import useScript from '@App/hooks/useScript';

export interface IlfmMiniCourseCookie {
  video1: boolean
  video2: boolean
  video3: boolean
}
export let loader: LoaderFunction = async ({ request }) => {
  // TODO: GET COOKIE DATA FUNCTION
  // ADD IN TOP LEVEL
  // THEN FIND WITH USE MATCHES To UNLOCK PAGE
  const cookie = await findCookie<IlfmMiniCourseCookie>(request, lfmMiniCourseCookie)

  return json({ ...cookie })
}
interface IDataType {
  hasCookie: boolean
  data: {
    video1: boolean
    video2: boolean
    video3: boolean
  } | null
}
function LfmMiniCourse(props: any) {
  const { data }: IDataType = useLoaderData()
  consoleHelper('minicourse home page', data)
  const wistaScript1 = `https://fast.wistia.com/embed/medias/ayi4qjw2at.jsonp`
  const wistaScript2 = `https://fast.wistia.com/assets/external/E-v1.js`
  useScript(wistaScript1)
  useScript(wistaScript2)

  if (isEmpty(data)) {
    return <Layout>
      <MiniCourseBanner showForm={true} />
    </Layout>
  }
  return (
    <Layout>

      <LfmMiniCourseNavMobile {...data} />

      <Outlet context={{ cookie: { ...data } }} />

    </Layout>
  )
}

export default LfmMiniCourse
