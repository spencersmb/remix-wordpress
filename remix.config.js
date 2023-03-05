// /**
//  * @type {import('@remix-run/dev/config').AppConfig}
//  */
// module.exports = {
//   appDirectory: "app",
//   browserBuildDirectory: "public/build",
//   publicPath: "/build/",
//   serverBuildDirectory: "build",
//   devServerPort: 8002
// };

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  devServerPort: 8002,
  future: {
    v2_meta: true,
    unstable_tailwind: true,
    // unstable_dev: true,
  },
    // devServerPort: 8002
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
