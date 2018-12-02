
const Router = require('koa-router');
const React = require('react');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server')
const { StaticRouter, Switch, Route, matchPath } = require('react-router-dom')
const { default: actions } = require('../src/actions');

import temp from './template'
import clinetRouters from '../src/routers/index'
import configureStore from '../src/store'
import axios, { setAxiosCookie } from 'tool/axios'
const log = require('./log4js').time;

const matchRouter = clinetRouters.filter(v => v.isServicesRendered).map(v => v.path);

const router = new Router();

const checkResult = (arr) => {
    if (!Array.isArray(arr) || !arr.length) return false;
    for (let i = 0; i < arr.length; i++) {
        if (!arr[i] || arr[i].state !== 1) return false;
    }
    return true;
}

router.get(matchRouter, async (ctx, next) => {

    const time = Date.now();

    const interceptor = setAxiosCookie(ctx.headers.cookie || "");

    let currentTemp = temp;

    // 借鉴至 https://reacttraining.com/react-router/web/guides/server-rendering;
    const context = {}

    // 并发请求队列
    const promises = [];
    // 创建 store
    const store = configureStore();
    // 设置标记，表示为服务端渲染
    store.dispatch(actions.serverAction(true))
    // 自定义的 公共接口调用
    promises.push(...clinetRouters.commonLoadData(store))

    clinetRouters.find(route => {
        const match = matchPath(ctx.path, route);
        if (match && route.loadData) {
            let arr = route.loadData(match, store);
            promises.push(...arr);
        }
        return match;
    });

    await Promise.all(promises)
        .then((data) => {
            // 记录总请求时长
            log.info(`请求时长 -- pid: ${ctx.cookies.get('pid')}, time: ${Date.now() - time}ms, url: ${ctx.url}`);

            axios.interceptors.request.eject(interceptor);
            ctx.set('Content-Type', 'text/html; charset=utf-8');
            if (!checkResult(data)) {
                ctx.body = currentTemp
                return;
            }
            const preloadedState = store.getState();
            const markup = renderToString(
                <Provider store={store}>
                    <StaticRouter
                        location={ctx.url}
                        context={context}
                    >
                        <Switch>
                            {
                                clinetRouters.map((route, i) => (
                                    <Route key={i} {...route} />
                                ))
                            }
                        </Switch>
                    </StaticRouter>
                </Provider>
            )

            if (context.url) {
                // Somewhere a `<Redirect>` was rendered
                ctx.redirect(context.url)
            } else {
                currentTemp = currentTemp.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
                    .replace("window.__PRELOADED_STATE__", `window.__PRELOADED_STATE__=${JSON.stringify(preloadedState)}`);

                ctx.body = currentTemp
            }

        })
        .catch(err => {
            axios.interceptors.request.eject(interceptor);
            throw err;
        })
})

module.exports = router
