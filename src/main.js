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
// 导入判断用户是否登录插件
import myPlugin from '@/utils/myPlugin.js'
// 注册myPlugin插件。Vue.use()的原理就是在调用install方法。
Vue.use(myPlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
