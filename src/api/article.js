import request from '@/utils/request.js'
<<<<<<< HEAD
// 获取频道新闻列表
=======
// 1，获取频道新闻列表接口
>>>>>>> home
export function articleList(params) {
    return request({
        url: "/app/v1_1/articles",
        method: "get",
        params
    })
}