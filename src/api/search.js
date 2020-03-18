import request from '@/utils/request.js'
// 1，获得联想词汇
export function getSuggest(params) {
    return request({
        url: "/app/v1_0/suggestion",
        method: "get",
        params
    })
}