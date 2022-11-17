
import { getResourceUser } from '../../utils/resourceLibrarySession.server'
import { useEffect } from 'react'
import { consoleHelper } from '../../utils/windowUtils'
import { getBasicPageMetaTags } from '@App/utils/seo'
import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { cacheControl } from '@App/lib/remix/loaders'
import { MakersSignupAction } from '@App/actions/tmSignUpAction.server'
import TuesdayHomeTemplate from '@App/components/pageTemplates/tuesdayHomeTemplate'

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
    title: `Tuesday Makers: SignUp`,
    desc: `First to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!`,
    slug: `tuesday-makers`
  })
};

// REDO LOADER WITH NEW HELPERS
export let loader: LoaderFunction = async ({ request }) => {

  // Check for Resource User Cookie
  // If found redirect them to /members
  const user = await getResourceUser(request)

  if (user) {
    return redirect('/tuesday-makers/members')
  }

  const page = {
    title: 'Tuesday Makers',
    slug: 'tuesday-makers',
    description: 'First to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!',
    seo: {
      title: 'Tuesday Makers',
      opengraphModifiedTime: '',
      metaDesc: 'First to nab special deals on courses + products *and* you get instant access to our Resource Library, stocked with over 200 design and lettering files!'
    }
  }
  return json({ page }, {
    headers: {
      ...cacheControl,
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
