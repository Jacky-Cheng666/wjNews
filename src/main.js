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


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
