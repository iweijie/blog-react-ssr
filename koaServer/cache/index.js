/**
 * 由于是动态渲染，手动 cache
 */


const {
    add,
    has,
    reset
} = require('./cache');
module.exports = async (ctx, next) => {
    if (/^\/static\/.+$/.test(ctx.url) || ctx.url === "/favicon.ico") return await next();
    let match = ctx.headers['if-none-match'];
    if (has(match, ctx)) {
        ctx.status = 304;
        return;
    }
    await next();
    add(ctx)
}