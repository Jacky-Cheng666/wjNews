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

// 3，获取用户自己的信息
export function getInfo() {
    return request({
        url: "/app/v1_0/user",
        method: "get"
    })
}

// 4，获取用户个人资料
export function userProfile(params) {
    return request({
        url: "/app/v1_0/user/profile",
        method: "get",
        params
    })
}

// 5，上传头像接口
export function uploadPhoto(data) {
    // axios就是ajax的一个封装。
    // axios只是一个库，发ajax库。
    // 跟jquery一样，为什么不用jQuery，因为jquery太大了，除了封装了ajax。
    // 还封装了别的操作DOM的方法，所以我们就用axios。因为axios比较单纯，只封装了发请求的一些方法，比较轻量。
    // axios的本质还是发的ajax请求。

    // 原生ajax发送文件，需要用到formData。来发送。axios也是。
    let fm = new FormData();
    // key就叫photo，值用我们刚刚传递过来的图片。
    fm.append("photo", data.photo);
    return request({
        url: "/app/v1_0/user/photo",
        method: "PATCH",
        data: fm
    })
}
