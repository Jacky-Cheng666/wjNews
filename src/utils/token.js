// const TOKENKEY = "wjtoken"
// 1，获取localStorage方法
export function getToken(key) {
    return JSON.parse(window.localStorage.getItem(key))
}
// 2，设置localStorage方法
export function setToken(key,token) {
    window.localStorage.setItem(key, token)
}
// 3，清除localStorage方法
export function removeToken(key) {
    window.localStorage.removeItem(key)
}