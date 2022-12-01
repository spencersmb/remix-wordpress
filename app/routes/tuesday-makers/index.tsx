
import { getResourceUser } from '../../utils/resourceLibrarySession.server'
import { useEffect } from 'react'
import { consoleHelper } from '../../utils/windowUtils'
import { mdxPageMeta } from '@App/utils/seo'
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { MakersSignupAction } from '@App/actions/tmSignUpAction.server'
import TuesdayHomeTemplate from '@App/components/pageTemplates/tuesdayHomeTemplate'
import { getStaticPageMeta } from '@App/utils/pageUtils';

const page = getStaticPageMeta({
  title: `Tuesday Makers: SignUp`,
  desc: `First to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!`,
  slug: `tuesday-makers`
})
export let meta = mdxPageMeta


export let loader: LoaderFunction = async ({ request }) => {

  // Check for Resource User Cookie
  // If found redirect them to /members
  const user = await getResourceUser(request)

  if (user) {
    return redirect('/tuesday-makers/members')
  }

  return json({ page }, {
    headers: {
    }
  })
};

type MakersSignupActionData = {
  formError?: string;
  fieldErrors?: {
    email: string | undefined;
  };
  fields?: {
    email: string;
  }
  form?: string
};
export let action: ActionFunction = async ({ request }) => MakersSignupAction<Promise<MakersSignupActionData>>(request)

const ResourceLibraryHome = () => {
  let data = useLoaderData()
  useEffect(() => {
    consoleHelper('data', data, 'tuesday-makers/index.tsx');
  }, [data]);
  return (
    <TuesdayHomeTemplate />
  )

}

export default ResourceLibraryHome
