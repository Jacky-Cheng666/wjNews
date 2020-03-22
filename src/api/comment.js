import request from '@/utils/request.js'

// 1，获取文章评论接口
export function commentList(params) {
    return request({
        url: "/app/v1_0/comments",
        method: "get",
        params
    })
}

// 2，文章评论接口
export function commentAdd(data) {
    return request({
        url: "/app/v1_0/comments",
        method: "post",
        data
    })
}

// 3，对评论点赞接口
export function commentLike(data) {
    return request({
        url: "/app/v1_0/comment/likings",
        method: "post",
        data
    })
}

// 4，对评论取消点赞
export function commentDisLike(data) {
    return request({
        url: `/app/v1_0/comment/likings/${data.target}`,
        method: "DELETE",
    })
}
