import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入组件。
// 如果写views/login找到views下面的login文件夹里面里面的index.js或者index.vue。省略写法。
import login from '@/views/login/index.vue'
import home from '@/views/home/index.vue'
const routes = [
  {
    path: "/login",
    component: login,
    meta: {
      title: "万家资讯-登录"
    }
  },
  {
    path: "/home",
    component: home,
    meta: {
      title: "首页"
    }
  },
  {
    path: "/",
    redirect: "/login"
  },

]
const router = new VueRouter({
  routes
})

router.afterEach(to => {
  // 取出当前要去的页面的标签，设置给网页title
  document.title = to.meta.title;

})

export default router
