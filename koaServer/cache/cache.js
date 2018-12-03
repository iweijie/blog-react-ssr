

const linkedList = require('./linkedList');
let cache = {};
let link = new linkedList()
let config = {
    length: 1000,
    expires: 5 * 60 * 60 * 1000,
    cookieKey: [
        "token",
        "pid"
    ],
}

function setCache(etag, ctx) {
    let obj = {
        etag,
        url: ctx.url,
        expires: Date.now() + config.expires,
        cookies: {}
    }
    for (let i = 0, l = config.cookieKey.length; i < l; i++) {
        let key = config.cookieKey[i]
        obj.cookies[key] = ctx.cookies.get(key)
    }
    cache[etag] = link.unshift(obj)
}

function isSame(etag, ctx) {
    const matchCache = cache[etag].value;
    if (ctx.url === matchCache.url &&
        matchCache.expires > Date.now() &&
        isSameCookie(ctx, matchCache.cookies)) {
        return true
    }
    return false
}

function isSameCookie(ctx, cookies) {
    for (let i = 0, l = config.cookieKey.legnth; i < l; i++) {
        if (ctx.cookies.get(config.cookieKey[i]) !== cookies[config.cookieKey[i]]) {
            return false
        }
    }
    return true;
}

function getKeys (node){
    const keys = [];
    let current = node ;
    while(current){
        keys.push(current.value.etag)
        current = current.next;
    }
    return keys
}
function add(ctx) {
    const etag = ctx['etag'];
    if (link.length >= config.length) {
        let len = config.length * 0.7
        const node = link.findByIndex(Math.floor(len));
        link.length = len;
        link.endtNode = node.pre;
        link.endtNode.setNext(null);
        let keys = getKeys(node);
        keys.forEach(v=>{
            delete cache[v]
        })
    }
    setCache(etag, ctx)
}

function has(etag, ctx) {
    let node = cache[etag]
    if (node) {
        if (isSame(etag, ctx)) {
            link.pre(node)
            return true
        } else {
            link.removeByNode(node)
        }
    }
    return false
}


function reset() {
    cache = {};
    link = new linkedList()
}

module.exports = {
    add,
    has,
    reset,
}