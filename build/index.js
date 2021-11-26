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
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var React2 = __toModule(require("react"));
var import_remix2 = __toModule(require("remix"));

// app/styles/demos/remix.css
var remix_default = "/build/_assets/remix-5PPS2YMF.css";

// app/styles/global.css
var global_default = "/build/_assets/global-AKFP5T7A.css";

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
  menu: []
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
function getWPMetadata() {
  const { generalSettings } = metadata;
  let { title, description, language } = generalSettings;
  const settings = {
    domain: process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://every-tuesday.com/",
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
    alt: "",
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

// app/lib/redux/store.ts
var import_toolkit = __toModule(require("@reduxjs/toolkit"));
var store = (0, import_toolkit.configureStore)({
  reducer: {}
});

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/root.tsx
var import_react_redux = __toModule(require("react-redux"));
var import_lodash = __toModule(require("lodash"));
var links = () => {
  return [
    { rel: "stylesheet", href: global_default },
    {
      rel: "stylesheet",
      href: dark_default,
      media: "(prefers-color-scheme: dark)"
    },
    { rel: "stylesheet", href: remix_default }
  ];
};
var loader = async () => {
  return __spreadProps(__spreadValues({}, getWPMenu()), {
    metadata: getWPMetadata()
  });
};
function App() {
  let { menus, metadata: metadata2 } = (0, import_remix2.useLoaderData)();
  return /* @__PURE__ */ React2.createElement(import_react_redux.Provider, {
    store
  }, /* @__PURE__ */ React2.createElement(SiteContext.Provider, {
    value: {
      menu: menus,
      metadata: metadata2
    }
  }, /* @__PURE__ */ React2.createElement(Document, null, /* @__PURE__ */ React2.createElement(Layout, null, /* @__PURE__ */ React2.createElement(import_remix2.Outlet, null)))));
}
var JsonLd = () => {
  let matches = (0, import_remix2.useMatches)();
  console.log("matches", matches);
  let selected = matches.find((match) => match.params.slug);
  let isPost = (0, import_lodash.isEmpty)(selected);
  let hasData = selected == null ? void 0 : selected.data;
  console.log("hasData empty", (0, import_lodash.isEmpty)(hasData));
  console.log("isPost empty", (0, import_lodash.isEmpty)(isPost));
  return null;
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
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "facebook-domain-verification",
    content: "49a7ouvzn8x5uhb6gdmg2km5pnbfny"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "norton-safeweb-site-verification",
    content: "42o2xv441l6-j8hnbn5bc1wi76o7awsydx8s00-ad8jqokbtj2w3ylsaed7gk2tbd3o-tdzh62ynrlkpicf51voi7pfpa9j61f51405kq0t9z-v896p48l7nlqas6i4l"
  }), /* @__PURE__ */ React2.createElement(import_remix2.Meta, null), /* @__PURE__ */ React2.createElement(import_remix2.Links, null), /* @__PURE__ */ React2.createElement(JsonLd, null)), /* @__PURE__ */ React2.createElement("body", null, children, /* @__PURE__ */ React2.createElement(RouteChangeAnnouncement, null), /* @__PURE__ */ React2.createElement(import_remix2.ScrollRestoration, null), /* @__PURE__ */ React2.createElement(import_remix2.Scripts, null), process.env.NODE_ENV === "development" && /* @__PURE__ */ React2.createElement(import_remix2.LiveReload, null)));
}
function Layout({ children }) {
  const { menu, metadata: metadata2 } = useSite();
  const primaryMenu = getPrimaryMenu(menu);
  return /* @__PURE__ */ React2.createElement("div", {
    className: "remix-app"
  }, /* @__PURE__ */ React2.createElement("header", {
    className: "remix-app__header"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "container remix-app__header-content"
  }, /* @__PURE__ */ React2.createElement(import_remix2.Link, {
    to: "/",
    title: "Remix",
    className: "remix-app__header-home-link"
  }, /* @__PURE__ */ React2.createElement(RemixLogo, null)), /* @__PURE__ */ React2.createElement("nav", {
    "aria-label": "Main navigation",
    className: "remix-app__header-nav"
  }, /* @__PURE__ */ React2.createElement("ul", null, primaryMenu.map((menuItem) => {
    return /* @__PURE__ */ React2.createElement("li", {
      key: menuItem.id
    }, /* @__PURE__ */ React2.createElement(import_remix2.Link, {
      to: menuItem.path
    }, menuItem.label));
  }))))), /* @__PURE__ */ React2.createElement("div", {
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
  let caught = (0, import_remix2.useCatch)();
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
  let location = (0, import_remix2.useLocation)();
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

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/routes/courses/index.tsx
var courses_exports = {};
__export(courses_exports, {
  default: () => courses_default
});
var Courses = () => {
  return /* @__PURE__ */ React.createElement("div", null, "Courses Page");
};
var courses_default = Courses;

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/routes/demos/actions.tsx
var actions_exports = {};
__export(actions_exports, {
  action: () => action,
  default: () => ActionsDemo,
  meta: () => meta2
});
var import_react2 = __toModule(require("react"));
var import_remix4 = __toModule(require("remix"));
function meta2() {
  return { title: "Actions Demo" };
}
var action = async ({ request }) => {
  let formData = await request.formData();
  let answer = formData.get("answer");
  if (typeof answer !== "string") {
    return (0, import_remix4.json)("Come on, at least try!", { status: 400 });
  }
  if (answer !== "egg") {
    return (0, import_remix4.json)(`Sorry, ${answer} is not right.`, { status: 400 });
  }
  return (0, import_remix4.redirect)("/demos/correct");
};
function ActionsDemo() {
  let actionMessage = (0, import_remix4.useActionData)();
  let answerRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    if (actionMessage && answerRef.current) {
      answerRef.current.select();
    }
  }, [actionMessage]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "remix__page"
  }, /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("h2", null, "Actions!"), /* @__PURE__ */ React.createElement("p", null, "This form submission will send a post request that we handle in our `action` export. Any route can export an action to handle data mutations."), /* @__PURE__ */ React.createElement(import_remix4.Form, {
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

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/routes/demos/correct.tsx
var correct_exports = {};
__export(correct_exports, {
  default: () => NiceWork
});
function NiceWork() {
  return /* @__PURE__ */ React.createElement("h1", null, "You got it right!");
}

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/routes/demos/params.tsx
var params_exports = {};
__export(params_exports, {
  default: () => Boundaries,
  meta: () => meta3
});
var import_remix5 = __toModule(require("remix"));
function meta3() {
  return { title: "Boundaries Demo" };
}
function Boundaries() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "remix__page"
  }, /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement(import_remix5.Outlet, null)), /* @__PURE__ */ React.createElement("aside", null, /* @__PURE__ */ React.createElement("h2", null, "Click these Links"), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix5.Link, {
    to: "."
  }, "Start over")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix5.Link, {
    to: "one"
  }, "Param: ", /* @__PURE__ */ React.createElement("i", null, "one"))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix5.Link, {
    to: "two"
  }, "Param: ", /* @__PURE__ */ React.createElement("i", null, "two"))), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix5.Link, {
    to: "this-record-does-not-exist"
  }, "This will be a 404")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix5.Link, {
    to: "shh-its-a-secret"
  }, "And this will be 401 Unauthorized")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement(import_remix5.Link, {
    to: "kaboom"
  }, "This one will throw an error")))));
}

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/routes/demos/params/index.tsx
var params_exports2 = {};
__export(params_exports2, {
  default: () => Boundaries2
});
function Boundaries2() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "Params"), /* @__PURE__ */ React.createElement("p", null, "When you name a route segment with $ like", " ", /* @__PURE__ */ React.createElement("code", null, "routes/users/$userId.js"), ", the $ segment will be parsed from the URL and sent to your loaders and actions by the same name."), /* @__PURE__ */ React.createElement("h2", null, "Errors"), /* @__PURE__ */ React.createElement("p", null, "When a route throws and error in it's action, loader, or component, Remix automatically catches it, won't even try to render the component, but it will render the route's ErrorBoundary instead. If the route doesn't have one, it will bubble up to the routes above it until it hits the root."), /* @__PURE__ */ React.createElement("p", null, "So be as granular as you want with your error handling."), /* @__PURE__ */ React.createElement("h2", null, "Not Found"), /* @__PURE__ */ React.createElement("p", null, "(and other", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses"
  }, "client errors"), ")"), /* @__PURE__ */ React.createElement("p", null, "Loaders and Actions can throw a ", /* @__PURE__ */ React.createElement("code", null, "Response"), " instead of an error and Remix will render the CatchBoundary instead of the component. This is great when loading data from a database isn't found. As soon as you know you can't render the component normally, throw a 404 response and send your app into the catch boundary. Just like error boundaries, catch boundaries bubble, too."));
}

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/routes/demos/params/$id.tsx
var id_exports = {};
__export(id_exports, {
  CatchBoundary: () => CatchBoundary2,
  ErrorBoundary: () => ErrorBoundary2,
  default: () => ParamDemo,
  loader: () => loader2,
  meta: () => meta4
});
var import_remix6 = __toModule(require("remix"));
var loader2 = async ({ params }) => {
  if (params.id === "this-record-does-not-exist") {
    throw new Response("Not Found", { status: 404 });
  }
  if (params.id === "shh-its-a-secret") {
    throw (0, import_remix6.json)({ webmasterEmail: "hello@remix.run" }, { status: 401 });
  }
  if (params.id === "kaboom") {
  }
  return { param: params.id };
};
function ParamDemo() {
  let data = (0, import_remix6.useLoaderData)();
  return /* @__PURE__ */ React.createElement("h1", null, "The param is ", /* @__PURE__ */ React.createElement("i", {
    style: { color: "red" }
  }, data.param));
}
function CatchBoundary2() {
  let caught = (0, import_remix6.useCatch)();
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
var meta4 = ({ data }) => {
  return {
    title: data ? `Param: ${data.param}` : "Oops..."
  };
};

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/routes/demos/about.tsx
var about_exports = {};
__export(about_exports, {
  default: () => Index,
  links: () => links2,
  meta: () => meta5
});
var import_remix7 = __toModule(require("remix"));

// app/styles/demos/about.css
var about_default = "/build/_assets/about-GGM5BPB3.css";

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/routes/demos/about.tsx
var meta5 = () => {
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
  }, "read all about nested routes in the docs"), "."), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement(import_remix7.Outlet, null)));
}

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/routes/demos/about/index.tsx
var about_exports2 = {};
__export(about_exports2, {
  default: () => AboutIndex
});
var import_remix8 = __toModule(require("remix"));
function AboutIndex() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "You are looking at the index route for the ", /* @__PURE__ */ React.createElement("code", null, "/about"), " URL segment, but there are nested routes as well!"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, /* @__PURE__ */ React.createElement(import_remix8.Link, {
    to: "whoa"
  }, "Check out one of them here."))));
}

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/routes/demos/about/whoa.tsx
var whoa_exports = {};
__export(whoa_exports, {
  default: () => AboutIndex2
});
var import_remix9 = __toModule(require("remix"));
function AboutIndex2() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", null, "Whoa, this is a nested route! We render the ", /* @__PURE__ */ React.createElement("code", null, "/about"), " layout route component, and its ", /* @__PURE__ */ React.createElement("code", null, "Outlet"), " renders our route component. \u{1F92F}"), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", null, /* @__PURE__ */ React.createElement(import_remix9.Link, {
    to: ".."
  }, "Go back to the ", /* @__PURE__ */ React.createElement("code", null, "/about"), " index."))));
}

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/routes/$slug.tsx
var slug_exports = {};
__export(slug_exports, {
  default: () => PostSlug,
  headers: () => headers,
  loader: () => loader3,
  meta: () => meta6
});
var import_remix10 = __toModule(require("remix"));

// app/lib/api/fetch.ts
async function fetchAPI(query3, { variables } = {}) {
  const https = require("https");
  const agent = new https.Agent({
    rejectUnauthorized: false
  });
  const api_url = "https://etheadless.graphcdn.app/";
  const res = await fetch(api_url, {
    method: "POST",
    agent,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: query3,
      variables
    })
  });
  const json6 = await res.json();
  if (json6.errors) {
    console.error(json6.errors);
    throw new Error("WP QUERY FETCH" + json6.errors);
  }
  return json6.data;
}

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

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/routes/$slug.tsx
var headers = ({ loaderHeaders }) => {
  return {
    "Cache-Control": "public, max-age=300, stale-while-revalidate"
  };
};
var loader3 = async ({ params }) => {
  let wpAPI = await fetchAPI(query, {
    variables: {
      slug: `${params.slug}`
    }
  });
  if (wpAPI.postBy === null) {
    throw new Response("Not Found", { status: 404 });
  }
  const post = flattenPost(wpAPI.postBy);
  return (0, import_remix10.json)({ post }, { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate" } });
};
var meta6 = ({ data }) => {
  var _a, _b;
  if (!data) {
    return {
      title: "404",
      description: "error"
    };
  }
  const post = data == null ? void 0 : data.post;
  const { metadata: metadata2 } = useSite();
  return {
    title: post.seo.title,
    description: post.seo.metaDesc,
    canonical: `${metadata2.domain}${post.slug}`,
    "twitter:card": `@${metadata2.social.twitter.username}`,
    "twitter:site": `@${metadata2.social.twitter.username}`,
    "twitter:creator": "summary_large_image",
    "og:title": post.seo.title,
    "og:type": "article",
    "og:description": post.seo.metaDesc,
    "og:image:alt": ((_a = post.featuredImage) == null ? void 0 : _a.altText) || defaultSeoImages.generic.alt,
    "og:image:url": ((_b = post.featuredImage) == null ? void 0 : _b.sourceUrl) || defaultSeoImages.generic.url,
    "og:image:width": "1920",
    "og:image:height": "1080",
    "og:article:publishedTime": post.seo.opengraphPublishedTime,
    "og:article:modifiedTime": post.seo.opengraphPublishedTime,
    "og:article:author": `${metadata2.domain}${post.author.uri}`
  };
};
function PostSlug() {
  let { post } = (0, import_remix10.useLoaderData)();
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, post.title), /* @__PURE__ */ React.createElement("div", {
    dangerouslySetInnerHTML: { __html: post.content }
  }), /* @__PURE__ */ React.createElement(import_remix10.Link, {
    to: "/"
  }, "Home"));
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

// route-module:/Users/spencerbigum/Documents/github/etwp-remix/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index2,
  loader: () => loader4,
  meta: () => meta7,
  query: () => query2
});
var import_remix11 = __toModule(require("remix"));
var loader4 = async () => {
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
  let wpAPI = await fetchAPI(query2, {
    variables: {
      after: null
    }
  });
  const pageInfo = wpAPI == null ? void 0 : wpAPI.posts.pageInfo;
  const posts = flattenAllPosts(wpAPI == null ? void 0 : wpAPI.posts) || [];
  return __spreadProps(__spreadValues({}, data), {
    posts,
    pageInfo
  });
};
var meta7 = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};
function Index2() {
  let data = (0, import_remix11.useLoaderData)();
  function fetchMore() {
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "remix__page"
  }, /* @__PURE__ */ React.createElement("main", null, /* @__PURE__ */ React.createElement("h2", null, "Welcome to Remix!"), /* @__PURE__ */ React.createElement("p", null, "We're stoked that you're here. \u{1F973}"), /* @__PURE__ */ React.createElement("p", null, "Feel free to take a look around the code to see how Remix does things, it might be a bit different than what you\u2019re used to. When you're ready to dive deeper, we've got plenty of resources to get you up-and-running quickly."), /* @__PURE__ */ React.createElement("p", null, "Check out all the demos in this starter, and then just delete the", " ", /* @__PURE__ */ React.createElement("code", null, "app/routes/demos"), " and ", /* @__PURE__ */ React.createElement("code", null, "app/styles/demos"), " ", "folders when you're ready to turn this into your next project.")), /* @__PURE__ */ React.createElement("aside", null, /* @__PURE__ */ React.createElement("h2", null, "Demos In This App"), /* @__PURE__ */ React.createElement("ul", null, data.demos.map((demo) => /* @__PURE__ */ React.createElement("li", {
    key: demo.to,
    className: "remix__page__resource"
  }, /* @__PURE__ */ React.createElement(import_remix11.Link, {
    to: demo.to,
    prefetch: "intent"
  }, demo.name)))), /* @__PURE__ */ React.createElement("h2", null, "Resources"), /* @__PURE__ */ React.createElement("ul", null, data.posts.map((post) => /* @__PURE__ */ React.createElement("li", {
    key: post.id,
    className: "remix__page__resource"
  }, /* @__PURE__ */ React.createElement(import_remix11.Link, {
    to: post.slug,
    prefetch: "intent"
  }, post.title)))), /* @__PURE__ */ React.createElement("button", {
    onClick: fetchMore
  }, "Fetch More")));
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
    module: id_exports
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
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=/build/index.js.map
