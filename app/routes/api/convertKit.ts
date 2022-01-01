import { ActionFunction, json, LoaderFunction, redirect } from 'remix'
import { validateEmail } from '~/utils/validation'
import { consoleHelper } from '~/utils/windowUtils'
import { ckFormIds } from '~/lib/convertKit/formIds'
import { redirectBack } from 'remix-utils'
import { commitSession, getSession } from '~/sessions.server'
//
// export let loader: LoaderFunction = async({request}) => {
//   const session = await getSession(
//     request.headers.get("Cookie")
//   );
//   const ses = session.get("globalMessage")
//   const message = ses || null;
//   console.log('ses', ses)
//   console.log('message', message)
//   console.log('ref loadder', request.headers.get("Referer"))
//
//   // return json(
//   //   { message },
//   //   {
//   //     headers: {
//   //       // only necessary with cookieSessionStorage
//   //       "Set-Cookie": await commitSession(session)
//   //     }
//   //   }
//   // );
//
//   return redirect('/',{
//     headers: {
//       "Set-Cookie": await commitSession(session)
//     },
//   })
// }

export let action: ActionFunction = async ({ request }) => {

  let form = await request.formData();
  let email = form.get('email')
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof email !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }

  let fields = { email };
  let fieldErrors = {
    email: validateEmail(email)
  };

  consoleHelper('fieldErrors', fieldErrors)
  const id = ckFormIds.resourceLibrary.landingPage
  const url = `https://api.convertkit.com/v3/forms/${id}/subscribe`;

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };

  const session = await getSession(
    request.headers.get('Cookie')
  )

  session.flash(
    "globalMessage",
    {
      status: 'success',
      message: `Project successfully archived`
    }
  );
  //
  // try {
  //   // Sign user up
  //   const res = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       api_key: process.env.CK_KEY,
  //       email,
  //     }),
  //   })
  //
  //   return json({ form: 'success' })
  // } catch (e) {
  //   return json({ form: 'fail' })
  // }

  // return redirect('/',{
  //   headers: {
  //     "Set-Cookie": await commitSession(session)
  //   },
  // })
  // console.log('ref action' ,request.headers.get("Referer"))
  return redirectBack(request,
    {
      headers: {
        "Set-Cookie": await commitSession(session)
      },
      fallback: "/",}
  );

}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
  };
  fields?: {
    email: string;
  }
  form?: string
};
