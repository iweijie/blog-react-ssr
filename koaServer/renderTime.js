/**
 *  用于记录页面加载时长（排除静态文件）
 */
const log = require('./log4js').time;

module.exports = async (ctx, next) => {
    if (/^\/static\/.+$/.test(ctx.url) || ctx.url === "/favicon.ico" || ctx.url === '/manifest.json') return await next();
    const time = Date.now();
    await next();
    // 记录总响应时长
    log.info(`总时长 -- pid: ${ctx.cookies.get('pid')}, time: ${Date.now() - time}ms, code: ${ctx.status}, url: ${ctx.url}`);
}