/**
 *  用于记录页面加载时长（排除静态文件）
 */
const log = require('./log4js').time;

module.exports = async (ctx, next) => {
    if (/^\/static\/.+$/.test(ctx.url) || ctx.url === "/favicon.ico") return await next();
    const time = Date.now();
    await next();
    log.info(`code: ${ctx.status}, url: ${ctx.url}, time: ${Date.now() - time}ms`);
}