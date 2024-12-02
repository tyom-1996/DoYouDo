self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [
    "static/chunks/webpack.js",
    "static/chunks/main-app.js"
  ],
  "pages": {
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/create-order": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/create-order.js"
    ],
    "/freelancers": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/freelancers.js"
    ],
    "/my-projects/client/[id]/edit": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/my-projects/client/[id]/edit.js"
    ],
    "/my-projects/client/[id]/featured-freelancers": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/my-projects/client/[id]/featured-freelancers.js"
    ],
    "/projects": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/projects.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];