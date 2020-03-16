import request from '@/utils/request.js'
// 1，获取用户频道
export function channelList() {
    return request({
        url: "/app/v1_0/user/channels",
        method: "get"
    })
}

// 2，获取所有频道接口
export function channelAll() {
    return request({
        url: "/app/v1_0/channels",
        method: "get"
    })
}

// 3，添加频道(修改用户频道接口)
export function channelSave(data) {
    return request({
        url: "/app/v1_0/user/channels",
        method: "put",
        // put请求和post请求一样
        data
    })
}

// 4，删除频道
export function channelDel(data) {
    return request({
        url: "/app/v1_0/user/channels",
        method: "DELETE",
        data
    })
}

