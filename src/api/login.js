import request from '@/utils/request.js'
// 1，获取验证码接口
export function getCode(params) {
    return request({
        url: `app/v1_0/sms/codes/${params.phone}`,
        method: "GET"
    })
}
// 2，登录接口
export function login(data) {
    return request({
        url: "/app/v1_0/authorizations",
        method: "post",
        data
    })
}