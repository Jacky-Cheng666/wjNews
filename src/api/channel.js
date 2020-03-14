import request from '@/utils/request.js'
<<<<<<< HEAD

=======
>>>>>>> home
// 1，获取用户频道
export function channelList() {
    return request({
        url: "/app/v1_0/user/channels",
        method: "get"
    })
}