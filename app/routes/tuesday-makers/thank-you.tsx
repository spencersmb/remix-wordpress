import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from '@remix-run/node'
import { ckSignUpCookie } from "@App/cookies.server";
import { findCookie } from "@App/utils/loaderHelpers";
import { createResourceUserSession, getConvertKitUserIdByEmail, getConvertKitUserTags } from "@App/utils/resourceLibrarySession.server";
import useTuesdayMakersClientSideLogin from "@App/hooks/useTuesdayMakersClientSideLogin";
import { mdxPageMeta } from "@App/utils/seo";
import ThankyouSuccessMessage from "@App/components/resourceLibrary/thankyou-success-message";
import ThankyouErrorMessage from "@App/components/resourceLibrary/thankyou-error-message";
import { getStaticPageMeta } from "@App/utils/pageUtils";


const page = getStaticPageMeta({
  title: 'Tuesday Makers: Thank You for Signing Up',
  slug: 'tuesday-makers/thank-you',
  desc: 'Thank you for signing up for Tuesday Makers!',
})
export let meta = mdxPageMeta

export let loader: LoaderFunction = async ({ request }) => {
  const customHeaders = new Headers()

  // check for Signup Cookie
  //If not found return error {msg: , status}
  const { hasCookie, data, expired } = await findCookie<{ userID: number, email: string }>(request, ckSignUpCookie)

  if (!hasCookie) {
    return json({
      page,
      status: 400,
      message: "Signup session has expired. Please try again."
    })
  }

  // If user data is expired then return error
  // console.log('cookie expired', expired);

  if (expired) {
    return json({
      page,
      status: 400,
      message: "Cookie Expired, please signup again"
    })
  }

  // console.log('cookie data', data);
  // If found get the user data from it
  const { userID, email } = data // signup ID = 1743335665

  // Try to log user into ConvertKit using email, create login cookie and save to headers
  let subscriberID = await getConvertKitUserIdByEmail(email)

  if (subscriberID === null) {

    // try again
    console.log('-----------------');
    console.log('attempt 2');
    console.log('-----------------');

    subscriberID = await getConvertKitUserIdByEmail(email, 600)

    if (subscriberID === null) {
      return json({
        page,
        status: 400,
        message: "No ConvertKit User Found or is inactive"
      })
    }
  }

  // Get CK user Tags
  const ckUserTags = await getConvertKitUserTags(subscriberID)

  // console.log('ckUserID', subscriberID);
  // console.log('ckUserTags', ckUserTags);

  let user = {
    email,
    id: subscriberID,
    tags: ckUserTags
  }

  // Create new user Session
  let sessionStorage = createResourceUserSession(user)
  customHeaders.append('Set-Cookie', await sessionStorage)

  // Delete signup cookie
  customHeaders.append('Set-Cookie', await ckSignUpCookie.serialize({ ...data }, { maxAge: 0, expires: new Date(0) }))

  return json({
    status: 200,
    message: "Login Successful",
    page,
    user
  }, {
    headers: customHeaders
  })

}

// TODO: TEST THIS
const TuesdayMakersThankYou = () => {

  const data = useLoaderData()

  useTuesdayMakersClientSideLogin(data.user, data.status)
  const fakeUser = {
    email: 'spencer.bigum@gmail.com',
    id: 123456,
    tags: ['tuesdaymakers', 'procreate']
  }



  return (
    <>
      {data.status === 200 && <ThankyouSuccessMessage user={data.user} />}
      {data.status !== 200 && <ThankyouErrorMessage message={data.message} />}
      {/* <ThankyouSuccessMessage user={fakeUser} /> */}
    </>
  )

}

export default TuesdayMakersThankYou;