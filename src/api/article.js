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
// 5，获取文章详情
export function articleDetail(params) {
    // 因为这个接口只要一个路径参数
    // 所以没必要在后面在写params了，如果后面写了调用接口可能会报错。
    return request({
        url: `/app/v1_0/articles/${params.art_id}`,
        method: "get"
    })
}

// 6，获取文章评论或评论回复接口
export function getComments() {
    return request({
        url: "/app/v1_0/comments",
        method: "get"
    })
}

// 7，点赞文章
export function articleLike(data) {
    return request({
        url: "/app/v1_0/article/likings",
        method: "post",
        data
    })
}
// 8，取消文章点赞
export function articleDisLike(data) {
    return request({
        url: `/app/v1_0/article/likings/${data.art_id}`,
        method: "DELETE",
    })
}

// 9，对文章不喜欢
export function articleBuXiHuan(data) {
    return request({
        url: "/app/v1_0/article/dislikes",
        method: "post",
        data
    })
}

// 10，对文章取消不喜欢
export function articleXiHuan(data) {
    return request({
        url: `/app/v1_0/article/dislikes/${data.art_id}`,
        method: "DELETE",
    })
}

// 11，对文章收藏
export function artCollect(data) {
    return request({
        url: "/app/v1_0/article/collections",
        method: "post",
        data
    })
}

// 12，对文章取消收藏
export function artUnCollect(data) {
    return request({
        url: `/app/v1_0/article/collections/${data.art_id}`,
        method: "DELETE",
    })
}

