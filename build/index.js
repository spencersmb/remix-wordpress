var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// <stdin>
__export(exports, {
  assets: () => import_assets.default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toModule(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server = __toModule(require("react-dom/server"));
var import_remix = __toModule(require("remix"));
var import_path = __toModule(require("path"));
var fs = __toModule(require("fs"));
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  let url = new URL(request.url);
  const file = fs.readFileSync("./_redirects.json", "utf8");
  let removeSlashAtBegining = url.pathname.slice(1);
  const data = JSON.parse(file);
  const foundRoute = data.prettyLinks[`${removeSlashAtBegining}`];
  if (!!foundRoute) {
    return (0, import_remix.redirect)(foundRoute.url, {
      status: foundRoute.status
    });
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  Document: () => Document,
  ErrorBoundary: () => ErrorBoundary,
  Layout: () => Layout,
  PrimaryNav: () => PrimaryNav,
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var React2 = __toModule(require("react"));
var import_remix3 = __toModule(require("remix"));

// app/styles/demos/remix.css
var remix_default = "/build/_assets/remix-5PPS2YMF.css";

// app/styles/global.css
var global_default = "/build/_assets/global-HU4DLT4P.css";

// app/styles/dark.css
var dark_default = "/build/_assets/dark-APYDFYJA.css";

// app/hooks/useSite.ts
var import_react = __toModule(require("react"));
var siteInitialState = {
  recentPosts: [],
  categories: [],
  metadata: {
    domain: "",
    description: "",
    language: "",
    siteTitle: "",
    social: {
      youtube: "http://youtube.com/everytues",
      twitter: {
        username: "teelacunningham",
        cardType: "summary",
        url: ""
      },
      pinterest: "http://pinterest.com/teelac",
      instagram: "http://instagram.com/everytuesday",
      facebook: {
        url: "http://facebook.com/everytues",
        defaultImage: {
          altText: "Every-Tuesday Logo Black",
          sourceUrl: "http://etheadless.local/wp-content/uploads/2013/09/et-logo-black.png",
          mediaDetails: {
            "height": 143,
            "width": 510
          }
        }
      }
    },
    title: ""
  },
  menu: [],
  user: null
};
var SiteContext = (0, import_react.createContext)(siteInitialState);
SiteContext.displayName = "SiteContext";
function useSite() {
  const site = (0, import_react.useContext)(SiteContext);
  return site;
}

// app/lib/wp/site.ts
function getWPMenu() {
  return {
    menus: [
      {
        name: "Primary",
        slug: "primary",
        locations: [
          "PRIMARY_MENU"
        ],
        menuItems: [
          {
            childItems: {
              edges: []
            },
            id: "cG9zdDo4Njk2",
            title: null,
            cssClasses: [],
            parentId: null,
            label: "Courses",
            path: "/courses",
            target: null,
            featured: {
              courses: [
                {
                  id: "cG9zdDo4MzM5",
                  details: {
                    url: "http://learn.every-tuesday.com/3d-lettering-in-procreate"
                  }
                },
                {
                  id: "cG9zdDo4MTI2",
                  details: {
                    url: null
                  }
                },
                {
                  id: "cG9zdDo3Njk5",
                  details: {
                    url: null
                  }
                }
              ]
            }
          },
          {
            childItems: {
              edges: []
            },
            id: "cG9zdDo4NzAw",
            title: null,
            cssClasses: [],
            parentId: null,
            label: "Products",
            path: "http://google.com",
            target: "_blank",
            featured: {
              courses: null
            }
          },
          {
            childItems: {
              edges: [
                {
                  node: {
                    id: "cG9zdDo4NzAy",
                    title: null,
                    cssClasses: [],
                    parentId: "cG9zdDo4NzAx",
                    label: "About Us",
                    path: "/about-us",
                    target: null,
                    featured: {
                      courses: null
                    }
                  }
                }
              ]
            },
            id: "cG9zdDo4NzAx",
            title: null,
            cssClasses: [],
            parentId: null,
            label: "Blog",
            path: "/blog",
            target: null,
            featured: {
              courses: null
            }
          },
          {
            childItems: {
              edges: []
            },
            id: "cG9zdDo4NzAy",
            title: null,
            cssClasses: [],
            parentId: "cG9zdDo4NzAx",
            label: "About Us",
            path: "/about-us",
            target: null,
            featured: {
              courses: null
            }
          },
          {
            childItems: {
              edges: []
            },
            id: "cG9zdDo4Njk3",
            title: null,
            cssClasses: [],
            parentId: null,
            label: "Resource Library",
            path: "/resource-library",
            target: null,
            featured: {
              courses: [
                {
                  id: "cG9zdDo4MzM5",
                  details: {
                    url: "http://learn.every-tuesday.com/3d-lettering-in-procreate"
                  }
                },
                {
                  id: "cG9zdDo4MTI2",
                  details: {
                    url: null
                  }
                },
                {
                  id: "cG9zdDo3Njk5",
                  details: {
                    url: null
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  };
}
var metadata = {
  generalSettings: {
    description: "Graphic Design Tips, Tricks, Tutorials and Freebies",
    language: "En",
    title: "Every-Tuesday"
  },
  seo: {
    webmaster: {
      yandexVerify: "",
      msVerify: "",
      googleVerify: "",
      baiduVerify: ""
    },
    social: {
      youTube: {
        url: "http://youtube.com/everytues"
      },
      wikipedia: {
        url: ""
      },
      twitter: {
        username: "teelacunningham",
        cardType: "summary"
      },
      pinterest: {
        metaTag: "",
        url: "http://pinterest.com/teelac"
      },
      mySpace: {
        url: ""
      },
      linkedIn: {
        url: ""
      },
      instagram: {
        url: "http://instagram.com/everytuesday"
      },
      facebook: {
        url: "http://facebook.com/everytues",
        defaultImage: {
          altText: "Every-Tuesday Logo Black",
          sourceUrl: "http://etheadless.local/wp-content/uploads/2013/09/et-logo-black.png",
          mediaDetails: {
            "height": 143,
            "width": 510
          }
        }
      }
    }
  }
};
function getWPMetadata(domain) {
  const { generalSettings } = metadata;
  let { title, description, language } = generalSettings;
  const settings = {
    domain,
    title,
    siteTitle: title,
    description,
    language: "",
    social: {}
  };
  if (!language || language === "") {
    settings.language = "en";
  } else {
    settings.language = language.split("_")[0];
  }
  const { webmaster, social } = metadata.seo;
  if (social) {
    settings.social = {};
    Object.keys(social).forEach((key) => {
      const { url } = social[key];
      const keysArray = Object.keys(social[key]);
      if (key === "twitter" && settings.social) {
        settings.social[key] = {
          url: `https://twitter.com/${social.twitter.username}`,
          username: social.twitter.username,
          cardType: social.twitter.cardType
        };
        return;
      }
      if (key === "pinterest" && settings.social) {
        settings.social[key] = url;
        return;
      }
      if (!url || key === "__typename")
        return;
      if (keysArray.length > 2) {
        settings.social[key] = __spreadValues({}, social[key]);
        return;
      }
      settings.social[key] = url;
    });
  }
  if (webmaster) {
    settings.webmaster = {};
    Object.keys(webmaster).forEach((key) => {
      if (!webmaster[key] || key === "__typename")
        return;
      settings.webmaster[key] = webmaster[key];
    });
  }
  settings.title = decodeHtmlEntities(settings.title);
  return settings;
}
var defaultSeoImages = {
  generic: {
    url: "",
    altText: "",
    width: 123,
    height: 123
  }
};
function decodeHtmlEntities(text) {
  if (typeof text !== "string") {
    throw new Error(`Failed to decode HTML entity: invalid type ${typeof text}`);
  }
  let decoded = text;
  const entities = {
    "&amp;": "&",
    "&quot;": '"',
    "&#039;": "'"
  };
  return decoded.replace(/&amp;|&quot;|&#039;/g, (char) => entities[char]);
}

// app/lib/wp/nav.ts
function getPrimaryMenu(menus) {
  const mainMenu = menus.find((menu) => menu.slug === "primary");
  if (!mainMenu)
    return [];
  return mainMenu.menuItems.filter((menuItem) => {
    if (menuItem.parentId) {
      return;
    }
    return menuItem;
  });
}

// app/lib/utils/jsonLd.ts
function jsonLdWebsite(data) {
  const { domain, description, siteTitle } = data;
  return `{
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'WebSite',
      '@id': '${domain}/#website',
      'url': '${domain}',
      'name': '${siteTitle}',
      'description': ${description},
      'potentialAction': [{
        '@type': 'SearchAction',
        'target': {
          '@type': 'EntryPoint', 
          'urlTemplate': '${domain}/?s={search_term_string}'
          },
        'query-input': 'required name=search_term_string'
      }],
      'inLanguage': 'en-US'
    }`;
}
function jsonldImageObject({ pageUrl, image }) {
  return `      
        '@type': 'ImageObject',
        '@id': '${pageUrl}#primaryimage',
        'inLanguage': 'en-US',
        'url': '${image.url}',
        'contentUrl': '${image.url}',
        'width': 1920,
        'height': 928,
        'caption': '${image.altText}'
      }`;
}
function jsonldWebpage(props) {
  const { pageUrl, publishTime, modifiedTime, title, domain, description } = props;
  return `{
        "@type": "WebPage",
        "@id": "${pageUrl}#webpage",
        "url": "${pageUrl}",
        "name": "${title}",
        "isPartOf": {"@id": "${domain}#website"},
        "primaryImageOfPage": {"@id": "${pageUrl}#primaryimage"},
        ${publishTime ? `"datePublished": "${publishTime}"` : ""}
        ${modifiedTime ? `"dateModified": "${modifiedTime}"` : ""}
        "author": {"@id": "${domain}/#/schema/person/335aa8508f8baa38bcaf8be0a46d6ecb"},
        "description": "${description}",
        "breadcrumb": {"@id": "${pageUrl}#breadcrumb"},
        "inLanguage": "en-US",
        "potentialAction": [{
          "@type": "ReadAction",
          "target": ["${pageUrl}"]
        }]
      }`;
}
function jsonldBlog(props) {
  const { url, title } = props;
  return `
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    },
    "headline": "${title}",
    "image": [
      "https://res.cloudinary.com/every-tuesday/images/f_auto,q_auto/v1633831040/create-a-cute-notebook-icon-in-adobe-illustrator/create-a-cute-notebook-icon-in-adobe-illustrator.jpg?_i=AA"
     ],
    "datePublished": "2019-02-26T13:01:10+00:00",
    "dateModified": "2021-10-10T01:57:58+00:00",
    "author": {"@type": "Person","name": "Teela"},
    "description": "Create a cute vector notebook icon in Adobe Illustrator in this week's video tutorial, perfect for Illustrator beginners!"
  }
  `;
}
function jsonldPerson(props) {
  const { avatarUrl, domain, description } = props;
  return `{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "${domain}/#/schema/person/335aa8508f8baa38bcaf8be0a46d6ecb",
          "name": "Teela",
          "image": {
          "@type": "ImageObject",
          "@id": "${domain}/#personlogo",
          "inLanguage": "en-US",
          "url": "${avatarUrl}",
          "contentUrl": "${avatarUrl}",
          "caption": "Teela"
        },
        "description": "${description}"
      }`;
}
function jsonBreadcrumbsList({ breadcrumbList }) {
  const itemListElements = breadcrumbList.map((breadcrumb) => `{
    "@type": "ListItem",
    "position": ${breadcrumb.position},
    "item": {
      "@id": "${breadcrumb.item}",
      "name": "${breadcrumb.name}"
    }
  }`);
  return `{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      ${itemListElements}
    ]
  }`;
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/root.tsx
var import_nprogress = __toModule(require("nprogress"));

// node_modules/nprogress/nprogress.css
var nprogress_default = "/build/_assets/nprogress-JFUSETFZ.css";

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/root.tsx
var import_remix5 = __toModule(require("remix"));

// app/styles/app.css
var app_default = "/build/_assets/app-2NLS4PCN.css";

// app/utils/session.server.ts
var import_remix2 = __toModule(require("remix"));
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}
var storage = (0, import_remix2.createCookieSessionStorage)({
  cookie: {
    name: "wp_session",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
async function createUserSession(userId, token) {
  let session = await storage.getSession();
  session.set("userId", userId);
  session.set("token", token);
  return await storage.commitSession(session);
}
function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}
async function requireToken(request, redirectTo) {
  let session = await getUserSession(request);
  let userToken = session.get("token");
  if (!userToken || typeof userToken !== "object") {
    throw (0, import_remix2.redirect)(redirectTo);
  }
  return userToken;
}
async function isTokenExpired(token) {
  let currentDate = new Date(Date.now()).getTime();
  console.log("currentDate", currentDate);
  console.log("token.expires", token.expires);
  return token.expires < currentDate;
}
function setFutureDate(mins = 5) {
  let currentDate = new Date();
  return new Date(currentDate.getTime() + mins * 6e4).getTime();
}
async function refreshCurrentSession(request, token) {
  let session = await getUserSession(request);
  let oldUserToken = session.get("token");
  let newToken = __spreadProps(__spreadValues({}, oldUserToken), {
    token,
    expires: setFutureDate()
  });
  session.set("token", newToken);
  return storage.commitSession(session);
}
async function logout(request) {
  let session = await storage.getSession(request.headers.get("Cookie"));
  return (0, import_remix2.redirect)("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/root.tsx
var links = () => {
  return [
    { rel: "stylesheet", href: app_default },
    { rel: "stylesheet", href: global_default },
    {
      rel: "stylesheet",
      href: dark_default,
      media: "(prefers-color-scheme: dark)"
    },
    { rel: "stylesheet", href: remix_default },
    { rel: "stylesheet", href: nprogress_default }
  ];
};
var loader = async ({ request }) => {
  let session = await getUserSession(request);
  console.log("user", session.has("userId"));
  let user = session.has("userId") ? {
    id: session.get("userId")
  } : null;
  let metadata2 = getWPMetadata(process.env.APP_ROOT_URL || "no url found");
  return __spreadProps(__spreadValues({}, getWPMenu()), {
    metadata: metadata2,
    user,
    ENV: {
      APP_ROOT_URL: process.env.APP_ROOT_URL,
      PUBLIC_WP_API_URL: process.env.PUBLIC_WP_API_URL
    }
  });
};
function App() {
  let { menus, metadata: metadata2, user } = (0, import_remix3.useLoaderData)();
  let transition = (0, import_remix5.useTransition)();
  React2.useEffect(() => {
    if (transition.state === "idle")
      import_nprogress.default.done();
    else
      import_nprogress.default.start();
  }, [transition.state]);
  return /* @__PURE__ */ React2.createElement(SiteContext.Provider, {
    value: {
      menu: menus,
      metadata: metadata2,
      user
    }
  }, /* @__PURE__ */ React2.createElement(Document, null, /* @__PURE__ */ React2.createElement(import_remix3.Outlet, null)));
}
var JsonLd = () => {
  var _a, _b, _c, _d, _e;
  let { metadata: metadata2 } = (0, import_remix3.useLoaderData)();
  let matches = (0, import_remix3.useMatches)();
  let location = (0, import_remix3.useLocation)();
  let selectedMatch = matches.find((match) => {
    var _a2, _b2;
    return ((_a2 = match.data) == null ? void 0 : _a2.post) || ((_b2 = match.data) == null ? void 0 : _b2.page);
  });
  const post = selectedMatch ? (_a = selectedMatch == null ? void 0 : selectedMatch.data) == null ? void 0 : _a.post : null;
  const page = (_b = selectedMatch == null ? void 0 : selectedMatch.data) == null ? void 0 : _b.page;
  const breadcrumbList = [
    {
      position: 1,
      name: "Home",
      item: metadata2.domain
    }
  ];
  let image = defaultSeoImages.generic;
  let jsonWebpageSettings = {
    title: metadata2.title,
    domain: metadata2.domain,
    description: metadata2.description,
    pageUrl: `${metadata2.domain}${location.pathname}`
  };
  if (post) {
    image = {
      url: ((_c = post.featuredImage) == null ? void 0 : _c.sourceUrl) || "",
      altText: ((_d = post.featuredImage) == null ? void 0 : _d.altText) || "",
      width: 1920,
      height: 928
    };
    jsonWebpageSettings = __spreadProps(__spreadValues({}, jsonWebpageSettings), {
      title: post.seo.title,
      publishTime: post.seo.opengraphPublishedTime,
      modifiedTime: post.seo.opengraphModifiedTime,
      description: post.seo.metaDesc
    });
    breadcrumbList.push({
      position: 2,
      name: `${post.title}`,
      item: `${metadata2.domain}${location.pathname}`
    });
  }
  if (page) {
  }
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: jsonLdWebsite(metadata2) }
  }), /* @__PURE__ */ React2.createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: jsonldImageObject({
      pageUrl: location.pathname,
      image
    }) }
  }), /* @__PURE__ */ React2.createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: jsonldWebpage(jsonWebpageSettings) }
  }), /* @__PURE__ */ React2.createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: jsonldPerson(metadata2) }
  }), /* @__PURE__ */ React2.createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: jsonBreadcrumbsList({
      domain: metadata2.domain,
      breadcrumbList
    }) }
  }), post && /* @__PURE__ */ React2.createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: jsonldBlog({
        url: `${metadata2.domain}${location.pathname}`,
        images: [
          `${(_e = post.featuredImage) == null ? void 0 : _e.sourceUrl}`
        ],
        datePublished: post.seo.opengraphPublishedTime,
        dateModified: post.seo.opengraphModifiedTime,
        author: post.author.name,
        description: post.seo.metaDesc,
        title: post.seo.title
      })
    }
  }));
};
var meta = () => {
  return {
    title: `Home - Every Tuesday`
  };
};
function Document({
  children,
  title
}) {
  let data = (0, import_remix3.useLoaderData)();
  return /* @__PURE__ */ React2.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React2.createElement("head", null, /* @__PURE__ */ React2.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), /* @__PURE__ */ React2.createElement("meta", {
    httpEquiv: "Content-Type",
    content: "text/html; charset=utf-8"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "application-name",
    content: "Every-Tuesday"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "facebook-domain-verification",
    content: "49a7ouvzn8x5uhb6gdmg2km5pnbfny"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "norton-safeweb-site-verification",
    content: "42o2xv441l6-j8hnbn5bc1wi76o7awsydx8s00-ad8jqokbtj2w3ylsaed7gk2tbd3o-tdzh62ynrlkpicf51voi7pfpa9j61f51405kq0t9z-v896p48l7nlqas6i4l"
  }), /* @__PURE__ */ React2.createElement("link", {
    rel: "preload",
    href: "/fonts/sentinel/Sentinel-SemiboldItal.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous"
  }), /* @__PURE__ */ React2.createElement(import_remix3.Meta, null), /* @__PURE__ */ React2.createElement(import_remix3.Links, null), /* @__PURE__ */ React2.createElement(JsonLd, null)), /* @__PURE__ */ React2.createElement("body", null, children, /* @__PURE__ */ React2.createElement(RouteChangeAnnouncement, null), /* @__PURE__ */ React2.createElement(import_remix3.ScrollRestoration, null), /* @__PURE__ */ React2.createElement(import_remix3.Scripts, null), data.ENV && /* @__PURE__ */ React2.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `window.ENV = ${JSON.stringify(data.ENV)}`
    }
  }), process.env.NODE_ENV === "development" && /* @__PURE__ */ React2.createElement(import_remix3.LiveReload, null)));
}
var PrimaryNav = () => {
  const { menu, user } = useSite();
  const primaryMenu = getPrimaryMenu(menu);
  console.log("user", user);
  return /* @__PURE__ */ React2.createElement("nav", {
    "aria-label": "Main navigation",
    className: "remix-app__header-nav"
  }, /* @__PURE__ */ React2.createElement("ul", null, primaryMenu.map((menuItem) => {
    return /* @__PURE__ */ React2.createElement("li", {
      key: menuItem.id
    }, /* @__PURE__ */ React2.createElement(import_remix3.Link, {
      to: menuItem.path
    }, menuItem.label));
  }), user && /* @__PURE__ */ React2.createElement("li", null, /* @__PURE__ */ React2.createElement("form", {
    action: "/logout",
    method: "post"
  }, /* @__PURE__ */ React2.createElement("button", {
    type: "submit",
    className: "button"
  }, "Logout")))));
};
function Layout({ children, alternateNav }) {
  return /* @__PURE__ */ React2.createElement("div", {
    className: "remix-app"
  }, /* @__PURE__ */ React2.createElement("header", {
    className: "remix-app__header"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "container remix-app__header-content"
  }, /* @__PURE__ */ React2.createElement(import_remix3.Link, {
    to: "/",
    title: "Remix",
    prefetch: "intent",
    className: "remix-app__header-home-link"
  }, /* @__PURE__ */ React2.createElement(RemixLogo, null)), alternateNav ? alternateNav : /* @__PURE__ */ React2.createElement(PrimaryNav, null))), /* @__PURE__ */ React2.createElement("div", {
    className: "remix-app__main"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "container remix-app__main-content"
  }, children)), /* @__PURE__ */ React2.createElement("footer", {
    className: "remix-app__footer"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "container remix-app__footer-content"
  }, /* @__PURE__ */ React2.createElement("p", null, "\xA9 You!"))));
}
function CatchBoundary() {
  let caught = (0, import_remix3.useCatch)();
  let message;
  switch (caught.status) {
    case 401:
      message = /* @__PURE__ */ React2.createElement("p", null, "Oops! Looks like you tried to visit a page that you do not have access to.");
      break;
    case 404:
      message = /* @__PURE__ */ React2.createElement("p", null, "Oops! Looks like you tried to visit a page that does not exist.");
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }
  return /* @__PURE__ */ React2.createElement(Document, {
    title: `${caught.status} ${caught.statusText}`
  }, /* @__PURE__ */ React2.createElement(Layout, null, /* @__PURE__ */ React2.createElement("h1", null, caught.status, ": ", caught.statusText), message));
}
function ErrorBoundary({ error }) {
  console.error(error);
  return /* @__PURE__ */ React2.createElement(Document, {
    title: "Error!"
  }, /* @__PURE__ */ React2.createElement(Layout, null, /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement("h1", null, "There was an error"), /* @__PURE__ */ React2.createElement("p", null, error.message), /* @__PURE__ */ React2.createElement("hr", null), /* @__PURE__ */ React2.createElement("p", null, "Hey, developer, you should replace this with what you want your users to see."))));
}
function RemixLogo(props) {
  return /* @__PURE__ */ React2.createElement("svg", __spreadValues({
    viewBox: "0 0 659 165",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    "aria-labelledby": "remix-run-logo-title",
    role: "img",
    width: "106",
    height: "30",
    fill: "currentColor"
  }, props), /* @__PURE__ */ React2.createElement("title", {
    id: "remix-run-logo-title"
  }, "Remix Logo"), /* @__PURE__ */ React2.createElement("path", {
    d: "M0 161V136H45.5416C53.1486 136 54.8003 141.638 54.8003 145V161H0Z M133.85 124.16C135.3 142.762 135.3 151.482 135.3 161H92.2283C92.2283 158.927 92.2653 157.03 92.3028 155.107C92.4195 149.128 92.5411 142.894 91.5717 130.304C90.2905 111.872 82.3473 107.776 67.7419 107.776H54.8021H0V74.24H69.7918C88.2407 74.24 97.4651 68.632 97.4651 53.784C97.4651 40.728 88.2407 32.816 69.7918 32.816H0V0H77.4788C119.245 0 140 19.712 140 51.2C140 74.752 125.395 90.112 105.665 92.672C122.32 96 132.057 105.472 133.85 124.16Z"
  }), /* @__PURE__ */ React2.createElement("path", {
    d: "M229.43 120.576C225.59 129.536 218.422 133.376 207.158 133.376C194.614 133.376 184.374 126.72 183.35 112.64H263.478V101.12C263.478 70.1437 243.254 44.0317 205.11 44.0317C169.526 44.0317 142.902 69.8877 142.902 105.984C142.902 142.336 169.014 164.352 205.622 164.352C235.83 164.352 256.822 149.76 262.71 123.648L229.43 120.576ZM183.862 92.6717C185.398 81.9197 191.286 73.7277 204.598 73.7277C216.886 73.7277 223.542 82.4317 224.054 92.6717H183.862Z"
  }), /* @__PURE__ */ React2.createElement("path", {
    d: "M385.256 66.5597C380.392 53.2477 369.896 44.0317 349.672 44.0317C332.52 44.0317 320.232 51.7117 314.088 64.2557V47.1037H272.616V161.28H314.088V105.216C314.088 88.0638 318.952 76.7997 332.52 76.7997C345.064 76.7997 348.136 84.9917 348.136 100.608V161.28H389.608V105.216C389.608 88.0638 394.216 76.7997 408.04 76.7997C420.584 76.7997 423.4 84.9917 423.4 100.608V161.28H464.872V89.5997C464.872 65.7917 455.656 44.0317 424.168 44.0317C404.968 44.0317 391.4 53.7597 385.256 66.5597Z"
  }), /* @__PURE__ */ React2.createElement("path", {
    d: "M478.436 47.104V161.28H519.908V47.104H478.436ZM478.18 36.352H520.164V0H478.18V36.352Z"
  }), /* @__PURE__ */ React2.createElement("path", {
    d: "M654.54 47.1035H611.788L592.332 74.2395L573.388 47.1035H527.564L568.78 103.168L523.98 161.28H566.732L589.516 130.304L612.3 161.28H658.124L613.068 101.376L654.54 47.1035Z"
  }));
}
var RouteChangeAnnouncement = React2.memo(() => {
  let [hydrated, setHydrated] = React2.useState(false);
  let [innerHtml, setInnerHtml] = React2.useState("");
  let location = (0, import_remix3.useLocation)();
  React2.useEffect(() => {
    setHydrated(true);
  }, []);
  let firstRenderRef = React2.useRef(true);
  React2.useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    let pageTitle = location.pathname === "/" ? "Home page" : document.title;
    setInnerHtml(`Navigated to ${pageTitle}`);
  }, [location.pathname]);
  if (!hydrated) {
    return null;
  }
  return /* @__PURE__ */ React2.createElement("div", {
    "aria-live": "assertive",
    "aria-atomic": true,
    id: "route-change-region",
    style: {
      border: "0",
      clipPath: "inset(100%)",
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      width: "1px",
      whiteSpace: "nowrap",
      wordWrap: "normal"
    }
  }, innerHtml);
});

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/resource-library/members.tsx
var members_exports = {};
__export(members_exports, {
  default: () => members_default,
  loader: () => loader2,
  meta: () => meta2
});
var import_remix9 = __toModule(require("remix"));

// app/utils/resourceLibrarySession.server.ts
var import_remix6 = __toModule(require("remix"));
var sessionSecret2 = process.env.SESSION_SECRET;
if (!sessionSecret2) {
  throw new Error("SESSION_SECRET must be set");
}
var resourceStorage = (0, import_remix6.createCookieSessionStorage)({
  cookie: {
    name: "resource_session",
    secure: true,
    secrets: [sessionSecret2],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
async function createResourceUserSession(userId) {
  let session = await resourceStorage.getSession();
  session.set("userId", userId);
  return await resourceStorage.commitSession(session);
}
function getResourceUserSession(request) {
  return resourceStorage.getSession(request.headers.get("Cookie"));
}
async function requireResourceLibraryUser(request, redirectTo) {
  let session = await getResourceUserSession(request);
  let userToken = session.get("userId");
  if (!userToken) {
    throw (0, import_remix6.redirect)(redirectTo);
  }
  return userToken;
}
async function logoutResourceLibrary(request) {
  let session = await resourceStorage.getSession(request.headers.get("Cookie"));
  return (0, import_remix6.redirect)("/resource-library", {
    headers: {
      "Set-Cookie": await resourceStorage.destroySession(session)
    }
  });
}

// app/components/resourceLibrary/resourceNav.tsx
var React3 = __toModule(require("react"));
var ResourceLibraryNav = ({ showLogout }) => {
  return /* @__PURE__ */ React3.createElement("nav", null, /* @__PURE__ */ React3.createElement("ul", null, /* @__PURE__ */ React3.createElement("li", null, "Nav"), showLogout && /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement("form", {
    action: "/resource-library/logout",
    method: "post"
  }, /* @__PURE__ */ React3.createElement("button", {
    type: "submit",
    className: "button"
  }, "Logout")))));
};
var resourceNav_default = ResourceLibraryNav;

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/resource-library/members.tsx
var React5 = __toModule(require("react"));

// app/root.tsx
var React4 = __toModule(require("react"));
var import_remix7 = __toModule(require("remix"));
var import_nprogress3 = __toModule(require("nprogress"));
var import_remix8 = __toModule(require("remix"));
var PrimaryNav2 = () => {
  const { menu, user } = useSite();
  const primaryMenu = getPrimaryMenu(menu);
  console.log("user", user);
  return /* @__PURE__ */ React4.createElement("nav", {
    "aria-label": "Main navigation",
    className: "remix-app__header-nav"
  }, /* @__PURE__ */ React4.createElement("ul", null, primaryMenu.map((menuItem) => {
    return /* @__PURE__ */ React4.createElement("li", {
      key: menuItem.id
    }, /* @__PURE__ */ React4.createElement(import_remix7.Link, {
      to: menuItem.path
    }, menuItem.label));
  }), user && /* @__PURE__ */ React4.createElement("li", null, /* @__PURE__ */ React4.createElement("form", {
    action: "/logout",
    method: "post"
  }, /* @__PURE__ */ React4.createElement("button", {
    type: "submit",
    className: "button"
  }, "Logout")))));
};
function Layout2({ children, alternateNav }) {
  return /* @__PURE__ */ React4.createElement("div", {
    className: "remix-app"
  }, /* @__PURE__ */ React4.createElement("header", {
    className: "remix-app__header"
  }, /* @__PURE__ */ React4.createElement("div", {
    className: "container remix-app__header-content"
  }, /* @__PURE__ */ React4.createElement(import_remix7.Link, {
    to: "/",
    title: "Remix",
    prefetch: "intent",
    className: "remix-app__header-home-link"
  }, /* @__PURE__ */ React4.createElement(RemixLogo2, null)), alternateNav ? alternateNav : /* @__PURE__ */ React4.createElement(PrimaryNav2, null))), /* @__PURE__ */ React4.createElement("div", {
    className: "remix-app__main"
  }, /* @__PURE__ */ React4.createElement("div", {
    className: "container remix-app__main-content"
  }, children)), /* @__PURE__ */ React4.createElement("footer", {
    className: "remix-app__footer"
  }, /* @__PURE__ */ React4.createElement("div", {
    className: "container remix-app__footer-content"
  }, /* @__PURE__ */ React4.createElement("p", null, "\xA9 You!"))));
}
function RemixLogo2(props) {
  return /* @__PURE__ */ React4.createElement("svg", __spreadValues({
    viewBox: "0 0 659 165",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    "aria-labelledby": "remix-run-logo-title",
    role: "img",
    width: "106",
    height: "30",
    fill: "currentColor"
  }, props), /* @__PURE__ */ React4.createElement("title", {
    id: "remix-run-logo-title"
  }, "Remix Logo"), /* @__PURE__ */ React4.createElement("path", {
    d: "M0 161V136H45.5416C53.1486 136 54.8003 141.638 54.8003 145V161H0Z M133.85 124.16C135.3 142.762 135.3 151.482 135.3 161H92.2283C92.2283 158.927 92.2653 157.03 92.3028 155.107C92.4195 149.128 92.5411 142.894 91.5717 130.304C90.2905 111.872 82.3473 107.776 67.7419 107.776H54.8021H0V74.24H69.7918C88.2407 74.24 97.4651 68.632 97.4651 53.784C97.4651 40.728 88.2407 32.816 69.7918 32.816H0V0H77.4788C119.245 0 140 19.712 140 51.2C140 74.752 125.395 90.112 105.665 92.672C122.32 96 132.057 105.472 133.85 124.16Z"
  }), /* @__PURE__ */ React4.createElement("path", {
    d: "M229.43 120.576C225.59 129.536 218.422 133.376 207.158 133.376C194.614 133.376 184.374 126.72 183.35 112.64H263.478V101.12C263.478 70.1437 243.254 44.0317 205.11 44.0317C169.526 44.0317 142.902 69.8877 142.902 105.984C142.902 142.336 169.014 164.352 205.622 164.352C235.83 164.352 256.822 149.76 262.71 123.648L229.43 120.576ZM183.862 92.6717C185.398 81.9197 191.286 73.7277 204.598 73.7277C216.886 73.7277 223.542 82.4317 224.054 92.6717H183.862Z"
  }), /* @__PURE__ */ React4.createElement("path", {
    d: "M385.256 66.5597C380.392 53.2477 369.896 44.0317 349.672 44.0317C332.52 44.0317 320.232 51.7117 314.088 64.2557V47.1037H272.616V161.28H314.088V105.216C314.088 88.0638 318.952 76.7997 332.52 76.7997C345.064 76.7997 348.136 84.9917 348.136 100.608V161.28H389.608V105.216C389.608 88.0638 394.216 76.7997 408.04 76.7997C420.584 76.7997 423.4 84.9917 423.4 100.608V161.28H464.872V89.5997C464.872 65.7917 455.656 44.0317 424.168 44.0317C404.968 44.0317 391.4 53.7597 385.256 66.5597Z"
  }), /* @__PURE__ */ React4.createElement("path", {
    d: "M478.436 47.104V161.28H519.908V47.104H478.436ZM478.18 36.352H520.164V0H478.18V36.352Z"
  }), /* @__PURE__ */ React4.createElement("path", {
    d: "M654.54 47.1035H611.788L592.332 74.2395L573.388 47.1035H527.564L568.78 103.168L523.98 161.28H566.732L589.516 130.304L612.3 161.28H658.124L613.068 101.376L654.54 47.1035Z"
  }));
}
var RouteChangeAnnouncement2 = React4.memo(() => {
  let [hydrated, setHydrated] = React4.useState(false);
  let [innerHtml, setInnerHtml] = React4.useState("");
  let location = (0, import_remix7.useLocation)();
  React4.useEffect(() => {
    setHydrated(true);
  }, []);
  let firstRenderRef = React4.useRef(true);
  React4.useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    let pageTitle = location.pathname === "/" ? "Home page" : document.title;
    setInnerHtml(`Navigated to ${pageTitle}`);
  }, [location.pathname]);
  if (!hydrated) {
    return null;
  }
  return /* @__PURE__ */ React4.createElement("div", {
    "aria-live": "assertive",
    "aria-atomic": true,
    id: "route-change-region",
    style: {
      border: "0",
      clipPath: "inset(100%)",
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      width: "1px",
      whiteSpace: "nowrap",
      wordWrap: "normal"
    }
  }, innerHtml);
});

// app/lib/utils/seo.ts
function createOgImages(image) {
  return {
    "og:image:alt": image.altText,
    "og:image:url": image.url,
    "og:image:width": image.width,
    "og:image:height": image.height
  };
}
function createOgArticle(article) {
  return {
    "og:article:publishedTime": article.publishedTime,
    "og:article:modifiedTime": article.modifiedTime,
    "og:article:author": article.author,
    "og:article:tags": article.tags.map((tag) => tag.name).join(", ")
  };
}
function getHtmlMetadataTags({ metadata: metadata2, post, page, location }) {
  var _a, _b;
  let defaultImage = {
    altText: defaultSeoImages.generic.altText,
    url: defaultSeoImages.generic.url,
    height: "1920",
    width: "1080"
  };
  const url = `${metadata2.domain}${location.pathname}`;
  let metadataTags = __spreadProps(__spreadValues({
    "robots:": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    title: metadata2.title,
    description: metadata2.description,
    canonical: url,
    "og:locale": "en_US",
    "og:title": metadata2.title,
    "og:site_name": metadata2.siteTitle,
    "og:type": "website",
    "og:description": metadata2.description
  }, createOgImages(defaultImage)), {
    "twitter:card": `@${metadata2.social.twitter.username}`,
    "twitter:site": `@${metadata2.social.twitter.username}`,
    "twitter:creator": "summary_large_image",
    "twitter:label1": `Est. reading time`,
    "twitter:data1": `1 minute`
  });
  if (post) {
    metadataTags = __spreadProps(__spreadValues(__spreadValues(__spreadProps(__spreadValues({}, metadataTags), {
      title: post.seo.title,
      description: post.seo.metaDesc,
      canonical: url,
      "og:title": post.seo.title,
      "og:type": "article",
      "og:description": post.seo.metaDesc
    }), createOgArticle({
      publishedTime: post.seo.opengraphPublishedTime,
      modifiedTime: post.seo.opengraphPublishedTime,
      author: `${metadata2.domain}${post.author.uri}`,
      tags: post.tags
    })), createOgImages({
      altText: ((_a = post.featuredImage) == null ? void 0 : _a.altText) || defaultSeoImages.generic.altText,
      url: ((_b = post.featuredImage) == null ? void 0 : _b.altText) || defaultSeoImages.generic.altText,
      width: "1920",
      height: "1080"
    })), {
      "twitter:card": `@${metadata2.social.twitter.username}`,
      "twitter:site": `@${metadata2.social.twitter.username}`,
      "twitter:creator": "summary_large_image",
      "twitter:label1": `Written by`,
      "twitter:data1": `Teela`,
      "twitter:label2": `Est. reading time`,
      "twitter:data2": `1 minute`
    });
  }
  if (page) {
    metadataTags = __spreadValues({}, metadataTags);
  }
  return __spreadValues({}, metadataTags);
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/resource-library/members.tsx
var meta2 = (metaData) => {
  const { data, location, parentsData } = metaData;
  if (!data || !parentsData || !location) {
    return {
      title: "404",
      description: "error: No metaData or Parents Data"
    };
  }
  const page = {
    id: "24",
    title: "Resource Library: Members",
    author: {
      id: "22",
      name: "Teela",
      avatar: {
        url: "",
        width: 24,
        height: 24
      },
      slug: "resource-library/members"
    },
    slug: "resource-library/members",
    content: "",
    date: "",
    seo: {
      title: "Resource Library: Members - Every Tuesday",
      metaDesc: "Resource Library members only access with over 200+ assets for free!",
      fullHead: "",
      opengraphModifiedTime: "",
      opengraphPublishedTime: "",
      readingTime: "3min"
    }
  };
  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: null,
    page,
    location
  });
};
var loader2 = async ({ request }) => {
  await requireResourceLibraryUser(request, "/resource-library");
  try {
    return (0, import_remix9.json)({
      resourceData: []
    });
  } catch (e) {
    console.error(`e in /resource-library`, e);
    return (0, import_remix9.redirect)("/resource-library");
  }
};
var ResourceLibraryMembers = () => {
  const data = (0, import_remix9.useLoaderData)();
  console.log("data", data);
  return /* @__PURE__ */ React5.createElement(Layout2, {
    alternateNav: /* @__PURE__ */ React5.createElement(resourceNav_default, {
      showLogout: true
    })
  }, /* @__PURE__ */ React5.createElement("div", null, "Members AREA"));
};
var members_default = ResourceLibraryMembers;

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/resource-library/logout.ts
var logout_exports = {};
__export(logout_exports, {
  action: () => action,
  loader: () => loader3
});
var import_remix10 = __toModule(require("remix"));
var action = async ({ request }) => {
  return logoutResourceLibrary(request);
};
var loader3 = async () => {
  return (0, import_remix10.redirect)("/");
};

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/resource-library/index.tsx
var resource_library_exports = {};
__export(resource_library_exports, {
  action: () => action2,
  default: () => resource_library_default,
  loader: () => loader4
});
var import_remix11 = __toModule(require("remix"));
var React6 = __toModule(require("react"));
var import_uuid = __toModule(require("uuid"));
var loader4 = async ({ params }) => {
  const page = {
    title: "Resource Library",
    slug: "resource-library",
    description: "A jam packed resource library of design + lettering files",
    seo: {
      title: "Resource Library - Every Tuesday",
      opengraphModifiedTime: "",
      metaDesc: "When you join the Tuesday Tribe, you\u2019ll receive instant access to the Resource Library, filled with textures, fonts, vectors, stationery, graphics, cheat sheets and more."
    }
  };
  return (0, import_remix11.json)({ page }, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate" } });
};
var action2 = async ({ request }) => {
  let form = await request.formData();
  let password = form.get("password");
  if (typeof password !== "string") {
    return { formError: `Form not submitted correctly.` };
  }
  let fields = { password };
  let fieldErrors = {
    password: password !== process.env.RESOURCE_LIBRARY_PW ? `Incorrect Password` : void 0
  };
  console.log("fieldErrors", fieldErrors);
  if (Object.values(fieldErrors).some(Boolean))
    return { fieldErrors, fields };
  let userId = (0, import_uuid.v4)();
  let sessionStorage = createResourceUserSession(userId);
  const customHeaders = new Headers();
  customHeaders.append("Set-Cookie", await sessionStorage);
  return (0, import_remix11.redirect)("/resource-library/members", {
    headers: customHeaders
  });
};
var ResourceLibrarySignUp = () => {
  var _a, _b, _c;
  let actionData = (0, import_remix11.useActionData)();
  return /* @__PURE__ */ React6.createElement(Layout2, {
    alternateNav: /* @__PURE__ */ React6.createElement(resourceNav_default, null)
  }, /* @__PURE__ */ React6.createElement("div", {
    className: "login-form bg-gray-100 rounded-lg p-8 md:ml-auto mt-10 md:mt-12 w-5/12 m-auto"
  }, /* @__PURE__ */ React6.createElement("h4", {
    className: "text-gray-900 text-lg font-medium title-font mb-5 block"
  }, "Resource Library Login"), /* @__PURE__ */ React6.createElement(import_remix11.Form, {
    method: "post",
    className: "mb-4",
    "aria-describedby": (actionData == null ? void 0 : actionData.formError) ? "form-error-message" : void 0
  }, /* @__PURE__ */ React6.createElement("label", {
    htmlFor: "password-input",
    className: "leading-7 text-sm text-gray-600"
  }, "Password:", /* @__PURE__ */ React6.createElement("input", {
    id: "password-input",
    type: "password",
    className: "mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
    name: "password",
    "aria-invalid": Boolean((_a = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _a.password) || void 0,
    "aria-describedby": ((_b = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _b.password) ? "password-error" : void 0
  })), ((_c = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _c.password) ? /* @__PURE__ */ React6.createElement("p", {
    className: "form-validation-error",
    role: "alert",
    id: "password-error"
  }, actionData == null ? void 0 : actionData.fieldErrors.password) : null, /* @__PURE__ */ React6.createElement("button", {
    type: "submit",
    className: "text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
  }, "Login"))));
};
var resource_library_default = ResourceLibrarySignUp;

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/blog/preview/$id.tsx
var id_exports = {};
__export(id_exports, {
  default: () => id_default,
  loader: () => loader5
});
var import_remix13 = __toModule(require("remix"));

// app/lib/utils/loaderHelpers.ts
var import_lodash = __toModule(require("lodash"));
var import_remix12 = __toModule(require("remix"));

// app/lib/graphql/mutations/auth.ts
var Auth = `
  mutation LOGIN ( $input: LoginInput!) {
      login(input: $input) {
          authToken
          refreshToken
          clientMutationId
          user {
              id
              username
              name
              email
              firstName
              lastName
          }
      }
  }
`;
var REFRESH_LOGIN = `
  mutation RefreshAuthToken( $input: RefreshJwtAuthTokenInput!) {
        refreshJwtAuthToken(input: $input) {
            authToken
        }
    }
`;

// app/lib/api/fetch.ts
var import_uuid2 = __toModule(require("uuid"));
var api_url = typeof window !== "undefined" ? window.ENV.PUBLIC_WP_API_URL : process.env.PUBLIC_WP_API_URL;
async function fetchAPI(query4, { variables } = {}) {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false
  });
  const res = await fetch(api_url, {
    method: "POST",
    agent,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: query4,
      variables
    })
  });
  const json8 = await res.json();
  if (json8.errors) {
    console.error(json8.errors);
    throw new Error("WP QUERY FETCH" + json8.errors);
  }
  return json8.data;
}
async function getPreviewPostPageServer({ previewType, id, userToken }) {
  console.log("getPreviewPostPageServer", previewType);
  console.log("getPreviewPostPageServer id", id);
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false
  });
  const variables = {
    id
  };
  const queryPost = `
    query postById($id: ID!) {
        post(idType: DATABASE_ID, id: $id) {
            __typename
        author {
            node {
                avatar {
                    height
                    url
                    width
                }
                id
                name
                slug
                uri
            }
        }
        id
        categories {
            edges {
                node {
                    databaseId
                    id
                    name
                    slug
                }
            }
        }
        tags{
            edges{
                node{
                    name
                }
            }
        }
        content
        date
        excerpt
        featuredImage {
            node {
                altText
                caption
                sourceUrl
                srcSet
                sizes
                id
            }
        }
        modified
        databaseId
        title
        slug
        isSticky
        seo{
            title
            opengraphPublishedTime
            opengraphModifiedTime
            metaDesc
            readingTime
        }
        }
    }
  `;
  const queryPage = `
    query pageById($id: ID!) {
        page(idType: DATABASE_ID, id: $id) {
          author {
            node {
                avatar {
                    height
                    url
                    width
                }
                id
                name
                slug
                uri
            }
        }
        id
        content
        date
        featuredImage {
            node {
                altText
                caption
                sourceUrl
                srcSet
                sizes
                id
            }
        }
        title
        content
        seo{
            title
            opengraphPublishedTime
            opengraphModifiedTime
            metaDesc
            readingTime
        }
      }
    }
  `;
  return fetch(api_url, {
    method: "POST",
    credentials: "include",
    agent,
    headers: {
      "Content-Type": "application/json",
      authorization: userToken ? `Bearer ${userToken.token}` : ""
    },
    body: JSON.stringify({
      query: previewType === "blog" ? queryPost : queryPage,
      variables
    })
  });
}
async function logUserInJWT({ username, password }) {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false
  });
  const variables = {
    input: {
      clientMutationId: (0, import_uuid2.v4)(),
      username,
      password
    }
  };
  return fetch(api_url, {
    method: "POST",
    mode: "cors",
    agent,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: Auth,
      variables
    })
  });
}
async function refreshJWT({ cmid, refresh }) {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false
  });
  const variables = {
    input: {
      clientMutationId: cmid,
      jwtRefreshToken: refresh
    }
  };
  return fetch(api_url, {
    method: "POST",
    mode: "cors",
    agent,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: REFRESH_LOGIN,
      variables
    })
  });
}

// app/lib/utils/loaderHelpers.ts
function previewUrlParams(request) {
  let url = new URL(request.url);
  let previewType = url.searchParams.get("postType");
  let idSearchParam = previewType === "post" ? "previewPostId" : "PostId";
  let id = url.searchParams.get(idSearchParam);
  return {
    id,
    previewType,
    url
  };
}
function getIDParamName(type = "") {
  return type === "post" ? "previewPostId" : "postId";
}
function getPreviewUrlParams(request) {
  let url = new URL(request.url);
  let postType = url.searchParams.get("postType");
  let idSearchParam = getIDParamName(postType);
  let id = url.searchParams.get(idSearchParam);
  return {
    postType,
    id
  };
}
function getLoginRedirectParams({ previewType, id }) {
  if ((0, import_lodash.isEmpty)(previewType) || (0, import_lodash.isEmpty)(id)) {
    return "/login";
  }
  let idType = previewType === "blog" ? "previewPostId" : "postId";
  let postType = previewType === "blog" ? "post" : "page";
  return `/login?postType=${postType}&${idType}=${id}`;
}
var getPreviewRedirectUrl = (postType = "", previewPostId = "") => {
  if ((0, import_lodash.isEmpty)(postType) || (0, import_lodash.isEmpty)(previewPostId)) {
    return "/login";
  }
  switch (postType) {
    case "post":
      return `/blog/preview/${previewPostId}/`;
    case "page":
      return `/page/preview/${previewPostId}/`;
    default:
      return "/";
  }
};
var previewLoaderRouteHandler = async (request, params) => {
  let url = new URL(request.url);
  let previewType = url.pathname.split("/").splice(1).shift();
  let id = params.id;
  let loginUrl = getLoginRedirectParams({ previewType, id });
  let userToken = await requireToken(request, loginUrl);
  const customHeaders = new Headers();
  let isExpired = await isTokenExpired(userToken);
  console.log("isExpired", isExpired);
  if (!previewType || !id) {
    return (0, import_remix12.redirect)(loginUrl);
  }
  if (isExpired) {
    try {
      let refresh = await refreshJWT(userToken);
      let res = await refresh.json();
      let newToken = res.data.refreshJwtAuthToken.authToken;
      console.log("res of refresh", res);
      userToken.token = newToken;
      const sessionStorage = refreshCurrentSession(request, newToken);
      customHeaders.append("Set-Cookie", await sessionStorage);
    } catch (e) {
      throw (0, import_remix12.redirect)(loginUrl);
    }
  }
  try {
    const res = await getPreviewPostPageServer({
      previewType,
      id,
      userToken
    });
    const json8 = await res.json();
    const postType = previewType === "blog" ? "post" : "page";
    const postPageData = json8.data[postType];
    let body = JSON.stringify({
      [postType]: postPageData
    });
    return new Response(body, {
      headers: customHeaders
    });
  } catch (e) {
    console.error(`e in /${previewType}/preview/$id`, e);
    return (0, import_remix12.redirect)(loginUrl);
  }
};

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/blog/preview/$id.tsx
var loader5 = async ({ request, params, context }) => previewLoaderRouteHandler(request, params);
var PostPreview = () => {
  const data = (0, import_remix13.useLoaderData)();
  const dataRes = JSON.parse(data);
  console.log("dataRes", dataRes);
  return /* @__PURE__ */ React.createElement(Layout2, null, /* @__PURE__ */ React.createElement("div", null, "Preview Post"));
};
var id_default = PostPreview;

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/page/preview/$id.tsx
var id_exports2 = {};
__export(id_exports2, {
  default: () => id_default2,
  loader: () => loader6
});
var import_remix14 = __toModule(require("remix"));
var loader6 = async ({ request, params, context }) => previewLoaderRouteHandler(request, params);
var PostPreview2 = () => {
  const data = (0, import_remix14.useLoaderData)();
  const dataRes = JSON.parse(data);
  console.log("dataRes", dataRes);
  return /* @__PURE__ */ React.createElement(Layout2, null, /* @__PURE__ */ React.createElement("div", null, "Preview"));
};
var id_default2 = PostPreview2;

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/[manifest.json].ts
var manifest_json_exports = {};
__export(manifest_json_exports, {
  loader: () => loader7
});
var manifest = {
  "short_name": "Every Tuesday Blog",
  "name": "Every Tuesday: Procreate Freebies and Tutorials for Beginners",
  "icons": [
    {
      "src": "/images/icons-vector.svg",
      "type": "image/svg+xml",
      "sizes": "512x512"
    },
    {
      "src": "/images/icons-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/images/icons-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/",
  "background_color": "#3367D6",
  "display": "standalone",
  "scope": "/",
  "theme_color": "#3367D6",
  "shortcuts": [
    {
      "name": "How's weather today?",
      "short_name": "Today",
      "description": "View weather information for today",
      "url": "/today?source=pwa",
      "icons": [{ "src": "/images/today.png", "sizes": "192x192" }]
    },
    {
      "name": "How's weather tomorrow?",
      "short_name": "Tomorrow",
      "description": "View weather information for tomorrow",
      "url": "/tomorrow?source=pwa",
      "icons": [{ "src": "/images/tomorrow.png", "sizes": "192x192" }]
    }
  ],
  "description": "Design, Tips and Tricks",
  "screenshots": [
    {
      "src": "/images/screenshot1.png",
      "type": "image/png",
      "sizes": "540x720"
    },
    {
      "src": "/images/screenshot2.jpg",
      "type": "image/jpg",
      "sizes": "540x720"
    }
  ]
};
var loader7 = async ({ request }) => {
  return new Response(JSON.stringify(manifest), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/[sitemap.xml].ts
var sitemap_xml_exports = {};
__export(sitemap_xml_exports, {
  loader: () => loader8
});
var import_prettier = __toModule(require("prettier"));
var import_client = __toModule(require("@apollo/client"));

// app/utils/graphqlUtils.ts
function getGraphQLString(query4) {
  var _a;
  return (_a = query4.loc) == null ? void 0 : _a.source.body;
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/[sitemap.xml].ts
async function getSitemapData() {
  return fetchAPI(getGraphQLString(QUERY_SITEMAP), {
    variables: {
      count: 1e3
    }
  });
}
var loader8 = async ({ request }) => {
  let url = new URL(request.url);
  const { posts, pages } = await getSitemapData();
  let xml = await generateXmlIndex({
    pages: pages.edges,
    posts: posts.edges,
    homepage: url.origin
  });
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml"
    }
  });
};
async function generateXmlIndex({ pages, posts, homepage }) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>HOMEPAGE</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      ${pages.map((data) => {
    const page = data.node;
    return `
              <url>
                <loc>${homepage}/${page.slug}</loc>
                <priority>0.3</priority>
                <lastmod>${page.seo.opengraphModifiedTime}</lastmod>
              </url>
            `;
  }).join("")}
      ${posts.map((data) => {
    const post = data.node;
    return `
            <url>
              <loc>${homepage}/${post.slug}</loc>
              <lastmod>${post.seo.opengraphModifiedTime}</lastmod>
            </url>
          `;
  }).join("")}
    </urlset>
  `;
  const sitemapFormatted = import_prettier.default.format(sitemap, {
    printWidth: 120,
    parser: "html"
  });
  return sitemapFormatted;
}
var QUERY_SITEMAP = import_client.gql`
    query SiteMap($count: Int) {
        posts(first: $count) {
            __typename
            edges {
                __typename
                node {
                    status
                    date
                    modified
                    title
                    slug
                    seo {
                        title
                        opengraphModifiedTime
                        metaDesc
                    }
                }
            }
        }
        pages(first: $count){
            edges {
                node {
                    status
                    title
                    slug
                    seo {
                        title
                        opengraphModifiedTime
                    }
                    author {
                        node {
                            username
                        }
                    }
                }
            }
        }
    }
`;

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/courses/index.tsx
var courses_exports = {};
__export(courses_exports, {
  default: () => courses_default
});
var Courses = () => {
  return /* @__PURE__ */ React.createElement("div", null, "Courses Page");
};
var courses_default = Courses;

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/demos/actions.tsx
var actions_exports = {};
__export(actions_exports, {
  action: () => action3,
  default: () => ActionsDemo,
  meta: () => meta3
});
var import_react2 = __toModule(require("react"));
var import_remix15 = __toModule(require("remix"));
function meta3() {
  return { title: "Actions Demo" };
}
var action3 = async ({ request }) => {
  let formData = await request.formData();
  let answer = formData.get("answer");
  if (typeof answer !== "string") {
    return (0, import_remix15.json)("Come on, at least try!", { status: 400 });
  }
  if (answer !== "egg") {
    return (0, import_remix15.json)(`Sorry, ${answer} is not right.`, { status: 400 });
  }
  return (0, import_remix15.redirect)("/demos/correct");
};
function ActionsDemo() {
  let actionMessage = (0, import_remix15.useActionData)();
  let answerRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    if (actionMessage && answerRef.current) {
      answerRef.current.select();
    }
  }, [actionMessage]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "remix__page"
  }, /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("h2", null, "Actions!"), /* @__PURE__ */ React.createElement("p", null, "This form submission will send a post request that we handle in our `action` export. Any route can export an action to handle data mutations."), /* @__PURE__ */ React.createElement(import_remix15.Form, {
    method: "post",
    className: "remix__form"
  }, /* @__PURE__ */ React.createElement("h3", null, "Post an Action"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("i", null, "What is more useful when it is broken?")), /* @__PURE__ */ React.createElement("label", null, /* @__PURE__ */ React.createElement("div", null, "Answer:"), /* @__PURE__ */ React.createElement("input", {
    ref: answerRef,
    name: "answer",
    type: "text"
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", null, "Answer!")), actionMessage ? /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, actionMessage)) : null)), /* @__PURE__ */ React.createElement("aside", null, /* @__PURE__ */ React.createElement("h3", null, "Additional Resources"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Guide:", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://remix.run/guides/data-writes"
  }, "Data Writes")), /* @__PURE__ */ React.createElement("li", null, "API:", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://remix.run/api/conventions#action"
  }, "Route Action Export")), /* @__PURE__ */ React.createElement("li", null, "API:", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://remix.run/api/remix#useactiondata"
  }, /* @__PURE__ */ React.createElement("code", null, "useActionData"))))));
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/demos/correct.tsx
var correct_exports = {};
__export(correct_exports, {
  default: () => NiceWork
});
function NiceWork() {
  return /* @__PURE__ */ React.createElement("h1", null, "You got it right!");
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/[robots.txt].ts
var robots_txt_exports = {};
__export(robots_txt_exports, {
  loader: () => loader9
});
async function loader9() {
  let xml = await generateRobotsTxt();
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
async function generateRobotsTxt() {
  const sitemapUrl = `https://et-headless-wp.vercel.app/sitemap.xml`;
  return `User-agent: *
Allow: /
Sitemap: ${sitemapUrl}`;
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/demos/params.tsx
var params_exports = {};
__export(params_exports, {
  default: () => Boundaries,
  meta: () => meta4
});
var import_remix16 = __toModule(require("remix"));
function meta4() {
  return { title: "Boundaries Demo" };
}
function Boundaries() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "remix__page"
  }, /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(import_remix16.Outlet, null)), /* @__PURE__ */ React.createElement("aside", null, /* @__PURE__ */ React.createElement("h2", null, "Click these Links"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix16.Link, {
    to: "."
  }, "Start over")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix16.Link, {
    to: "one"
  }, "Param: ", /* @__PURE__ */ React.createElement("i", null, "one"))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix16.Link, {
    to: "two"
  }, "Param: ", /* @__PURE__ */ React.createElement("i", null, "two"))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix16.Link, {
    to: "this-record-does-not-exist"
  }, "This will be a 404")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix16.Link, {
    to: "shh-its-a-secret"
  }, "And this will be 401 Unauthorized")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix16.Link, {
    to: "kaboom"
  }, "This one will throw an error")))));
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/demos/params/index.tsx
var params_exports2 = {};
__export(params_exports2, {
  default: () => Boundaries2
});
function Boundaries2() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "Params"), /* @__PURE__ */ React.createElement("p", null, "When you name a route segment with $ like", " ", /* @__PURE__ */ React.createElement("code", null, "routes/users/$userId.js"), ", the $ segment will be parsed from the URL and sent to your loaders and actions by the same name."), /* @__PURE__ */ React.createElement("h2", null, "Errors"), /* @__PURE__ */ React.createElement("p", null, "When a route throws and error in it's action, loader, or component, Remix automatically catches it, won't even try to render the component, but it will render the route's ErrorBoundary instead. If the route doesn't have one, it will bubble up to the routes above it until it hits the root."), /* @__PURE__ */ React.createElement("p", null, "So be as granular as you want with your error handling."), /* @__PURE__ */ React.createElement("h2", null, "Not Found"), /* @__PURE__ */ React.createElement("p", null, "(and other", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses"
  }, "client errors"), ")"), /* @__PURE__ */ React.createElement("p", null, "Loaders and Actions can throw a ", /* @__PURE__ */ React.createElement("code", null, "Response"), " instead of an error and Remix will render the CatchBoundary instead of the component. This is great when loading data from a database isn't found. As soon as you know you can't render the component normally, throw a 404 response and send your app into the catch boundary. Just like error boundaries, catch boundaries bubble, too."));
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/demos/params/$id.tsx
var id_exports3 = {};
__export(id_exports3, {
  CatchBoundary: () => CatchBoundary2,
  ErrorBoundary: () => ErrorBoundary2,
  default: () => ParamDemo,
  loader: () => loader10,
  meta: () => meta5
});
var import_remix17 = __toModule(require("remix"));
var loader10 = async ({ params }) => {
  if (params.id === "this-record-does-not-exist") {
    throw new Response("Not Found", { status: 404 });
  }
  if (params.id === "shh-its-a-secret") {
    throw (0, import_remix17.json)({ webmasterEmail: "hello@remix.run" }, { status: 401 });
  }
  if (params.id === "kaboom") {
  }
  return { param: params.id };
};
function ParamDemo() {
  let data = (0, import_remix17.useLoaderData)();
  return /* @__PURE__ */ React.createElement("h1", null, "The param is ", /* @__PURE__ */ React.createElement("i", {
    style: { color: "red" }
  }, data.param));
}
function CatchBoundary2() {
  let caught = (0, import_remix17.useCatch)();
  let message;
  switch (caught.status) {
    case 401:
      message = /* @__PURE__ */ React.createElement("p", null, "Looks like you tried to visit a page that you do not have access to. Maybe ask the webmaster (", caught.data.webmasterEmail, ") for access.");
    case 404:
      message = /* @__PURE__ */ React.createElement("p", null, "Looks like you tried to visit a page that does not exist.");
    default:
      message = /* @__PURE__ */ React.createElement("p", null, "There was a problem with your request!", /* @__PURE__ */ React.createElement("br", null), caught.status, " ", caught.statusText);
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "Oops!"), /* @__PURE__ */ React.createElement("p", null, message), /* @__PURE__ */ React.createElement("p", null, "(Isn't it cool that the user gets to stay in context and try a different link in the parts of the UI that didn't blow up?)"));
}
function ErrorBoundary2({ error }) {
  console.error(error);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "Error!"), /* @__PURE__ */ React.createElement("p", null, error.message), /* @__PURE__ */ React.createElement("p", null, "(Isn't it cool that the user gets to stay in context and try a different link in the parts of the UI that didn't blow up?)"));
}
var meta5 = ({ data }) => {
  return {
    title: data ? `Param: ${data.param}` : "Oops..."
  };
};

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/api/wpLogin.ts
var wpLogin_exports = {};
__export(wpLogin_exports, {
  loader: () => loader11
});
var import_remix18 = __toModule(require("remix"));
var loader11 = async ({ request }) => {
  return (0, import_remix18.redirect)(process.env.WORDPRESS_DB || "/");
};

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/demos/about.tsx
var about_exports = {};
__export(about_exports, {
  default: () => Index,
  links: () => links2,
  meta: () => meta6
});
var import_remix19 = __toModule(require("remix"));

// app/styles/demos/about.css
var about_default = "/build/_assets/about-GGM5BPB3.css";

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/demos/about.tsx
var meta6 = () => {
  return {
    title: "About Remix"
  };
};
var links2 = () => {
  return [{ rel: "stylesheet", href: about_default }];
};
function Index() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "about"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "about__intro"
  }, /* @__PURE__ */ React.createElement("h2", null, "About Us"), /* @__PURE__ */ React.createElement("p", null, "Ok, so this page isn't really ", /* @__PURE__ */ React.createElement("em", null, "about us"), ", but we did want to show you a few more things Remix can do."), /* @__PURE__ */ React.createElement("p", null, "Did you notice that things look a little different on this page? The CSS that we import in the route file and include in its", " ", /* @__PURE__ */ React.createElement("code", null, "links"), " export is only included on this route and its children."), /* @__PURE__ */ React.createElement("p", null, "Wait a sec...", /* @__PURE__ */ React.createElement("em", null, "its children"), "? To understand what we mean by this,", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://remix.run/tutorial/4-nested-routes-params"
  }, "read all about nested routes in the docs"), "."), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(import_remix19.Outlet, null)));
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/demos/about/index.tsx
var about_exports2 = {};
__export(about_exports2, {
  default: () => AboutIndex
});
var import_remix20 = __toModule(require("remix"));
function AboutIndex() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "You are looking at the index route for the ", /* @__PURE__ */ React.createElement("code", null, "/about"), " URL segment, but there are nested routes as well!"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, /* @__PURE__ */ React.createElement(import_remix20.Link, {
    to: "whoa"
  }, "Check out one of them here."))));
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/demos/about/whoa.tsx
var whoa_exports = {};
__export(whoa_exports, {
  default: () => AboutIndex2
});
var import_remix21 = __toModule(require("remix"));
function AboutIndex2() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "Whoa, this is a nested route! We render the ", /* @__PURE__ */ React.createElement("code", null, "/about"), " layout route component, and its ", /* @__PURE__ */ React.createElement("code", null, "Outlet"), " renders our route component. \u{1F92F}"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, /* @__PURE__ */ React.createElement(import_remix21.Link, {
    to: ".."
  }, "Go back to the ", /* @__PURE__ */ React.createElement("code", null, "/about"), " index."))));
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/logout.ts
var logout_exports2 = {};
__export(logout_exports2, {
  action: () => action4,
  loader: () => loader12
});
var import_remix22 = __toModule(require("remix"));
var action4 = async ({ request }) => {
  return logout(request);
};
var loader12 = async () => {
  return (0, import_remix22.redirect)("/");
};

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/$slug.tsx
var slug_exports = {};
__export(slug_exports, {
  default: () => PostSlug,
  headers: () => headers,
  loader: () => loader13,
  meta: () => meta7
});
var import_remix23 = __toModule(require("remix"));

// app/lib/utils/posts.ts
function flattenAllPosts(posts) {
  var _a;
  const postsFiltered = (_a = posts == null ? void 0 : posts.edges) == null ? void 0 : _a.map(({ node = {} }) => node);
  return Array.isArray(postsFiltered) && postsFiltered.map(mapPostData);
}
function flattenPost(post) {
  return mapPostData(post);
}
function mapPostData(post = {}) {
  const data = __spreadValues({}, post);
  let modifiedData = __spreadValues({}, post);
  if (data.author) {
    modifiedData.author = __spreadValues({}, data.author.node);
  }
  if (data.categories) {
    modifiedData.categories = data.categories.edges.map(({ node }) => {
      return __spreadValues({}, node);
    });
  }
  if (data.featuredImage) {
    modifiedData.featuredImage = data.featuredImage.node;
  }
  if (data.tags) {
    modifiedData.tags = data.tags.edges.map(({ node }) => {
      return {
        name: node.name
      };
    });
  }
  return modifiedData;
}

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/$slug.tsx
var headers = ({ loaderHeaders }) => {
  return {
    "Cache-Control": "public, max-age=300, stale-while-revalidate"
  };
};
var loader13 = async ({ params }) => {
  let wpAPI = await fetchAPI(query, {
    variables: {
      slug: `${params.slug}`
    }
  });
  if (wpAPI.postBy === null) {
    throw new Response("Not Found", { status: 404 });
  }
  const post = flattenPost(wpAPI.postBy);
  return (0, import_remix23.json)({ post }, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate" } });
};
var meta7 = (metaData) => {
  const { data, location, parentsData } = metaData;
  if (!data || !parentsData || !location) {
    return {
      title: "404",
      description: "error: No metaData or Parents Data"
    };
  }
  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: data.post,
    page: null,
    location
  });
};
function PostSlug() {
  let { post } = (0, import_remix23.useLoaderData)();
  return /* @__PURE__ */ React.createElement(Layout2, null, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, post.title), /* @__PURE__ */ React.createElement("div", {
    dangerouslySetInnerHTML: { __html: post.content }
  }), /* @__PURE__ */ React.createElement(import_remix23.Link, {
    to: "/"
  }, "Home")));
}
var query = `
query postBySlug($slug: String!) {
    postBy(slug: $slug) {
        __typename
        author {
            node {
                avatar {
                    height
                    url
                    width
                }
                id
                name
                slug
                uri
            }
        }
        id
        categories {
            edges {
                node {
                    databaseId
                    id
                    name
                    slug
                }
            }
        }
        tags{
            edges{
                node{
                    name
                }
            }
        }
        content
        date
        excerpt
        featuredImage {
            node {
                altText
                caption
                sourceUrl
                srcSet
                sizes
                id
            }
        }
        modified
        databaseId
        title
        slug
        isSticky
        seo{
            title
            opengraphPublishedTime
            opengraphModifiedTime
            metaDesc
            readingTime
        }
      }
  }
`;

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index2,
  headers: () => headers2,
  loader: () => loader14,
  meta: () => meta8,
  query: () => query2
});
var import_remix24 = __toModule(require("remix"));
var headers2 = ({ loaderHeaders }) => {
  return {
    "Cache-Control": "public, max-age=300, stale-while-revalidate"
  };
};
var meta8 = (metaData) => {
  const { data, location, parentsData } = metaData;
  if (!data || !parentsData || !location) {
    return {
      title: "404",
      description: "error: No metaData or Parents Data"
    };
  }
  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: data.post,
    page: data.page,
    location
  });
};
var loader14 = async () => {
  let data = {
    resources: [
      {
        name: "Remix Docs",
        url: "https://remix.run/docs"
      },
      {
        name: "React Router Docs",
        url: "https://reactrouter.com/docs"
      },
      {
        name: "Remix Discord",
        url: "https://discord.gg/VBePs6d"
      }
    ],
    demos: [
      {
        to: "demos/actions",
        name: "Actions"
      },
      {
        to: "demos/about",
        name: "Nested Routes, CSS loading/unloading"
      },
      {
        to: "demos/params",
        name: "URL Params and Error Boundaries"
      }
    ]
  };
  let wpAPI;
  try {
    wpAPI = await fetchAPI(query2, {
      variables: {
        after: null
      }
    });
  } catch (e) {
    console.log("error", e);
  }
  const pageInfo = wpAPI == null ? void 0 : wpAPI.posts.pageInfo;
  const posts = flattenAllPosts(wpAPI == null ? void 0 : wpAPI.posts) || [];
  return __spreadProps(__spreadValues({}, data), {
    posts,
    pageInfo
  });
};
function Index2() {
  let data = (0, import_remix24.useLoaderData)();
  function fetchMore() {
  }
  return /* @__PURE__ */ React.createElement(Layout2, null, /* @__PURE__ */ React.createElement("div", {
    className: "remix__page"
  }, /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("h2", {
    className: "font-sentinel__SemiBoldItal text-slateGreen text-6xl spencer"
  }, "Welcome to Remix!"), /* @__PURE__ */ React.createElement("p", null, "We're stoked that you're here. \u{1F973}"), /* @__PURE__ */ React.createElement("p", null, "Feel free to take a look around the code to see how Remix does things, it might be a bit different than what you\u2019re used to. When you're ready to dive deeper, we've got plenty of resources to get you up-and-running quickly."), /* @__PURE__ */ React.createElement("p", null, "Check out all the demos in this starter, and then just delete the", " ", /* @__PURE__ */ React.createElement("code", null, "app/routes/demos"), " and ", /* @__PURE__ */ React.createElement("code", null, "app/styles/demos"), " ", "folders when you're ready to turn this into your next project.")), /* @__PURE__ */ React.createElement("aside", null, /* @__PURE__ */ React.createElement("h2", null, "Demos In This App"), /* @__PURE__ */ React.createElement("ul", null, data.demos.map((demo) => /* @__PURE__ */ React.createElement("li", {
    key: demo.to,
    className: "remix__page__resource"
  }, /* @__PURE__ */ React.createElement(import_remix24.Link, {
    to: demo.to,
    prefetch: "intent"
  }, demo.name)))), /* @__PURE__ */ React.createElement("h2", null, "Resources"), /* @__PURE__ */ React.createElement("ul", null, data.posts.map((post) => /* @__PURE__ */ React.createElement("li", {
    key: post.id,
    className: "remix__page__resource"
  }, /* @__PURE__ */ React.createElement(import_remix24.Link, {
    to: post.slug,
    prefetch: "intent"
  }, post.title)))), /* @__PURE__ */ React.createElement("button", {
    onClick: fetchMore
  }, "Fetch More"))));
}
var query2 = `
    query GetNextPosts($after: String) {
        posts(first: 10, after: $after) {
            __typename
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
                __typename
            }
            edges {
                __typename
                node {
                    __typename
                    author {
                        node {
                            avatar {
                                height
                                url
                                width
                            }
                            id
                            name
                            slug
                        }
                    }
                    id
                    categories {
                        edges {
                            node {
                                databaseId
                                id
                                name
                                slug
                            }
                        }
                    }
                    content
                    date
                    excerpt
                    featuredImage {
                        node {
                            altText
                            caption
                            sourceUrl
                            srcSet
                            sizes
                            id
                        }
                    }
                    modified
                    databaseId
                    title
                    slug
                    isSticky
                }
            }
        }
        allSettings {
            readingSettingsPostsPerPage
        }
    }
`;

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action5,
  default: () => login_default,
  loader: () => loader15,
  meta: () => meta9
});
var import_remix25 = __toModule(require("remix"));
var React7 = __toModule(require("react"));
var meta9 = (metaData) => {
  const { data, location, parentsData } = metaData;
  const page = {
    id: "24",
    title: "Login",
    author: {
      id: "23",
      name: "Teela",
      avatar: {
        url: "",
        width: 24,
        height: 24
      },
      slug: "login"
    },
    slug: "login",
    content: "",
    date: "",
    seo: {
      title: "Login - Every Tuesday",
      metaDesc: "Login Page for Every-Tuesday.com",
      fullHead: "",
      opengraphModifiedTime: "",
      opengraphPublishedTime: "",
      readingTime: "1min"
    }
  };
  if (!data || !parentsData || !location) {
    return {
      title: "404",
      description: "error: No metaData or Parents Data"
    };
  }
  return getHtmlMetadataTags({
    metadata: parentsData.root.metadata,
    post: data.post,
    page,
    location
  });
};
var loader15 = async ({ request }) => {
  const { id, previewType, url } = previewUrlParams(request);
  return {
    params: {
      id,
      postType: previewType,
      url
    }
  };
};
var action5 = async ({ request }) => {
  let form = await request.formData();
  let password = form.get("password");
  let username = form.get("username");
  if (typeof password !== "string" || typeof username !== "string") {
    return { formError: `Form not submitted correctly.` };
  }
  let fields = { password, username };
  let fieldErrors = {
    password: void 0,
    username: void 0
  };
  if (password.length < 4) {
    fieldErrors = {
      password: `Password length too small`,
      username: void 0
    };
    return { fieldErrors, fields };
  }
  try {
    const response = await logUserInJWT({ username, password });
    const serverRes = await response.json();
    if (serverRes.errors) {
      return {
        fields,
        formError: `Username/Password combination is incorrect`
      };
    }
    let token = {
      expires: setFutureDate(),
      token: String(serverRes.data.login.authToken),
      refresh: String(serverRes.data.login.refreshToken),
      cmid: String(serverRes.data.login.clientMutationId)
    };
    let user = serverRes.data.login.user;
    const sessionStorage = createUserSession(user.id, token);
    const customHeaders = new Headers();
    customHeaders.append("Set-Cookie", await sessionStorage);
    const { id, postType } = getPreviewUrlParams(request);
    if (!id || !postType) {
      return (0, import_remix25.redirect)(process.env.WORDPRESS_DB || "/", {
        headers: customHeaders
      });
    }
    const redirectUrl = getPreviewRedirectUrl(postType, id);
    return (0, import_remix25.redirect)(redirectUrl, {
      headers: customHeaders
    });
  } catch (e) {
    return { formError: `Form error: ${e}` };
  }
};
var Login = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  let actionData = (0, import_remix25.useActionData)();
  let { params } = (0, import_remix25.useLoaderData)();
  let transition = (0, import_remix25.useTransition)();
  let idParamName = getIDParamName(params.postType);
  let action6 = params.postType ? `/login?postType=${params.postType}&${idParamName}=${params.id}` : "/login";
  return /* @__PURE__ */ React7.createElement(Layout2, null, /* @__PURE__ */ React7.createElement("div", {
    className: "login-form bg-gray-100 rounded-lg p-8 md:ml-auto mt-10 md:mt-12 w-5/12 m-auto"
  }, /* @__PURE__ */ React7.createElement("h4", {
    className: "text-gray-900 text-lg font-medium title-font mb-5 block"
  }, "Login"), (actionData == null ? void 0 : actionData.formError) && /* @__PURE__ */ React7.createElement("div", {
    className: "text-red-600",
    dangerouslySetInnerHTML: { __html: actionData.formError || "" }
  }), /* @__PURE__ */ React7.createElement(import_remix25.Form, {
    method: "post",
    action: action6,
    "aria-disabled": transition.state !== "idle",
    className: "mb-4",
    "aria-describedby": ((_a = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _a.username) || ((_b = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _b.password) ? "form-error-message" : void 0
  }, /* @__PURE__ */ React7.createElement("div", null, /* @__PURE__ */ React7.createElement("label", {
    className: "leading-7 text-sm text-gray-600",
    htmlFor: "username-input"
  }, "Username"), /* @__PURE__ */ React7.createElement("input", {
    className: "mb-2 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
    type: "text",
    id: "username-input",
    name: "username",
    defaultValue: (_c = actionData == null ? void 0 : actionData.fields) == null ? void 0 : _c.username,
    "aria-invalid": Boolean((_d = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _d.username),
    "aria-describedby": ((_e = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _e.username) ? "username-error" : void 0
  }), ((_f = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _f.username) ? /* @__PURE__ */ React7.createElement("p", {
    className: "form-validation-error text-red-500",
    role: "alert",
    id: "username-error"
  }, actionData == null ? void 0 : actionData.fieldErrors.username) : null), /* @__PURE__ */ React7.createElement("div", null, /* @__PURE__ */ React7.createElement("label", {
    htmlFor: "password-input",
    className: "leading-7 text-sm text-gray-600"
  }, "Password:"), /* @__PURE__ */ React7.createElement("input", {
    id: "password-input",
    type: "password",
    className: "mb-8 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out",
    name: "password",
    "aria-invalid": Boolean((_g = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _g.password) || void 0,
    "aria-describedby": ((_h = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _h.password) ? "password-error" : void 0
  }), ((_i = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _i.password) ? /* @__PURE__ */ React7.createElement("p", {
    className: "form-validation-error text-red-500",
    role: "alert",
    id: "password-error"
  }, actionData == null ? void 0 : actionData.fieldErrors.password) : null), /* @__PURE__ */ React7.createElement("button", {
    disabled: transition.state !== "idle",
    "aria-disabled": transition.state !== "idle",
    type: "submit",
    className: "text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
  }, transition.state === "idle" ? "Login" : "...Loading"))));
};
var login_default = Login;

// route-module:/Users/spencerbigum/Documents/github/remix-wordpress/app/routes/feed.ts
var feed_exports = {};
__export(feed_exports, {
  loader: () => loader16
});
var import_rss = __toModule(require("rss"));
var import_client2 = __toModule(require("@apollo/client"));
async function getFeedData() {
  return fetchAPI(getGraphQLString(query3), {
    variables: {
      count: 10
    }
  });
}
var loader16 = async ({ request }) => {
  let url = new URL(request.url);
  const { posts } = await getFeedData();
  let xml = await generateFeed(posts.edges, url.origin);
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml"
    }
  });
};
async function generateFeed(posts, origin) {
  const feed = new import_rss.default({
    title: "myTitle",
    description: "description",
    site_url: origin,
    feed_url: `${origin}/feed`,
    copyright: `2015 Every-Tuesday`,
    language: "us-EN",
    pubDate: new Date()
  });
  posts.map((data) => {
    const post = data.node;
    console.log("data", post);
    feed.item({
      title: post.title,
      guid: `${origin}/${post.slug}`,
      url: `${origin}/${post.slug}`,
      date: post.date,
      description: post.excerpt,
      author: post.author.node.name,
      categories: post.categories.edges.map((cat) => cat.node.name) || []
    });
  });
  return feed.xml({ indent: true });
}
var query3 = import_client2.gql`
    query FeedPosts($count: Int) {
        posts(first: $count) {
            edges {
                node {
                    author{
                        node{
                            name
                        }
                    }
                    categories{
                        edges{
                            node{
                                name
                            }
                        }
                    }
                    date
                    modified
                    title
                    slug
                    excerpt
                    date
                    seo {
                        title
                        opengraphModifiedTime
                        metaDesc
                    }
                }
            }
        }
    }
`;

// <stdin>
var import_assets = __toModule(require("./assets.json"));
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/resource-library/members": {
    id: "routes/resource-library/members",
    parentId: "root",
    path: "resource-library/members",
    index: void 0,
    caseSensitive: void 0,
    module: members_exports
  },
  "routes/resource-library/logout": {
    id: "routes/resource-library/logout",
    parentId: "root",
    path: "resource-library/logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/resource-library/index": {
    id: "routes/resource-library/index",
    parentId: "root",
    path: "resource-library",
    index: true,
    caseSensitive: void 0,
    module: resource_library_exports
  },
  "routes/blog/preview/$id": {
    id: "routes/blog/preview/$id",
    parentId: "root",
    path: "blog/preview/:id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports
  },
  "routes/page/preview/$id": {
    id: "routes/page/preview/$id",
    parentId: "root",
    path: "page/preview/:id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports2
  },
  "routes/[manifest.json]": {
    id: "routes/[manifest.json]",
    parentId: "root",
    path: "manifest.json",
    index: void 0,
    caseSensitive: void 0,
    module: manifest_json_exports
  },
  "routes/[sitemap.xml]": {
    id: "routes/[sitemap.xml]",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: sitemap_xml_exports
  },
  "routes/courses/index": {
    id: "routes/courses/index",
    parentId: "root",
    path: "courses",
    index: true,
    caseSensitive: void 0,
    module: courses_exports
  },
  "routes/demos/actions": {
    id: "routes/demos/actions",
    parentId: "root",
    path: "demos/actions",
    index: void 0,
    caseSensitive: void 0,
    module: actions_exports
  },
  "routes/demos/correct": {
    id: "routes/demos/correct",
    parentId: "root",
    path: "demos/correct",
    index: void 0,
    caseSensitive: void 0,
    module: correct_exports
  },
  "routes/[robots.txt]": {
    id: "routes/[robots.txt]",
    parentId: "root",
    path: "robots.txt",
    index: void 0,
    caseSensitive: void 0,
    module: robots_txt_exports
  },
  "routes/demos/params": {
    id: "routes/demos/params",
    parentId: "root",
    path: "demos/params",
    index: void 0,
    caseSensitive: void 0,
    module: params_exports
  },
  "routes/demos/params/index": {
    id: "routes/demos/params/index",
    parentId: "routes/demos/params",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: params_exports2
  },
  "routes/demos/params/$id": {
    id: "routes/demos/params/$id",
    parentId: "routes/demos/params",
    path: ":id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports3
  },
  "routes/api/wpLogin": {
    id: "routes/api/wpLogin",
    parentId: "root",
    path: "api/wpLogin",
    index: void 0,
    caseSensitive: void 0,
    module: wpLogin_exports
  },
  "routes/demos/about": {
    id: "routes/demos/about",
    parentId: "root",
    path: "demos/about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports
  },
  "routes/demos/about/index": {
    id: "routes/demos/about/index",
    parentId: "routes/demos/about",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: about_exports2
  },
  "routes/demos/about/whoa": {
    id: "routes/demos/about/whoa",
    parentId: "routes/demos/about",
    path: "whoa",
    index: void 0,
    caseSensitive: void 0,
    module: whoa_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports2
  },
  "routes/$slug": {
    id: "routes/$slug",
    parentId: "root",
    path: ":slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/feed": {
    id: "routes/feed",
    parentId: "root",
    path: "feed",
    index: void 0,
    caseSensitive: void 0,
    module: feed_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=/build/index.js.map
