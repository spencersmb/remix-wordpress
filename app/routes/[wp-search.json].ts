import { getSearchData } from "@App/lib/search/searchApi";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async({request}) => {
  const url = new URL(request.url);
  let searchData = {}
  try{
    searchData = await getSearchData(url.origin);
    return new Response(JSON.stringify(searchData), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }catch(e){
    return new Response(JSON.stringify(searchData), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
