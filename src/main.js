import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
// 导入字体库
import "@/style/font.css"
import "@/style/base.css"
// 导入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
// 导入dayjs
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
// 导入全局过滤器
import "@/filters/filters.js"

// 准备一个对象。给Vue的原型添加$checkLogin方法。在vue实例中都可以调用该方法。
Vue.prototype.$checkLogin = function () {
  if (this.$store.state.token) {
    // 用户已登录
    return true;
  } else {
    // 用户未登录
    this.$toast.fail("请先登录");
    setTimeout(() => {
      this.$router.push("/login");
    }, 1000);
    return false;
  }

}



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
