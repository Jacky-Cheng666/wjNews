import request from '@/utils/request.js'
// 1，获得联想词汇
export function getSuggest(params) {
    return request({
        url: "/app/v1_0/suggestion",
        method: "get",
        params
    })
}

// 2，获得搜索文章的结果
export function getSearch(params) {
    return request({
        url: "/app/v1_0/search",
        method: "get",
        params
    })
}