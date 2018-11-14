const path = require('path');
const fs = require('fs');

const React = require('react');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server')
const { StaticRouter, Switch, Route, matchPath } = require('react-router-dom')

const { default: configureStore } = require('../src/store')
const { default: routers } = require('../src/routers/index')

module.exports = function universalLoader(req, res) {
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('read err', err)
            return res.status(404).end()
        }
        const context = {}
        const store = configureStore();



        // inside a request
        const promises = [];
        // use `some` to imitate `<Switch>` behavior of selecting only
        // the first to match
        routers.some(route => {
            // use `matchPath` here
            const match = matchPath(req.path, route);
            if (match && route.loadData) promises.push(route.loadData(match, store));
            return match;
        });

        Promise.all(promises).then(() => {
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
                                    .replace("window.__PRELOADED_STATE__",`window.__PRELOADED_STATE__=${JSON.stringify(preloadedState)}`)
                res.send(RenderedApp)
            }

        });

    })
}
