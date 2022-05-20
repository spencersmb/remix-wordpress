import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from '@remix-run/node'
import { ckSignUpCookie } from "~/cookies.server";
import { findCookie } from "~/utils/loaderHelpers";
import { createResourceUserSession, getConvertKitUserByID, getConvertKitUserIdByEmail, getConvertKitUserTags } from "~/utils/resourceLibrarySession.server";
import useTuesdayMakersClientSideLogin from "~/hooks/useTuesdayMakersClientSideLogin";
import { getBasicPageMetaTags } from "~/utils/seo";

export let meta: MetaFunction = (metaData): any => {

  /*
  rootData gets passed in from the root metadata function
   */
  const { data, location, parentsData } = metaData
  if (!data || !parentsData || !location) {
    return {
      title: '404',
      description: 'error: No metaData or Parents Data',
    }
  }

  /*
  Build Metadata tags for the page
   */
  return getBasicPageMetaTags(metaData, {
    title: `Tuesday Makers: Thank You Page`,
    desc: `Thank you for signing up for Tuesday Makers!`,
    slug: `tuesday-makers/thank-you`
  })
};

export let loader: LoaderFunction = async ({ request }) => {
  const customHeaders = new Headers()

  const page = {
    title: 'Tuesday Makers: Thank You for Signing Up',
    slug: 'tuesday-makers/thank-you',
    description: 'Thank you for signing up for Tuesday Makers!',
    seo: {
      title: 'Tuesday Makers: Thank You for Signing Up',
      opengraphModifiedTime: '',
      metaDesc: 'Thank you for signing up for Tuesday Makers!'
    }
  }

  // check for Signup Cookie
  //If not found return error {msg: , status}
  const { hasCookie, data, expired } = await findCookie<{ userID: number, email: string }>(request, ckSignUpCookie)
  if (!hasCookie) {
    return json({
      page,
      status: 400,
      message: "No Signup Cookie Found"
    })
  }

  // If user data is expired then return error
  console.log('cookie expired', expired);

  if (expired) {
    return json({
      page,
      status: 400,
      message: "Cookie Expired, please signup again"
    })
  }

  console.log('cookie data', data);
  // If found get the user data from it
  const { userID, email } = data // signup ID = 1743335665

  // Try to log user into ConvertKit using email, create login cookie and save to headers
  let subscriberID = await getConvertKitUserIdByEmail(email)

  if (subscriberID === null) {

    // try again
    setTimeout(async () => {
      console.log('-----------------');
      console.log('attempt 2');
      console.log('-----------------');

      subscriberID = await getConvertKitUserIdByEmail(email)
    }, 600)

    if (subscriberID === null) {
      return json({
        page,
        status: 400,
        message: "No ConvertKit User Found or is inactive"
      })
    }
    return json({
      page,
      status: 400,
      message: "No ConvertKit User Found or is inactive"
    })
  }

  // Get CK user Tags
  const ckUserTags = await getConvertKitUserTags(subscriberID)

  console.log('ckUserID', subscriberID);
  console.log('ckUserTags', ckUserTags);

  let user = {
    id: subscriberID,
    tags: ckUserTags
  }

  // Create new user Session
  let sessionStorage = createResourceUserSession(user)
  customHeaders.append('Set-Cookie', await sessionStorage)

  // Delete signup cookie
  customHeaders.append('Set-Cookie', await ckSignUpCookie.serialize({ ...data }, { maxAge: 0 }))

  return json({
    status: 200,
    message: "Loggin Successful",
    page,
    user
  }, {
    headers: customHeaders
  })

  // If not successful then return error


}

const TuesdayMakersThankYou = () => {

  const data = useLoaderData()
  useTuesdayMakersClientSideLogin(data.user, data.status)

  return (
    <div>
      <p>Status: {data.status}</p>
      <p>Msg: {data.message}</p>
    </div>
  )

}

export default TuesdayMakersThankYou;