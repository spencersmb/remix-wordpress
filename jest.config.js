
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const TEST_REGEX = '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?|ts?)$'
const path = require('path')
module.exports = {
  preset: 'ts-jest',  
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/app/$1',
    '^@TestUtils/(.*)$': '<rootDir>/jest/$1',
  },
 "transformIgnorePatterns": [
    "/node_modules/(?!(@remix-run|@web-std)/).+\\.js$",
    "/node_modules/(?!(@remix-run|@web-std)/).+\\.ts$",
    "/node_modules/(?!(@remix-run|<@web-std)/).+\\.tsx$",
    // "node_modules/(?!(<@remix-run>|<@web-std>)/)"
  ],
  transform: {
    "^.+\\.(js|ts)$": "ts-jest",
  },
  // transform: {
  //   "\\.[jt]sx?$": [
  //     "babel-jest",

  //     { configFile: "./babel.config.js" },
  //   ],
  // },
  moduleDirectories: ['node_modules', path.join(__dirname, 'jest')],
  moduleFileExtensions: [
      'js',
      "ts",
      "tsx",
      "json",
      "node"
    ],
  setupFiles: ["<rootDir>/jest/setup-tests.ts"],
  setupFilesAfterEnv:[
    '@testing-library/jest-dom/extend-expect',
  ],
  testRegex: TEST_REGEX,
  rootDir: "./",
  verbose: true,
  globals: {
    "ts-jest": {
        diagnostics: true,
        tsconfig: true
    }
  },
  collectCoverage: false,
  collectCoverageFrom: [
      "<rootDir>/app/**/*.{ts,tsx}",
      '!<rootDir>/app/components/blog/blogTemplate.tsx',
      '!<rootDir>/app/components/cards/tuesdayMakers/**',
      '!<rootDir>/app/components/footer/FooterPrimary.tsx',
      '!<rootDir>/app/components/footer/makersSignUpFooter.tsx',
      '!<rootDir>/app/components/forms/layout/**',
      '!<rootDir>/app/components/forms/dropdown/**',
      '!<rootDir>/app/components/layout/**',
      '!<rootDir>/app/components/layoutTemplates/**',
      '!<rootDir>/app/components/modals/modalTypes.ts',
      '!<rootDir>/app/components/modals/signUpInstructionsPopUp.tsx',
      '!<rootDir>/app/components/nav/nav.css',
      '!<rootDir>/app/components/nav/popOver/popOverMenuItems.tsx',
      '!<rootDir>/app/components/post/**',
      '!<rootDir>/app/components/products/productLayout.tsx',
      '!<rootDir>/app/components/resourceLibrary/resourceNav.tsx',
      '!<rootDir>/app/utils/cartUtils.ts',
      '!<rootDir>/app/utils/fetch.clent.ts',
      '!<rootDir>/app/utils/fetch.server.ts',
      // '!<rootDir>/app/components/blog/**',
      // '!<rootDir>/app/components/buttons/**',
      // '!<rootDir>/app/components/cards/**',
      // '!<rootDir>/app/components/comments/**',
      // '!<rootDir>/app/components/footer/**',
      // '!<rootDir>/app/components/forms/**',
      // '!<rootDir>/app/components/gridDownloads/**',
      // '!<rootDir>/app/components/images/**',
      // '!<rootDir>/app/components/modals/**',
      // '!<rootDir>/app/components/nav/**',
      // '!<rootDir>/app/components/tabs/**',
      // '!<rootDir>/app/components/resourceLibrary/**',

      '!<rootDir>/app/components/seo/**',
      '!<rootDir>/app/components/sitemap/**',
      '!<rootDir>/app/components/svgs/**',
      '!<rootDir>/app/hooks/**',
      '!<rootDir>/app/lib/**',
      '!<rootDir>/app/utils/**',

      "!<rootDir>/app/assets/**",
      "!<rootDir>/app/routes/**",
      "!<rootDir>/app/interfaces/**",
      "!<rootDir>/app/server/**",
      "!<rootDir>/app/enums/**",
      "!<rootDir>/app/styles/**",
      '!<rootDir>/app/cookies.server.ts',
      '!<rootDir>/app/sessions.server.ts',
      '!<rootDir>/app/entry.client.tsx',
      '!<rootDir>/app/entry.server.tsx',
      '!<rootDir>/app/root.tsx',
      '!<rootDir>/app/components/blog/blogHomeTabs/blogCategoryTabs.tsx',
      "!**/node_modules/**",
      "!**/build/**",
      "!**/.github/**",
      "!**/.cache/**",
      "!**/.vscode/**",
      "!**/githubActions/**",
      "!**/plugins/**",
      "!**/public/**",
      "!**/redirects/**",
      "!**/styles/**",
  ],
  coverageReporters:["text-summary", ],
  coverageThreshold: {
      global: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90
      }
    }
};