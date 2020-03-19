// 准备一个对象。给Vue的原型添加$checkLogin方法。在vue实例中都可以调用该方法。
import store from '@/store/index.js'
import router from '@/router/index.js'
// 按需导入toast轻提示
import { Toast } from 'vant';
let myPlugin = {
    checkLogin() {
        if (store.state.token) {
            // 用户已登录
            return true;
        } else {
            // 用户未登录
            Toast.fail("请先登录");
            setTimeout(() => {
                router.push("/checkLogin");
            }, 1000);
            return false;
        }

    },
    // 一般插件内的对象要提供一个install方法
    install(Vue) {
        Vue.prototype.$checkLogin = myPlugin.checkLogin;
    }
}
export default myPlugin;
