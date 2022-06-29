import type { AppData } from "@remix-run/node";
import type { RouteData } from "@remix-run/react/routeData";
import type { Params } from 'react-router'
import type { Location } from "history";

interface IBasicPageMetaTags{
  data: AppData;
  parentsData: RouteData;
  params: Params;
  location: Location;
}
interface IBasicPageInfo {
  title: string,
  desc: string
  slug: string
}
type IgetBasicPageMetaTags = (metaData: IBasicPageMetaTags, pageData:IBasicPageInfo ,follow?: {googleIndex: boolean}) => {title: string, description: string}

type IgetHtmlMetadataTags = IGetMetaTagsFunction & {location: Location}