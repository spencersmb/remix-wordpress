import { json, LoaderFunction } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import React from 'react'
import { lfmMiniCourseCookie } from '~/cookies.server'
import { findCookie } from '~/utils/loaderHelpers'

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
  return (
    <div>
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
      <footer>
        LFM MiniCourse Footer
      </footer>
    </div>
  )
}

export default LfmMiniCourse
