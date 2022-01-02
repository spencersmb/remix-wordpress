import { LoaderFunction, redirect } from 'remix'
import { getLoginRedirectUrl, getPreviewRedirectUrl } from '../../utils/loaderHelpers'
import { requireAdminUserToken } from '../../utils/session.server'


/**
 * 
 * @Component 
 * 
 * API Route handling previews from WP DB to the front End.
 * 
 * @param DataFunctionArgs
 * @returns Redirect
 */
export let loader: LoaderFunction = async ({request}) => {

  // Build Login redirect if there is no user found
  const loginRedirectUrl = getLoginRedirectUrl(request)
  await requireAdminUserToken(request, loginRedirectUrl)

  // Build preview redirect URL
  const previewUrl = getPreviewRedirectUrl(request)
  return redirect(previewUrl);
};
