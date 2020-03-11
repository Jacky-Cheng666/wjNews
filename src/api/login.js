import request from '@/utils/request.js'
// 1，获取验证码接口
export function getCode(params) {
    return request({
        url: "sms/codes/" + params,
        method: "get"
    })
}
// 2，登录接口
export function login(data) {
    return request({
        url: "authorizations",
        method: "post",
        data
    })
}