/**
 * 由于是动态渲染，手动 cache
 */

const cache = {};

const expires = 5 * 60 * 60 * 1000;

const cookieKey = [
    "token"
]

function isSameCookie(ctx, cookies) {
    for (let i = 0, l = cookieKey.legnth; i < l; i++) {
        if (ctx.cookies.get(cookieKey[i]) !== cookies[cookieKey[i]]) {
            return false
        }
    }
    return true;
}

function setCache(ctx) {
    const etag = ctx['etag'];
    let obj = {
        expires: Date.now() + expires,
        url: ctx.url,
        cookies: {}
    }
    for (let i = 0, l = cookieKey.length; i < l; i++) {
        obj.cookies[cookieKey[0]] = ctx.cookies.get(cookieKey[0])
    }
    cache[etag] = obj;
}

module.exports = async (ctx, next) => {
    if (/^\/static\/.+$/.test(ctx.url) || ctx.url === "/favicon.ico") return await next();
    let match = ctx.headers['if-none-match']
    if (match && cache[match]) {
        const matchCache = cache[match];
        if (ctx.url === matchCache.url &&
            matchCache.expires > Date.now() &&
            isSameCookie(ctx, matchCache.cookies)) {
            ctx.status = 304;
            return;
        } else {
            delete cache[match]
        }
    }
    await next();
    setCache(ctx)
}