// import {manualRedirectLinks} from "./re"
import * as fs from 'fs'
import { manualRedirectLinks } from "../redirects/redirect";
import { redirect } from "@remix-run/node";
import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import * as Sentry from "@sentry/remix";

// Sentry.init({
//   dsn: "https://affa575cf95946718b6d1e9af49eeea1:83293292d3754426b2e1e95c0cf85b5c@o4504238968274944.ingest.sentry.io/4504238969978880",
//   tracesSampleRate: 0,
//   sampleRate: 1,
//   integrations: [],
//   debug: process.env.NODE_ENV !== "production",
// });

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
  // Add extra manual redirect outside of DB
  const redirects = Object.assign(data.links, manualRedirectLinks.links);
  const foundRoute = redirects[`${removeSlashAtBegining}`]

  if (foundRoute) {
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
