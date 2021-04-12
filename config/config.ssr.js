const resolvePath = (path) => require("path").resolve(process.cwd(), path);
const React = require("react");

const pageComponent = () =>
    __isBrowser__
        ? require("ykfe-utils").Loadable({
              loader: () =>
                  import(/* webpackChunkName: "page" */ "@/page/home"),
              loading: function Loading() {
                  return React.createElement("div");
              },
          })
        : require("@/page/home").default;

module.exports = {
    type: "ssr", // 指定运行类型可设置为csr切换为客户端渲染
    routes: [
        {
            path: "/page/:page",
            exact: true,
            Component: pageComponent,
            controller: "page",
            handler: "index",
        },
        {
            path: "/tags/:id/:page",
            exact: true,
            Component: pageComponent,
            controller: "page",
            handler: "index",
        },
        {
            path: "/article/detail/:id",
            exact: true,
            Component: () =>
                __isBrowser__
                    ? require("ykfe-utils").Loadable({
                          loader: () =>
                              import(
                                  /* webpackChunkName: "article" */ "@/page/articleDetail"
                              ),
                          loading: function Loading() {
                              return React.createElement("div");
                          },
                      })
                    : require("@/page/articleDetail").default,
            controller: "page",
            handler: "index",
        },
        {
            path: "/about",
            exact: true,
            Component: () =>
                // require('@/page/about').default,
                __isBrowser__
                    ? require("ykfe-utils").Loadable({
                          loader: () =>
                              import(
                                  /* webpackChunkName: "about" */ "@/page/about"
                              ),
                          loading: function Loading() {
                              return React.createElement("div");
                          },
                      })
                    : require("@/page/about").default,
            controller: "page",
            handler: "index",
        },
        {
            path: "/login",
            exact: true,
            Component: () =>
                // require('@/page/login').default,
                __isBrowser__
                    ? require("ykfe-utils").Loadable({
                          loader: () =>
                              import(
                                  /* webpackChunkName: "login" */ "@/page/login"
                              ),
                          loading: function Loading() {
                              return React.createElement("div");
                          },
                      })
                    : require("@/page/login").default,
            controller: "page",
            handler: "index",
        },

        {
            path: "/set/article/add",
            exact: true,
            // Component: () => require('@/page/set/addArticle').default,

            Component: () =>
                __isBrowser__
                    ? require("ykfe-utils").Loadable({
                          loader: () =>
                              import(
                                  /* webpackChunkName: "set" */ "@/page/set/addArticle"
                              ),
                          loading: function Loading() {
                              return React.createElement("div");
                          },
                      })
                    : require("@/page/set/addArticle").default,
            controller: "page",
            handler: "index",
        },
        {
            path: "/set/article/edit/:id",
            exact: true,
            Component: () => require("@/page/set/addArticle").default,
            Component: () =>
                __isBrowser__
                    ? require("ykfe-utils").Loadable({
                          loader: () =>
                              import(
                                  /* webpackChunkName: "set" */ "@/page/set/addArticle"
                              ),
                          loading: function Loading() {
                              return React.createElement("div");
                          },
                      })
                    : require("@/page/set/addArticle").default,
            controller: "page",
            handler: "index",
        },
        {
            path: "/set/selftalking",
            exact: true,
            // Component: () => require('@/page/set/selftalking').default,
            Component: () =>
                __isBrowser__
                    ? require("ykfe-utils").Loadable({
                          loader: () =>
                              import(
                                  /* webpackChunkName: "set" */ "@/page/set/selftalking"
                              ),
                          loading: function Loading() {
                              return React.createElement("div");
                          },
                      })
                    : require("@/page/set/selftalking").default,
            controller: "page",
            handler: "index",
        },
        {
            path: "/set/tags",
            exact: true,
            // Component: () => require('@/page/set/tags').default,
            Component: () =>
                __isBrowser__
                    ? require("ykfe-utils").Loadable({
                          loader: () =>
                              import(
                                  /* webpackChunkName: "set" */ "@/page/set/tags"
                              ),
                          loading: function Loading() {
                              return React.createElement("div");
                          },
                      })
                    : require("@/page/set/tags").default,
            controller: "page",
            handler: "index",
        },
        {
            path: "/set/upload",
            exact: true,
            // Component: () => require('@/page/set/upload').default,
            Component: () =>
                __isBrowser__
                    ? require("ykfe-utils").Loadable({
                          loader: () =>
                              import(
                                  /* webpackChunkName: "set" */ "@/page/set/upload"
                              ),
                          loading: function Loading() {
                              return React.createElement("div");
                          },
                      })
                    : require("@/page/set/upload").default,
            controller: "page",
            handler: "index",
        },
    ],
    baseDir: resolvePath(""),
    injectCss: [`/static/css/Page.chunk.css`], // 客户端需要加载的静态样式表
    injectScript: [
        `<script src='/static/js/runtime~Page.js'></script>`,
        `<script src='/static/js/vendor.chunk.js'></script>`,
        `<script src='/static/js/Page.chunk.js'></script>`,
    ], // 客户端需要加载的静态资源文件表
    serverJs: resolvePath(`dist/Page.server.js`),
    layout: resolvePath(`../dist/Layout.server.js`),
    useCDN: false,
};
