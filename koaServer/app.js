const path = require('path')
const Koa = require('koa')
const etag = require('koa-etag')();
const serve = require('koa-static');
const router = require('./router')
const err = require('./err')
const renderTime = require('./renderTime')
const cache = require('./cache')
const template = require('./template');
const log = require('./log4js').err;
const app = new Koa()


// 跨域设置
app.use(async function (ctx, next) {
    ctx.set("Access-Control-Allow-Credentials", true)
    ctx.set("Access-Control-Allow-Origin", ctx.headers["origin"] || "*")
    ctx.set("Access-Control-Allow-Headers", "X-Requested-With")
    ctx.set("Access-Control-Allow-Methods", 'PUT,POST,GET,DELETE,OPTIONS')
    return await next();
});

app.use(err)
app.use(cache)
app.use(renderTime)
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
    log.error(`type: unhandledRejection, error: ${err.message}, stack: ${err.stack}`)
});

process.on('uncaughtException', (err) => {
    log.error(`type: uncaughtException, error: ${err.message}, stack: ${err.stack}`)
});