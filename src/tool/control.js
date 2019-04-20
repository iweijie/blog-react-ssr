export default class Control {
    // 函数或数组函数
    constructor() {
        if (arguments.length === 0) throw new Error("回调函数为必传")
        let list = Array.prototype.slice.call(arguments, 0, arguments.length - 2)
        this.store = list
        this.callback = arguments[arguments.length - 1]
        this._control = getControlPromise();
    }

}

// 可控的 promise
export function getControlPromise() {
    let res = (resolve) => (r) => resolve(r)
    let rej = (reject) => (e) => reject(e)
    const p = new Promise((resolve, reject) => {
        res = res(resolve)
        rej = rej(reject)
    })
    return {
        resolve: res,
        reject: rej,
        promise: p,
    }
}