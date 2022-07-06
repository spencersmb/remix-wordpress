import Layout from '@App/components/layoutTemplates/layout';
import LfmClosedPage from '@App/components/lfm/closedPage';
import useSite from '@App/hooks/useSite'
import { ckFormIds } from '@App/lib/convertKit/formIds';
import { shuffleArray } from '@App/utils/lfmUtils';
import { formatDate } from '@App/utils/posts'
import { getBasicPageMetaTags } from '@App/utils/seo';
import { validateEmail } from '@App/utils/validation';
import { consoleHelper } from '@App/utils/windowUtils';
import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import gridItemsJson from '../../server/fonts/gridItems.json'


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
    title: `Learn Font Making: Mini-Course SignUp`,
    desc: `The proven step-by-step process to create professional and profitable hand lettered fonts.`,
    slug: `learn-font-making`
  })
};

export let loader: LoaderFunction = async ({ request }) => {
  const page = {
    title: `Learn Font Making: Mini-Course SignUp`,
    slug: 'learn-font-making',
    description: `The proven step-by-step process to create professional and profitable hand lettered fonts.`,
    seo: {
      title: `Learn Font Making: Mini-Course SignUp`,
      opengraphModifiedTime: '',
      metaDesc: `The proven step-by-step process to create professional and profitable hand lettered fonts.`
    }
  }
  const gridItems = gridItemsJson
  return json({
    page,
    gridItems: shuffleArray(gridItems.items)
  }, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate" } })
};
export let action: ActionFunction = async ({ request }): Promise<MiniCourseSignUpActionData | Response> => {

  let form = await request.formData();
  let formType = form.get('_action') as string
  let email = form.get('email')

  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!

  if (
    typeof email !== "string"
  ) {
    return {
      formError: {
        [formType]: `Form not submitted correctly.`
      }
    }
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

    return json({
      form: {
        [formType]: 'success'
      }
    })
  } catch (e) {
    return json({
      form: {
        [formType]: 'fail'
      }
    })
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
  console.log('data', data);


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
      {!isClassOpen && <LfmClosedPage date={nextLaunchDate} gridItems={data.gridItems} />}
    </Layout>
  )
}

export default LfmLandingPage
