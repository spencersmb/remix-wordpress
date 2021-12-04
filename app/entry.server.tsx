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
  // create function that gets the path
  // Gets the redirects.txt file
  // parse it for urls, normalize it?
  // check for match - then redirect or continue
  // return redirect('http://youtube.com', {
  //   status: 301
  // })

  let url = new URL(request.url);
  const file = fs.readFileSync('./_redirects.json', 'utf8')
  console.log('req', url.pathname)
  let removeSlashAtBegining = url.pathname.slice(1)
  console.log('removeSlashAtBegining', removeSlashAtBegining)

  const data = JSON.parse(file)
  const foundRoute = data.prettyLinks[`${removeSlashAtBegining}`]
  console.log('foundRoute', foundRoute)

  if(!!foundRoute){
    return redirect(foundRoute.url, {
      status: foundRoute.status
    })
  }

  console.log('data', data)




  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}
