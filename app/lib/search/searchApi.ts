/**
 * getSearchData
 */


export async function getSearchData(domain: string) {
  const response = await fetch(`${domain}/wp-search.json`);
  
  const json = await response.json();
  return json;
}