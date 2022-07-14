import ContactUsForm from "@App/components/forms/contact/contactUsForm";
import Layout from "@App/components/layoutTemplates/layout";
import { fetchAPI, fetchAPIOrigin, getOrigin } from "@App/utils/fetch.server";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { validateEmail } from "@App/utils/validation";
import { consoleHelper } from "@App/utils/windowUtils";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData } from '@remix-run/react'
import gql from "graphql-tag";
import { useEffect } from "react";

interface ServerRespons {
  sendEmail: {
    message: string
    origin: string
    sent: boolean
  }
}

interface FieldErrors {
  name: string | undefined,
  email: string | undefined
  subject: string | undefined
  body: string | undefined
}
export let action: ActionFunction = async ({ request }): Promise<ContactActionData | Response> => {
  let form = await request.formData();
  let name = form.get('name')
  let email = form.get('email')
  let subject = form.get('subject')
  let body = form.get('message')

  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof body !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }

  let fields = { name, email, subject, body };
  let fieldErrors: FieldErrors = {
    name: undefined,
    email: validateEmail(email),
    subject: undefined,
    body: undefined,
  };

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };

  try {
    const url = new URL(request.url);
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const origin = `${protocol}://${url.host}`
    let response: ServerRespons = await fetchAPIOrigin(getGraphQLString(emailMutation), origin, {
      variables: {
        input: {
          name,
          email,
          subject,
          body
        }
      }
    })

    if (!response.sendEmail.sent) {
      return {
        fields,
        formError: `Message was not sent`
      };
    }

    return json({
      ...response
    })
  } catch (e) {
    return { formError: `Form error: ${e}` };
  }
}

export default function Contact() {
  let data = useActionData()
  consoleHelper('Email useActionData', data)
  console.log('data', data)
  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, [])
  return (
    <Layout>
      {/* CONTACT FORM + TEXT */}
      <div className="relative et-grid-basic bg-primary-100">

        <div className="relative grid grid-cols-1 col-span-2 col-start-2 z-2 tablet:col-start-3 tablet:col-span-10 laptop:grid-cols-2">

          {/* TEXT */}
          <div className="relative z-2">
            <h2>We’d love to hear from you.</h2>
          </div>

          {/* FORM */}
          <div className="relative mt-11 z-2">
            <div className='relative p-8 bg-white laptop:p-10 shadow-et_1 z-2 rounded-2xl'>
              <ContactUsForm />
            </div>
          </div>



        </div>

        <div className="absolute bottom-0 left-0 w-full bg-white h-14 z-1" />


      </div>

      {/* SOCIAL MEDIA LINKS */}
      <div className="bg-white et-grid-basic">
        <div className="col-span-2 col-start-2 bg-white tablet:col-start-3 tablet:col-span-10">
          social media
        </div>
      </div>

    </Layout>
  )
}


const emailMutation = gql`
  mutation SEND_EMAIL {
    sendEmail(
      input: {
        from: "spencer.bigum@gmail.com", , 
        subject: "test email mutation", 
        body: "test email", 
        clientMutationId: "test 1"
      }
    ) {
      origin
      sent
      message
    }
  }
`