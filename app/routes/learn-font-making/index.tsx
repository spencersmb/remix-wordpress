import Layout from '@App/components/layoutTemplates/layout';
import LfmClosedPage from '@App/components/lfm/closedPage';
import useSite from '@App/hooks/useSite'
import { ckFormIds } from '@App/lib/convertKit/formIds';
import { formatDate } from '@App/utils/posts'
import { validateEmail } from '@App/utils/validation';
import { consoleHelper } from '@App/utils/windowUtils';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export let loader: LoaderFunction = async ({ request }) => {
  return null
}
export let action: ActionFunction = async ({ request }): Promise<MiniCourseSignUpActionData | Response> => {

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
  const id = ckFormIds.miniCourse.signUp
  const url = `https://api.convertkit.com/v3/forms/${id}/subscribe`;

  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };

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

    return json({ form: 'success' })
  } catch (e) {
    return json({ form: 'fail' })
  }

}

interface Props { }
function formatAMPM(date: Date) {
  let hours = date.getHours();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutes: number = date.getMinutes();
  const minuteString = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minuteString + ' ' + ampm;
  return strTime;
}
function LfmLandingPage(props: Props) {
  let data = useLoaderData<any>();

  const { state: { metadata: { courseLaunchBanners: { lfmBanner } } } } = useSite()

  const testDate = lfmBanner.nextLaunchDate ? new Date(lfmBanner.nextLaunchDate) : new Date()

  // can compare dates
  console.log('getTimeString', testDate.getTime());

  // foratted readble date July 14, 2022
  console.log('getDate', formatDate(testDate.toDateString()));

  // can compare dates
  console.log('getHours', formatAMPM(testDate));

  const nextLaunchDate = lfmBanner.nextLaunchDate ? formatDate(lfmBanner.nextLaunchDate) : ''
  const isClassOpen = lfmBanner.showBanner === "true"

  return (
    <Layout>
      {isClassOpen && <div>Class is open</div>}
      {!isClassOpen && <LfmClosedPage date={nextLaunchDate} />}
    </Layout>
  )
}

export default LfmLandingPage
