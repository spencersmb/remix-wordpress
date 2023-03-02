import { RemixBrowser, useLocation, useMatches } from "@remix-run/react";
import { hydrate } from "react-dom";
import * as Sentry from "@sentry/remix";
import { useEffect } from "react";

// Sentry.init({
//   dsn: "https://affa575cf95946718b6d1e9af49eeea1:83293292d3754426b2e1e95c0cf85b5c@o4504238968274944.ingest.sentry.io/4504238969978880",
//   tracesSampleRate: 0,
//   sampleRate: 1,
//   // This sets the sample rate to be 10%. You may want this to be 100% while
//   // in development and sample at a lower rate in production
//   replaysSessionSampleRate: process.env.NODE_ENV !== "production" ? 1.0 : .1,
//   // If the entire session is not sampled, use the below sample rate to sample
//   // sessions when an error occurs.
//   replaysOnErrorSampleRate: 1.0,
//   integrations: [
//     new Sentry.BrowserTracing({
//       routingInstrumentation: Sentry.remixRouterInstrumentation(
//         useEffect,
//         useLocation,
//         useMatches
//       ),
//     }),
//     new Sentry.Replay({
//       // Additional SDK configuration goes in here, for example:
//       maskAllText: true,
//       blockAllMedia: true,
//     }),
//   ],
// });

hydrate(<RemixBrowser />, document);
