import ContactUsForm from "@App/components/forms/contact/contactUsForm";
import Layout from "@App/components/layoutTemplates/layout";
import SocialLinksList1 from "@App/components/social/socialLinksList1";
import { cacheControl } from "@App/lib/remix/loaders";
import { fetchAPIOrigin } from "@App/utils/fetch.server";
import { getGraphQLString } from "@App/utils/graphqlUtils";
import { getStaticPageMeta, navStyles } from "@App/utils/pageUtils";
import { mdxPageMetaV2 } from "@App/utils/seo";
import { validateEmail } from "@App/utils/validation";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import gql from "graphql-tag";

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

const page = getStaticPageMeta({
  title: `Contact Teela`,
  desc: `First to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!`,
  slug: `design`,
})
export let meta = mdxPageMetaV2

export let loader: LoaderFunction = async ({ request }) => {
  return json({ page }, { headers: { ...cacheControl } })
};

export let action: ActionFunction = async ({ request }): Promise<ContactActionData | Response> => {
  let form = await request.formData();
  let name = form.get('name')
  let email = form.get('email')
  let subject = form.get('subject')
  let body = form.get('message')
  let honeyPot = form.get('lastName')

  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof body !== "string" ||
    typeof honeyPot !== "string" ||
    honeyPot.length !== 0
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
          from: email,
          subject,
          body
        }
      }
    })

    if (!response.sendEmail.sent) {
      return {
        fields,
        formError: `Message was not sent.`
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
  // let data = useActionData()

  return (
    <Layout disableNavStyles={true}>

      {/* CONTACT FORM + TEXT */}
      <div className={`${navStyles} relative et-grid-basic bg-primary-100`}>

        <div className="relative flex flex-col col-span-2 col-start-2 z-2 tablet:col-start-3 tablet:col-span-10 laptop:col-start-3 laptop:col-span-11 laptop:flex-row">

          {/* TEXT */}
          <div className="relative mt-8 z-2 text-[#3E3E3E] flex laptop:items-center laptop:mt-0 laptop:w-full laptop:max-w-[490px] laptop:mr-5 desktop:max-w-[550px]">
            <h2 className="text-6xl font-sentinel__SemiBoldItal tablet:text-7xl laptop:text-8xl desktop:text-9xl desktop:mt-[-60px]">We’d love to hear from you.</h2>
          </div>

          {/* FORM */}
          <div className="relative mt-11 z-2 max-w-[548px] w-full mx-auto laptop:mr-auto desktop:ml-16">
            <div className='relative p-8 bg-white laptop:p-10 shadow-et_1 z-2 rounded-2xl'>
              <ContactUsForm />
            </div>
          </div>

        </div>

        {/* WHITE SPACER */}
        <div className="absolute bottom-0 left-0 w-full bg-white h-14 z-1" />

      </div>

      {/* SOCIAL MEDIA LINKS */}
      <div className="bg-white et-grid-basic">
        <div className="col-span-2 col-start-2 bg-white tablet:col-start-3 tablet:col-span-10">
          <SocialLinksList1
            ulClassName="justify-center items-center my-8 laptop:justify-start laptop:items-start laptop:mt-0 laptop:mb-12"
            svgColor="#3E3E3E"
          />
        </div>
      </div>

    </Layout>
  )
}

const emailMutation = gql`
  mutation SEND_EMAIL($input: SendEmailInput!) {
  sendEmail(input: $input) {
    origin
    sent
    message
  }
}
`