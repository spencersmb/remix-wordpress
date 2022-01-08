import { RouteData } from "@remix-run/react/routeData";

interface ISelectedMatch {
  pathname: string;
  params: import("react-router").Params<string>;
  data: RouteData;
  handle: any;
}