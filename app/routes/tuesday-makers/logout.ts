import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { logoutResourceLibrary } from '../../utils/resourceLibrarySession.server'

/**
 * @Component Logout API Route
 *
 * When users hit the logout button, they are redirected here to /logout
 * Because it was a form, actionFunction gets called and then the loader
 *
 */
export let action: ActionFunction = async ({ request }) => {
  return logoutResourceLibrary(request);
};

export let loader: LoaderFunction = async () => {
  return redirect("/");
};
