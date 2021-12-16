import { renderToString } from "react-dom/server";
import { redirect, RemixServer } from 'remix'
import type { EntryContext } from "remix";
// import {manualRedirectLinks} from "./re"
import * as fs from 'fs'
import { manualRedirectLinks } from "../redirects/redirect";


interface IPrettyLink {
  redirectTo: string
  status: string
  slug: string
}
interface IPrettyLinks {
  links: {
    [key: string]: IPrettyLink
  }
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  // intercept 301 redirects here?
  let url = new URL(request.url);
  const file = fs.readFileSync('./public/wp-prettyLinks.json', 'utf8')
  let removeSlashAtBegining = url.pathname.slice(1)
  const data: IPrettyLinks = JSON.parse(file)
  const redirects = Object.assign(data.links, manualRedirectLinks.links);

  const foundRoute = redirects[`${removeSlashAtBegining}`]


  if (!!foundRoute) {
    return redirect(foundRoute.redirectTo, {
      status: parseInt(foundRoute.status)
    })
  }

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}
