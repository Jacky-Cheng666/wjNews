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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
