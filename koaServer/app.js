const path = require('path')
const Koa = require('koa')
const etag = require('koa-etag')();
const serve = require('koa-static');
const router = require('./router')
const err = require('./err')
const renderTime = require('./renderTime')
const cache = require('./cache')
const template = require('./template');

const app = new Koa()

app.use(err)
app.use(renderTime)
app.use(cache)
app.use(etag)

app.use(router.routes())

app.use(serve(path.resolve(__dirname, '..', 'build')));

app.use(async (ctx) => {
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.body = template
})

app.listen(3000, () => {
    console.log("listen to port 3000")
})

process.on('unhandledRejection', (err) => {
    console.log("unhandledRejection", err)
    // logger.fatal(`unhandledRejection: ${err.message}, stack: ${err.stack}`);
});

process.on('uncaughtException', (err) => {
    console.log("uncaughtException", err)
    // logger.fatal(`uncaughtException: ${err.message}, stack: ${err.stack}`);
});