import type { ActionFunction, LoaderFunction } from "remix";
import { redirect } from "remix";
import { logoutResourceLibrary } from '../../utils/resourceLibrarySession.server'

export let action: ActionFunction = async ({ request }) => {
  return logoutResourceLibrary(request);
};

export let loader: LoaderFunction = async () => {
  return redirect("/");
};
