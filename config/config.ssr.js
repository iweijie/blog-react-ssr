const resolvePath = (path) => require('path').resolve(__dirname, path);
const React = require('react');
const isDev = process.env.NODE_ENV === 'development';

  // 版本控制，可以用于修改版本，修改资源引用缓存问题
const version = '0.0.1';
const jsPrefix = isDev ? `/static/js` : `/static/${version}/js`;
const cssPrefix = isDev ? `/static/css` : `/static/${version}/css`;

module.exports = {
  type: 'ssr', // 指定运行类型可设置为csr切换为客户端渲染
  routes: [
    {
      path: '/',
      exact: true,
      Component: () =>
        __isBrowser__
          ? require('ykfe-utils').Loadable({
              loader: () => import(/* webpackChunkName: "tags" */ '@/page/home'),
              loading: function Loading() {
                return React.createElement('div');
              },
            })
          : require('@/page/home').default,
      controller: 'page',
      handler: 'index',
    },
    {
      path: '/tags/:id',
      exact: true,
      Component: () =>
        __isBrowser__
          ? require('ykfe-utils').Loadable({
              loader: () => import(/* webpackChunkName: "tags" */ '@/page/home'),
              loading: function Loading() {
                return React.createElement('div');
              },
            })
          : require('@/page/home').default,
      controller: 'page',
      handler: 'index',
    },
    {
      path: '/article/detail/:id',
      exact: true,
      Component: () =>
        // require('@/page/articleDetail').default,
        __isBrowser__
          ? require('ykfe-utils').Loadable({
              loader: () => import(/* webpackChunkName: "article" */ '@/page/articleDetail'),
              loading: function Loading() {
                return React.createElement('div');
              },
            })
          : require('@/page/articleDetail').default,
      controller: 'page',
      handler: 'index',
    },
    {
      path: '/about',
      exact: true,
      Component: () =>
        // require('@/page/about').default,
        __isBrowser__
          ? require('ykfe-utils').Loadable({
              loader: () => import(/* webpackChunkName: "about" */ '@/page/about'),
              loading: function Loading() {
                return React.createElement('div');
              },
            })
          : require('@/page/about').default,
      controller: 'page',
      handler: 'index',
    },
    {
      path: '/selftalking',
      exact: true,
      Component: () =>
        // require('@/page/selftalking').default,
        __isBrowser__
          ? require('ykfe-utils').Loadable({
              loader: () => import(/* webpackChunkName: "selftalking" */ '@/page/selftalking'),
              loading: function Loading() {
                return React.createElement('div');
              },
            })
          : require('@/page/selftalking').default,
      controller: 'page',
      handler: 'index',
    },
    {
      path: '/login',
      exact: true,
      Component: () =>
        // require('@/page/login').default,
        __isBrowser__
          ? require('ykfe-utils').Loadable({
              loader: () => import(/* webpackChunkName: "login" */ '@/page/login'),
              loading: function Loading() {
                return React.createElement('div');
              },
            })
          : require('@/page/login').default,
      controller: 'page',
      handler: 'index',
    },
    {
      path: '/set/article/add',
      exact: true,
      // Component: () => require('@/page/set/addArticle').default,

      Component: () =>
        __isBrowser__
          ? require('ykfe-utils').Loadable({
              loader: () => import(/* webpackChunkName: "set" */ '@/page/set/addArticle'),
              loading: function Loading() {
                return React.createElement('div');
              },
            })
          : require('@/page/set/addArticle').default,
      controller: 'page',
      handler: 'index',
    },
    {
      path: '/set/article/edit/:id',
      exact: true,
      Component: () => require('@/page/set/addArticle').default,
      Component: () =>
        __isBrowser__
          ? require('ykfe-utils').Loadable({
              loader: () => import(/* webpackChunkName: "set" */ '@/page/set/addArticle'),
              loading: function Loading() {
                return React.createElement('div');
              },
            })
          : require('@/page/set/addArticle').default,
      controller: 'page',
      handler: 'index',
    },
    {
      path: '/set/selftalking',
      exact: true,
      // Component: () => require('@/page/set/selftalking').default,
      Component: () =>
        __isBrowser__
          ? require('ykfe-utils').Loadable({
              loader: () => import(/* webpackChunkName: "set" */ '@/page/set/selftalking'),
              loading: function Loading() {
                return React.createElement('div');
              },
            })
          : require('@/page/set/selftalking').default,
      controller: 'page',
      handler: 'index',
    },
    {
      path: '/set/tags',
      exact: true,
      // Component: () => require('@/page/set/tags').default,
      Component: () =>
        __isBrowser__
          ? require('ykfe-utils').Loadable({
              loader: () => import(/* webpackChunkName: "set" */ '@/page/set/tags'),
              loading: function Loading() {
                return React.createElement('div');
              },
            })
          : require('@/page/set/tags').default,
      controller: 'page',
      handler: 'index',
    },
    {
      path: '/set/upload',
      exact: true,
      // Component: () => require('@/page/set/upload').default,
      Component: () =>
        __isBrowser__
          ? require('ykfe-utils').Loadable({
              loader: () => import(/* webpackChunkName: "set" */ '@/page/set/upload'),
              loading: function Loading() {
                return React.createElement('div');
              },
            })
          : require('@/page/set/upload').default,
      controller: 'page',
      handler: 'index',
    },
    // {
    //   path: "/set/memo",
    //   exact: true,
    //   Component: () => require("@/page/set/memo").default,
    //   controller: "page",
    //   handler: "index",
    // },
  ],
  baseDir: resolvePath('../'),
  injectCss: [`${cssPrefix}/Page.chunk.css`], // 客户端需要加载的静态样式表
  injectScript: [
    `<script src='${jsPrefix}/runtime~Page.js'></script>`,
    `<script src='${jsPrefix}/vendor.chunk.js'></script>`,
    `<script src='${jsPrefix}/Page.chunk.js'></script>`,
  ], // 客户端需要加载的静态资源文件表
  serverJs: resolvePath(`../dist/Page${isDev ? '' : version}.server.js`),
  layout: resolvePath(`../dist/Layout${isDev ? '' : version}.server.js`),
  useCDN: false,
  version,
  jsPrefix,
  cssPrefix,
  isDev,
};
