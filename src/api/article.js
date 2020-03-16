import request from '@/utils/request.js'
// 1，获取频道新闻列表
export function articleList(params) {
    return request({
        url: "/app/v1_1/articles",
        method: "get",
        params
    })
}
// 2，对文章不喜欢
export function articleDislike(data) {
    return request({
        url: "/app/v1_0/article/dislikes",
        method: "post",
        data
    })
}

// 3，举报文章
export function articleReport(data) {
    return request({
        url: "/app/v1_0/article/reports",
        method: "post",
        data
    })
}

// 4，拉黑用户
export function authorBlack(data) {
    return request({
        url: "/app/v1_0/user/blacklists",
        method: "post",
        data
    })
}