import React from "react";
import ReactDOM from "react-dom";
import dva from "dva";
import { BrowserRouter, StaticRouter, Route, Switch } from "react-router-dom";
import { getWrappedComponent, getComponent } from "ykfe-utils";
import { createMemoryHistory, createBrowserHistory } from "history";
import { routes as Routes } from "../config/config.ssr";
import {
  recomposeStore,
  uuidName,
  globalServerRenderCtxDataName,
} from "./utils";
import defaultLayout from "@/layout";
import models from "./models";
import { get, isEmpty, set, isObject } from "lodash";
import { v4 as uuidv4 } from "uuid";

const initDva = (options) => {
  const app = dva(options);
  models.forEach((m) => app.model(m));
  app.router(() => {});
  app.start();
  return app;
};

const clientRender = async () => {
  let initialState = window.__INITIAL_DATA__ || {};
  if (process.env.NODE_ENV === "production") {
    delete window.__INITIAL_DATA__;
  }
  const history = createBrowserHistory();
  // 用于改写 initialState
  // initialState = await recomposeClientStore(initialState);

  const app = initDva({
    initialState,
    history: history,
  });
  const store = app._store;

  store.dispatch({ type: "common/getUserInfo" });
  store.dispatch({ type: "common/setInitBrowserInfo" });

  app.router(() => (
    <BrowserRouter>
      <Switch>
        {Routes.map(({ path, exact, Component }) => {
          const ActiveComponent = Component();
          const Layout = ActiveComponent.Layout || defaultLayout;
          const WrappedComponent = getWrappedComponent(ActiveComponent);
          return (
            <Route
              exact={exact}
              key={path}
              path={path}
              render={(props) => {
                return (
                  <Layout key={get(props, "match.url")}>
                    <WrappedComponent store={store} />
                  </Layout>
                );
              }}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  ));
  const DvaApp = app.start();

  ReactDOM[window.__USE_SSR__ ? "hydrate" : "render"](
    <DvaApp />,
    document.getElementById("app")
  );

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept();
  }
};

const serverRender = async (ctx) => {
  /**   添加全局标识，用于服务端请求添加 Cookie等信息   */
  const uuid = uuidv4();
  if (isEmpty(get(global, globalServerRenderCtxDataName))) {
    global[globalServerRenderCtxDataName] = {};
  }
  global[globalServerRenderCtxDataName][uuid] = {
    request: {
      headers: {
        Cookie: get(ctx, "headers.cookie"),
      },
    },
    setCookies: [],
  };

  /**   init Dva    */
  const app = initDva({
    history: createMemoryHistory({
      initialEntries: [ctx.req.url],
    }),
  });
  const store = app._store;
  ctx.store = store;

  /**  重写dispatch方法，用于注入一个标识  */
  const dispatch = store.dispatch;
  store.dispatch = function (action, ...other) {
    if (isObject(get(action, "payload"))) {
      action.payload[uuidName] = uuid;
    }
    return dispatch(action);
  };

  const ActiveComponent = getComponent(Routes, ctx.path)();
  const Layout = ActiveComponent.Layout || defaultLayout;
  ActiveComponent.getInitialProps
    ? await Promise.all([ActiveComponent.getInitialProps(ctx)])
    : {}; // eslint-disable-line

  // const setCookies = get(
  //   global,
  //   `${globalServerRenderCtxDataName}.${uuid}.setCookies`
  // );

  delete global[globalServerRenderCtxDataName][uuid];
  console.log(global[globalServerRenderCtxDataName]);

  const storeState = store.getState();
  ctx.serverData = storeState;

  app.router(() => (
    <StaticRouter location={ctx.req.url} context={storeState}>
      <Layout layoutData={ctx}>
        <ActiveComponent {...storeState} />
      </Layout>
    </StaticRouter>
  ));

  const DvaApp = app.start();
  return <DvaApp />;
};

export default __isBrowser__ ? clientRender() : serverRender;
