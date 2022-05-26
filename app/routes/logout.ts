import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { logout } from "@App/utils/session.server";

/*
 * Logout Route - calls logout action then loader redirects
 */

export let action: ActionFunction = async ({ request }) => {
  return logout(request);
};

export let loader: LoaderFunction = async () => {
  return redirect("/");
};
