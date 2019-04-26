/**
 *作者: weijie
 *功能描述: 全局公共方法文件
 *时间: 2018/4/2 14:35
 */

import isServer from "./env"
import { message } from "antd"

function log_server(msg) {
    console.log(msg)
}

let log_server_obj = {
    success: log_server,
    error: log_server,
    warning: log_server,
}

export const log = (function () {
    let log;
    if (isServer) {
        log = log_server_obj
    } else {
        log = message;
    }
    return log
})();



/**
*作者: weijie
*功能描述: menu 过滤
*时间: 2018/4/2 14:35
*/

export const filterMenu = function (arr, flag) {
    var obj = {
        menuList: [],
        menuPath: [],
        origin: arr
    }
    if (!Array.isArray(arr)) return obj;
    var list = obj.menuList,
        path = obj.menuPath;
    for (var i = 0, l = arr.length; i < l; i++) {
        var val = arr[i];
        if (!val.isPublic && !flag) {
            continue
        }
        var child = val.childrens
        if (child && child.length) {
            for (var len = child.length, j = len - 1; j >= 0; j--) {
                if (!child[j].isPublic && !flag) {
                    child.splice(j, 1)
                } else {
                    path.push(child[j].url)
                }
            }
        } else {
            path.push(val.url)
        }
        list.push(val)
    }
    path.push("/")
    return obj
}

/**
 *作者: weijie
 *功能描述: 设置cookie
 *参数说明:
 * @param {string} cookieName  名称
 * @param {string} value 值
 * @param {number} expiretimes 设置时间
 *时间: 2018/4/2 14:39
 */
export const setCookie = function (cookieName, value, expiretimes) {
    var exdate = new Date();
    var domain = document.domain.replace(/.*\.(.*\..*)/g, '$1');
    exdate.setTime(exdate.getTime() + expiretimes);
    document.cookie = cookieName + "=" + escape(value) + ";path=/;domain=" + domain + ";" +
        ((expiretimes == null) ? "" : ";expires=" + exdate.toGMTString());
};

/**
 *作者: weijie
 *功能描述: 获取cookie
 *参数说明:
 * @param {string} cookieName 名称
 * @return {string}
 *时间: 2018/4/2 14:39
 */
export const getCookie = function (cookieName) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(cookieName + "=");
        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
        return "";
    }
    return "";
};

/**
 *作者: weijie
 *功能描述: 对象参数序列化
 *参数说明:
 * @return {string}
 *时间: 2018/4/2 16:32
 */
export const objTodata = (obj) => {
    const arr = []
    for (let o in obj) {
        if (obj[o]) {
            arr.push(o + '=' + obj[o])
        }
    }
    return arr.join('&')
}
/**
 *作者: weijie
 *功能描述: 获取本地数据
 *参数说明:
 * @return {object}
 *时间: 2018/4/2 16:28
 */
export const getLocation = (name) => {
    let local = localStorage.getItem(name)
    return JSON.parse(local)
}
export const setLocation = (name, obj) => {
    if (!obj || !name) return
    if (typeof obj == "string") {
        localStorage.setItem(name, obj)
    } else {
        localStorage.setItem(name, JSON.stringify(obj))
    }
}
/**
 *作者: weijie
 *功能描述:timestampFromat 时间格式化 方法
 *参数说明:
 * @param {number} v 毫秒数
 * @param {number} t 类型1 返回年月日 类型2返回年月日时分秒
 * @param {string} interval 分隔符
 * @return {string}
 *时间: 2018/4/2 16:22
 */
export const timestampFromat = (v, t = 1, interval = '-') => {
    if (v == 0 || v == undefined) {
        return null;
    }
    const date = new Date(v);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return t == 1 ? y + interval + m + interval + d : y + interval + m + interval + d + ' ' + h + ':' + minute + ':' + second;
}

/**
 *作者: weijie
 *功能描述:Array 每项添加 Key 值
 *参数说明:
 * @param {number} v 毫秒数
 */
export const setKey = (arr = []) => {
    arr.forEach((v, k) => {
        if (v.key === undefined) {
            v.key = k
        }
    })
    return arr
}
/**
 *作者: weijie
 *功能描述: 防抖
 */
export function debounce(fn, delay = 200) {
    var timer;
    return function () {
        var th = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            timer = null;
            fn.apply(th, args);
        }, delay);
    };
}
/**
 *作者: weijie
 *功能描述: 节流
 */
export function throttle(fn, interval = 200) {
    var last, timer;
    return function () {
        var th = this;
        var args = arguments;
        var now = Date.now();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, interval);
        } else {
            clearTimeout(timer);
            last = now;
            fn.apply(th, args);
        }
    }
}

/**
 *作者: weijie
 *功能描述: 统一 promise catch 处理方式（兼容服务端）
 */
export function promiseCatch(err) {
    isServer ?
        log.error(`message: ${err.message}, stack: ${err.stack}`)
        :
        log.error(err.messgae)
}

/**
 * 文本复制
 * copyToShearplate("weijie")
 */

export function copyToShearplate(str) {
    var input = document.createElement("input");
    input.type = "text"
    input.value = str
    document.body.appendChild(input)
    // HTMLInputElement.select() 方法选中一个 <textarea>
    // 元素或者一个 带有 text 字段的 <input> 元素里的所有内容。
    input.select()
    document.execCommand("copy")
    document.body.removeChild(input)
}
// 获取随机色
export function getRandomBgColor() {
    var r = Math.floor(Math.random() * 256),
        g = Math.floor(Math.random() * 256),
        b = Math.floor(Math.random() * 256),
        a = 1;
    // a = Math.floor((Math.random()*.5 + .5)*10)/10;
    return [r, g, b, a]
}

// 获取能很好显示的 字体色
// https://blog.csdn.net/wpwalter/article/details/78671680
export function isLight(rgb) {
    return (
        0.213 * rgb[0] +
        0.715 * rgb[1] +
        0.072 * rgb[2] >
        255 / 2
    );
}
// 色值取反
export function colorReverse(OldColorValue) {
    OldColorValue = "0x" + OldColorValue.replace(/#/g, "");
    var str = "000000" + (0xFFFFFF - OldColorValue).toString(16);
    return str.substring(str.length - 6, str.length);
}

/**
 *作者: weijie
 *时间: 2018/8/16
 *描述: 图片弹框展示
 * @param {string} 图片地址
 * @param {Boolean} 浏览器宽高变化时重新计算
 **/
export const popUpImage = function () {
    var imgStie = null;
    var maskStyle = {
        position: "fixed",
        top: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 10000,
        left: 0,
        fontSize: "12px",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
    }
    var wrapStyle = {
        position: "relative",
        padding: "5px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 14px 2px rgba(0, 0, 0, 0.20)",
        borderRadius: "4px",
        overflow: "hidden",
        boxSizing: "border-box",
    }
    var imgStyle = {
        display: "block",
        width: "100%",
        height: "100%",
    }
    var flexStyle = { "display": "flex" }
    var noneStyle = { "display": "none" }
    // 间距
    var space = 10;

    var mask = document.createElement("div")
    var sh = window.innerHeight || document.documentElement.clientheight;
    var sw = window.innerWidth || document.documentElement.clientWidth;
    mask.style.width = sw + "px"
    mask.style.height = sh + "px"
    css(mask, maskStyle)

    var close = document.createElement("div");
    close.innerText = "×";
    var closeStyle = {
        width: '50px',
        height: '50px',
        position: 'absolute',
        right: '0',
        top: '0',
        color: '#fff',
        cursor: 'pointer',
        'font-size': '35px',
        'text-align': 'center'
    }
    css(close, closeStyle);
    mask.appendChild(close);
    mask.setAttribute('class', 'preview-mask');

    var wrap = document.createElement("div")
    css(wrap, wrapStyle)
    close.addEventListener("click", function () {
        css(mask, noneStyle)
        if (imgStie) {
            wrap.removeChild(imgStie)
            imgStie = null
        }
    })
    mask.appendChild(wrap)
    document.body.appendChild(mask)
    function popUp(src, flag = false) {
        var previewMask = document.querySelector('.preview-mask').children[1];
        previewMask.innerHTML = '';
        if (!src) return;
        if (flag) {
            sh = window.innerHeight || document.documentElement.clientheight;
            sw = window.innerWidth || document.documentElement.clientWidth;
            mask.style.width = sw + "px"
            mask.style.height = sh + "px"
        }
        var img = imgStie = new Image()
        css(img, imgStyle)
        img.addEventListener("load", function (e) {
            var w = e.target.width;
            var h = e.target.height;
            var obj = {}
            if (!(w + 2 * space <= sw) || !(h + 2 * space <= sh)) {
                var wratio = w / sw;
                var hratio = h / sh;
                if (hratio > wratio) {
                    // 宽
                    obj.height = sh - 2 * space
                    var actualwidth = Math.floor(w / h * obj.height)
                    obj.width = actualwidth
                } else {
                    obj.width = sw - 2 * space
                    var actualHeight = Math.floor(h / w * obj.width)
                    obj.height = actualHeight
                }
                obj.width += "px"
                obj.height += "px"
            } else {
                obj.width = w + "px"
                obj.height = h + "px"
            }
            css(wrap, obj)
            wrap.appendChild(img)
            css(mask, flexStyle)
        })
        img.addEventListener("error", function () {
            wrap.appendChild("图片加载失败,请尝试刷新")
            css(mask, flexStyle)
        })
        img.setAttribute('src', src);
    }
    function css(dom, obj) {
        for (var k in obj) {
            dom.style[k] = obj[k]
        }
    }
    return popUp
}();

/**
 *作者: weijie
 *功能描述: 页面不兼容CSS3的提示信息
 *参数说明:
 *时间: 2018/4/2 16:22
 */

(function () {
    if (!isServer && !('flex' in document.body.style)) {
        const root = document.getElementById('root');
        const first = document.body.firstChild;
        var html = document.createElement("div");
        html.innerHTML = `<div style='line-height:50px;background:#ff0000;color:#ffffff;position: absolute;top:0px;left:0px;width:100%;z-index:99999;text-align:center;' onclick="javascript:this.style.display='none'">您的浏览器版本过低，为了更好的体验，请您升级浏览器！<a style="color:#108ee9" href="http://se.360.cn/" target="_blank" rel='nofollow'>点击更新</a></div>`
        document.body.insertBefore(html, first);
        root.style.display = 'none'
    }
})();