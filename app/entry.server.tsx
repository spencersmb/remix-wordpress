import { renderToString } from "react-dom/server";
import { redirect, RemixServer } from 'remix'
import type { EntryContext } from "remix";
import path from 'path'
import * as fs from 'fs'


const here: any = (s:any) => path.join(__dirname, ...s)
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
  const file = fs.readFileSync('./_redirects.json', 'utf8')
  let removeSlashAtBegining = url.pathname.slice(1)
  const data = JSON.parse(file)
  const foundRoute = data.prettyLinks[`${removeSlashAtBegining}`]

  if(!!foundRoute){
    return redirect(foundRoute.url, {
      status: foundRoute.status
    })
  }

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}
