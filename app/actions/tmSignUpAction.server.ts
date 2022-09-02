import { ckSignUpCookie } from '@App/cookies.server';
import { fetchConvertKitSignUp } from '@App/utils/fetch.server';
import { getCKFormId } from '@App/utils/resourceLibraryUtils';
import { validateEmail } from '@App/utils/validation';
import { consoleHelper } from '@App/utils/windowUtils';
import { json } from '@remix-run/node';


/**
 * 
 * @function MakersSignupAction 
 * @tested 8/6/2022  
 */
export async function MakersSignupAction<T>(request: Request): Promise<Response> {
  const customHeaders = new Headers()
  let form = await request.formData();
  let email = form.get('email')
  let formType = form.get('_action') as string
  let honeyPot = form.get('lastName')

  const ckId = getCKFormId(formType)

  if (!formType) {
    console.error('RemixSignUpAction: formType is null')
    return json({
      status: 500,
      message: 'No form type provided',
    })
  }

  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof email !== "string" || 
    validateEmail(email) !== undefined
  ) {
    return json({
      formError: {
        [formType]: {
          message: 'Email Error',
          formId: 'error'
        }
      },
    })
  }

  if (
    typeof honeyPot !== "string" ||
    honeyPot.length !== 0
  ) {
    return json({
      formError: {
        [formType]: {
          message: 'No last name provided',
          formId: 'error'
        }
      },
    })
  }

  let fields = { email };
  let fieldErrors = {
    email: validateEmail(email)
  };

  consoleHelper('fieldErrors', fieldErrors, '/routes/tuesday-makers/index.tsx', { bg: '#cc2c5c', text: '#fff' })

  if (Object.values(fieldErrors).some(Boolean))
    return json({ fieldErrors, fields });

  // Intercept the request and respond with a fake response when testing
  if (process.env.NODE_ENV === 'test') {
    return json({
      form: {
        [formType]: {
          message: 'success',
          formId: formType
        }
      }
    })
  }

  try {

    // Sign user up
    const fetch = await fetchConvertKitSignUp({ email, id: ckId })

    // Add temporary cookie to browser to process on thankyou page
    customHeaders.append('Set-Cookie', await ckSignUpCookie.serialize({
      userID: fetch.subscription.subscriber.id,
      email,
    }))

    return json({
      form: {
        [formType]: {
          message: 'success',
          email,
          formId: formType,
          // fetch
        }
      }
    },{
      headers: customHeaders
    })
  } catch (error: any) {
    console.error(error.message)
    console.error(error.response)
    return json({
      formError: {
        [formType]: {
          message: `Something went wrong. Please try again later. Error: ${error.message}`,
          formId: formType
        }
      }
    })
  }

}