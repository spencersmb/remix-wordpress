import ContactUsForm from "@App/components/forms/contact/contactUsForm";
import Layout from "@App/components/layoutTemplates/layout";
import { fetchAPI, fetchAPIOrigin, getOrigin } from "@App/utils/fetch.server";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { consoleHelper } from "@App/utils/windowUtils";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useActionData } from '@remix-run/react'
import gql from "graphql-tag";
import { useEffect } from "react";

export let action: ActionFunction = async ({ request }): Promise<ContactActionData | Response> => {
  let form = await request.formData();
  let name = form.get('name')
  let email = form.get('email')
  console.log('email from form', email);

  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  // if (
  //   typeof password !== "string" ||
  //   typeof username !== "string"
  // ) {
  //   return { formError: `Form not submitted correctly.` };
  // }

  // let fields = { password, username };
  // let fieldErrors: { password: string | undefined, username: string | undefined } = {
  //   password: undefined,
  //   username: undefined
  // };

  // if (password.length < 4) {
  //   fieldErrors = {
  //     password: `Password length too small`,
  //     username: undefined
  //   };
  //   return { fieldErrors, fields };
  // }

  try {
    const url = new URL(request.url);
    console.log('url check', request.url);
    console.log('hostname', url.hostname);
    console.log('host', url.host);
    console.log('protocol', url.protocol);

    let response = await fetchAPIOrigin(getGraphQLString(emailMutation), url.origin)
    console.log('data in action', response);
    // let data = await response.json()

    // if (serverRes.errors) {
    //   return {
    //     fields,
    //     formError: `Username/Password combination is incorrect`
    //   };
    // }

    return json({
      response
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

          <div className="relative z-2">
            <h2>We’d love to hear from you.</h2>
          </div>

          <div className="relative mt-11 z-2">
            <div className='relative p-4 bg-white laptop:p-10 shadow-et_1 z-2 rounded-2xl'>
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