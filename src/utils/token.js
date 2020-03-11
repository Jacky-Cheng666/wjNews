const TOKENKEY = "wjtoken"
// 1，获取token方法
export function getToken() {
    return JSON.parse(window.localStorage.getItem(TOKENKEY))
}
// 2，设置token方法
export function setToken(token) {
    window.localStorage.setItem(TOKENKEY, token)
}
// 3，清除token方法
export function removeToken() {
    window.localStorage.removeItem(TOKENKEY)
}