import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from '@remix-run/node'
import { ckSignUpCookie } from "~/cookies.server";
import { findCookie } from "~/utils/loaderHelpers";
import { createResourceUserSession, getConvertKitUserByID, getConvertKitUserIdByEmail, getConvertKitUserTags } from "~/utils/resourceLibrarySession.server";
import useSite from "~/hooks/useSite";
import useTuesdayMakersClientSideLogin from "~/hooks/useTuesdayMakersClientSideLogin";

export let loader: LoaderFunction = async ({ request }) => {
  const customHeaders = new Headers()

  // check for Signup Cookie
  //If not found return error {msg: , status}
  const { hasCookie, data, expired } = await findCookie<{ userID: number, email: string }>(request, ckSignUpCookie)
  if (!hasCookie) {
    return json({
      status: 400,
      message: "No Signup Cookie Found"
    })
  }

  // If user data is expired then return error
  console.log('cookie expired', expired);

  if (expired) {
    return json({
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
      console.log('attempt 2');

      subscriberID = await getConvertKitUserIdByEmail(email)
    }, 600)

    if (subscriberID === null) {
      return json({
        status: 400,
        message: "No ConvertKit User Found or is inactive"
      })
    }
    return json({
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