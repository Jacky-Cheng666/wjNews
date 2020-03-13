import request from '@/utils/request.js'
// 获取频道新闻列表
export function articleList(params) {
    return request({
        url: "/app/v1_1/articles",
        method: "get",
        params
    })
}