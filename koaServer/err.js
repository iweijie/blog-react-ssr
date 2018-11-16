
const template = require('./template');
const log = require('./log4js').err;

module.exports =async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        log.error(`code: ${ctx.status}, url: ${ctx.url}, error: ${err.message}, stack: ${err.stack}`)
        ctx.set('Content-Type', 'text/html; charset=utf-8');
        ctx.body = template
    }
}
