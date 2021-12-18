import React from 'react'
import { json, Link, LoaderFunction, Outlet, useLoaderData } from 'remix'
import { lfmMiniCourseCookie } from '~/cookies.server'
import { Layout } from '~/root'
import { findCookie } from '~/utils/loaderHelpers'
import { consoleHelper } from '~/utils/windowUtils'
export interface IlfmMiniCourseCookie {
  hasCookie: boolean
  data: {
    video1: boolean
    video2: boolean
    video3: boolean
  }
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
  consoleHelper('data wrapper', data)
  return (
    <Layout>
      <nav>
        <ul className='flex flex-row'>
          <li>
            {data?.video1 && <Link to='/learn-font-making/mini-course/video1'>Video 1</Link>}
            {!data?.video1 && <>Video 1</>}
          </li>
          <li>
            {data?.video2 && <Link to='/learn-font-making/mini-course/video2'>Video 2</Link>}
            {!data?.video2 && <>Video 2</>}
          </li>
          <li>
            {data?.video3 && <Link to='/learn-font-making/mini-course/video3'>Video 3</Link>}
            {!data?.video3 && <>Video 3</>}
          </li>
        </ul>
      </nav>
      <Outlet context={{ cookie: { ...data } }} />
    </Layout>
  )
}

export default LfmMiniCourse
