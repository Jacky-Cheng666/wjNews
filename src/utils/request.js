import axios from 'axios'
import { setToken } from '@/utils/token.js'
import store from '@/store/index.js'
import JSONBig from 'json-bigint'
// 创建新的axios实例。
let request = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        // console.log('transform', data);
        // 把响应体用JSONBig转化一下。再返回给.then使用。转化之后就是经过json-big处理之后的对象了。
        // 假如返回的响应体不是JSON字符串呢。就会报错。
        // ******************注意：并不是所有的接口都会返回JSON字符串。所以加try-catch会合理一点*********************
        try {
            return JSONBig.parse(data);
        } catch  {
            // 如果响应不是字符串，本身响应的是什么，就返回什么。（非JSON格式字符）
            return data;
        }
        // 上面整体代码的意思是：如果服务器响应体返回的是JSON格式字符串，就要转成JS对象再返回，如果不是JSON字符串，就原来是什么响应体就返回什么响应体。
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

// 再创建一个对象，用来在响应出错时，专门发新请求的对象。
let tempReq = axios.create({
    baseURL: process.env.VUE_APP_URL
})

// 2，添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // 这里的response就是响应体。
    // console.log('有数据响应了', response);
    // 把响应体里面的data对象返回出去。
    return response.data;
}, async function (error) {
    // 对响应错误做点什么
    // console.log('响应错误了');
    // console.dir(error);
    // 判断一下，如果报错信息是401，那么就去重新刷新token。
    if (error.response.status == 401) {
        // 代表token有问题，我们就利用refresh_token去找服务器要一个新的token。
        // 为什么我们不用request发请求，因为我们刚刚已经用request发请求出错了，所以就意味着request这个对象里现在保存了一些错误的配置，所以再用它发请求刷新token，可能会有问题。
        let res = await tempReq({
            url: "/app/v1_0/authorizations",
            method: "put",
            headers: {
                // 注意：Bearer有空格，后面再接一个refresh_token就行了。
                Authorization: 'Bearer ' + store.state.refresh_token
            }
        })
        // console.log(res);
        // res.data.data.token里面就是服务器给我们返回的最新的token。
        // 更新到vuex里面和localstorage里面。
        store.commit("changeToken", res.data.data.token)
        // 因为之前保存的是对象，这里也需要保存为对象。token和refresh_token。
        let obj = {
            token: res.data.data.token,
            refresh_token: store.state.refresh_token
        }
        setToken("wjtoken", JSON.stringify(obj))

        // 而且还继续帮我完成上一次我发生错误的请求。
        // error对象里面有一个属性叫config，里面存了这次报错请求的一些配置。所以这里面就包括了它请求的路径，参数，等等，所以我们只要用这个配置再发一次请求即可。
        // config不是以前错误的token吗? 不是。
        // 为什么不是，因为request，我们给他加了一个请求拦截，会获取最新的token。
        let res2 = await request(error.config)
        // 根据最新的token，拿到上一次错误请求后该拿到数据了。为了让调用请求也能拿到这个值，需要return出去。
        // console.log(res2);
        return res2;
    } else {
        return Promise.reject(error);
    }
});
// 暴露请求对象request。
export default request;