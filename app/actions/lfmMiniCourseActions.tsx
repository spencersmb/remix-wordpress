import { ckFormIds } from "@App/lib/convertKit/formIds";
import { validateEmail } from "@App/utils/validation";
import { json } from "@remix-run/node";

/**
 * 
 * @function lfmMiniCourseSignUpAction 
 * @tested   
 */
export async function lfmMiniCourseSignUpAction(request: Request): Promise<Response> {

  let form = await request.formData();
  let formType = form.get('_action') as string | null
  let formStatus = form.get('_openstatus') as string
  let email = form.get('email')
  let honeyPot = form.get('lastName')

  if (!formType) {
    console.error('lfmMiniCourseSignUpAction: formType is null')
    return json({
      status: 500,
      message: 'No form type provided',
    })
  }

  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof email !== "string" ||
    typeof honeyPot !== "string" ||
    honeyPot.length !== 0
  ) {
    return json({
      formError: {
        [formType]: {
          message: 'No email provided',
          formId: 'error'
        }
      },

    })
  }

  let fields = { email };
  let fieldErrors = {
    email: validateEmail(email)
  };

  const id = formStatus === 'true'
    ? ckFormIds.miniCourse.signUp
    : ckFormIds.miniCourse.getNotified
  const url = `https://api.convertkit.com/v3/forms/${id}/subscribe`;

  if (Object.values(fieldErrors).some(Boolean))
    return json({ fieldErrors, fields });

  // Intercept the request and respond with a fake response when testing
  if (process.env.NODE_ENV === 'test') {
    return json({
      form: {
        [formType]: {
          message: 'success',
          formId: id
        }
      }
    })
  }

  // Sign user up
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.CK_KEY,
        email,
      }),
    })

    return json({
      form: {
        [formType]: {
          message: 'success',
          formId: id
        }
      }
    })
  } catch (error: any) {
    console.error(error.message)
    console.error(error.response)
    return json({
      formError: {
        [formType]: {
          message: `Something went wrong. Please try again later. Error: ${error.message}`,
          formId: id
        }
      }
    })
  }
}