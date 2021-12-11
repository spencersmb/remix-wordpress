import { LoaderFunction, redirect } from 'remix'

export let loader: LoaderFunction = async ({request}) => {
  return redirect(process.env.WORDPRESS_DB || '/')
}
