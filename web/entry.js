import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, StaticRouter, Route, Switch } from "react-router-dom";
import defaultLayout from "@/layout";
import {
    getWrappedComponent,
    getComponent,
    preloadComponent,
} from "ykfe-utils";
import { __INITIAL_DATA__ } from "./createStore";
import config from "../config/config.ssr";
import createStore from "./createStore";

const Routes = config.routes;

const clientRender = async () => {
    const { store } = createStore(window[__INITIAL_DATA__]);

    window.store = store;
    // debugger
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
                                render={(props) => {
                                    const { location } = props;
                                    return (
                                        <Layout>
                                            <WrappedComponent
                                                key={location.pathname}
                                                store={store}
                                            />
                                        </Layout>
                                    );
                                }}
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
    const { store } = createStore();

    ctx.store = store;

    // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
    const ActiveComponent = getComponent(Routes, ctx.path)();
    ActiveComponent.getInitialProps
        ? await Promise.all([
              ActiveComponent.getInitialProps(ctx),
              store.dispatch({}),
          ])
        : {};
    const Layout = ActiveComponent.Layout || defaultLayout;
    const serverData = store.getState();
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
