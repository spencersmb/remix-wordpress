import { json, LoaderFunction, redirect } from "remix"
import { lfmMiniCourseCookie } from "~/cookies.server"

export let loader: LoaderFunction = async ({request}) => {
  const url = new URL(request.url)
  const videoParam = url.searchParams.get("video")
  const customHeaders = new Headers()

  switch(videoParam){
    case '1':
      customHeaders.append('Set-Cookie', await lfmMiniCourseCookie.serialize({
        video1: true
      }))
      return redirect('/learn-font-making/mini-course/video1', {
        headers: customHeaders
      })
    case '2':
      customHeaders.append('Set-Cookie', await lfmMiniCourseCookie.serialize({
        video1: true,
        video2: true
      }))
      return redirect('/learn-font-making/mini-course/video1', {
        headers: customHeaders
      })
    case '3':
      customHeaders.append('Set-Cookie', await lfmMiniCourseCookie.serialize({
        video1: true,
        video2: true,
        video3: true
      }))
      return redirect('/learn-font-making/mini-course/video1', {
        headers: customHeaders
      })
    default:
      return redirect('/learn-font-making/mini-course')
  }

}