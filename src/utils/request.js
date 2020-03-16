import axios from 'axios'
import { getToken } from '@/utils/token.js'
import store from '@/store/index.js'
import JSONBig from 'json-bigint'
// 创建新的axios实例。
let request = axios.create({
    baseURL: process.env.VUE_APP_URL,
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        // console.log('transform', data);
        // 把响应体用JSONBig转化一下。再返回给.then使用。转化之后就是经过json-big处理之后的对象了。
        return JSONBig.parse(data);
    }],
})
// 1，添加请求拦截器
// 请求拦截里面携带token
request.interceptors.request.use(function (config) {
    // (1)在发送请求之前做些什么
    config.headers.Authorization = store.state.token && 'Bearer ' + store.state.token;//这句代码就是，每次首页里面的请求在发送后都会被拦截下来，自动加上一个token值。
    return config;
}, function (error) {
    //(2) 对请求错误做些什么
    return Promise.reject(error);
});
// 2，添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 这里的response就是响应体。
    // console.log('有数据响应了', response);
    // 把响应体里面的data对象返回出去。
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    // console.log('响应错误了');

    return Promise.reject(error);
});
// 暴露请求对象request。
export default request;