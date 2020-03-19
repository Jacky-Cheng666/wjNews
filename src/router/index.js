import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入组件。
// 如果写views/login找到views下面的login文件夹里面里面的index.js或者index.vue。省略写法。
import login from '@/views/login/index.vue'
import home from '@/views/home/index.vue'
import layout from '@/views/layout/index.vue'
import video from '@/views/video'
import mine from '@/views/mine'
import question from '@/views/question'
import search from '@/views/search'
import searchResult from '@/views/searchResult'
const routes = [
  {
    path: "/login",
    component: login,
    meta: {
      title: "万家资讯-登录"
    }
  },
  {
    path: "/layout",
    component: layout,
    meta: { title: "首页" },
    children: [{
      path: "/home",
      component: home,
      meta: { title: "首页" },
    },
    {
      path: "/video",
      component: video,
      meta: { title: "视频" },
    },
    {
      path: "/mine",
      component: mine,
      meta: { title: "我的" },
    },
    {
      path: "/question",
      component: question,
      meta: { title: "问答" },
    }
    ]
  },
  {
    path: "/search",
    component: search,
    meta: {
      title: "搜索新闻"
    }
  },
  // 动态路由匹配(:key为参数变量)
  {
    path: "/searchResult/:key",
    component: searchResult,
    meta: {
      title: "搜索结果"
    }
  },
  {
    path: "/",
    redirect: "/home"
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
