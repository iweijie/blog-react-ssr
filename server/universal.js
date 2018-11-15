const path = require('path');
const fs = require('fs');

const React = require('react');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server')
const { StaticRouter, Switch, Route, matchPath } = require('react-router-dom')
// const { Capture } = require('react-loadable');
const { default: configureStore } = require('../src/store')
const { default: routers } = require('../src/routers/index')
import axios, { setAxiosCookie } from 'tool/axios'

module.exports = function universalLoader(req, res) {
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

    const interceptor = setAxiosCookie(req.headers.cookie || "");

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('read err', err)
            return res.status(404).end()
        }
        const context = {}
        const promises = [];
        const store = configureStore();



        // inside a request
        // use `some` to imitate `<Switch>` behavior of selecting only
        // the first to match
        promises.push(...routers.commonLoadData(store))
        routers.some(route => {
            // use `matchPath` here
            const match = matchPath(req.path, route);
            if (match && route.loadData) {
                let arr = route.loadData(match, store);
                promises.push(...arr);
            }
            return match;
        });

        Promise.all(promises).then(() => {

            axios.interceptors.request.eject(interceptor);

            const preloadedState = store.getState();
            const markup = renderToString(
                <Provider store={store}>
                    <StaticRouter
                        location={req.url}
                        context={context}
                    >
                        <Switch>
                            {
                                routers.map((route, i) => (
                                    <Route key={i} {...route} />
                                ))
                            }
                        </Switch>
                    </StaticRouter>
                </Provider>
            )

            if (context.url) {
                // Somewhere a `<Redirect>` was rendered
                res.redirect(301, context.url)
            } else {
                // we're good, send the response
                const RenderedApp = htmlData.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
                    .replace("window.__PRELOADED_STATE__", `window.__PRELOADED_STATE__=${JSON.stringify(preloadedState)}`)
                res.send(RenderedApp)
            }

        });

    })
}
