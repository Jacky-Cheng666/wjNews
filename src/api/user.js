import request from '@/utils/request.js'
// 1，关注用户
export function followUser(data) {
    return request({
        url: "/app/v1_0/user/followings",
        method: "post",
        data
    })
}

// 2，取消关注用户
export function unFollow(data) {
    return request({
        url: `/app/v1_0/user/followings/${data.aut_id}`,
        method: "delete"
    })
}
