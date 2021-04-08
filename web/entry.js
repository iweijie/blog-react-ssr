import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, StaticRouter, Route, Switch } from "react-router-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import defaultLayout from "@/layout";
import {
    getWrappedComponent,
    getComponent,
    preloadComponent,
} from "ykfe-utils";
import {
    recomposeStore,
    uuidName,
    globalServerRenderCtxDataName,
} from "./utils";
import config from "../config/config.ssr";
import models from "./models";
import createStore from "./createStore";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";

const Routes = config.routes;

const clientRender = async () => {
    const initialState = window.__INITIAL_DATA__ || {};

    const { store } = createStore(initialState);

    const clientRoutes = await preloadComponent(Routes, config);

    // 客户端渲染||hydrate
    ReactDOM[window.__USE_SSR__ ? "hydrate" : "render"](
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    {// 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
                    clientRoutes.map(({ path, exact, Component }) => {
                        const activeComponent = Component();
                        const WrappedComponent = getWrappedComponent(
                            activeComponent
                        );
                        const Layout = WrappedComponent.Layout || defaultLayout;
                        return (
                            <Route
                                exact={exact}
                                key={path}
                                path={path}
                                render={() => (
                                    <Layout>
                                        <WrappedComponent store={store} />
                                    </Layout>
                                )}
                            />
                        );
                    })}
                </Switch>
            </BrowserRouter>
        </Provider>,
        document.getElementById("app")
    );

    if (process.env.NODE_ENV === "development" && module.hot) {
        module.hot.accept();
    }
};

const serverRender = async (ctx) => {
    const { store, reducers } = createStore();

    ctx.store = store;
    ctx._reducers = reducers;

    // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
    const ActiveComponent = getComponent(Routes, ctx.path)();
    ActiveComponent.getInitialProps
        ? await ActiveComponent.getInitialProps(ctx)
        : {};
    const Layout = ActiveComponent.Layout || defaultLayout;
    const serverData = undefined;
    //  {} || store.getState();
    ctx.serverData = serverData;
    return (
        <Provider store={store}>
            <StaticRouter location={ctx.req.url} context={serverData}>
                <Layout layoutData={ctx}>
                    <ActiveComponent {...serverData} />
                </Layout>
            </StaticRouter>
        </Provider>
    );
};

export default __isBrowser__ ? clientRender() : serverRender;
