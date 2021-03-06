import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入组件。
// 如果写views/login找到views下面的login文件夹里面里面的index.js或者index.vue。省略写法。
// 这种导入方式就是同步导入，最终打包成一个js文件，在第一次访问页面时就全部加载下来。
import login from '@/views/login/index.vue'
import home from '@/views/home/index.vue'
import layout from '@/views/layout/index.vue'
import video from '@/views/video'
import mine from '@/views/mine'
import question from '@/views/question'
import search from '@/views/search'
import searchResult from '@/views/searchResult'
import detail from '@/views/detail/index.vue'
import personInfo from '@/views/personInfo/index.vue'
import robot from '@/views/robot/index.vue'

// 异步方式导入组件。懒加载组件。但是移动端一般不推荐使用懒加载导入，因为会影响切换效率。
// const login = () => import('@/views/login/index.vue')
// const home = () => import('@/views/home/index.vue')
// const layout = () => import('@/views/layout/index.vue')
// const video = () => import('@/views/video')
// const mine = () => import('@/views/mine')
// const question = () => import('@/views/question')
// const search = () => import('@/views/search')
// const searchResult = () => import('@/views/searchResult')
// const detail = () => import('@/views/detail/index.vue')
// const personInfo = () => import('@/views/personInfo/index.vue')
// const robot = () => import('@/views/robot/index.vue')

const routes = [
  {
    path: "/login",
    component: login,
    meta: {
      title: "万家资讯-登录"
    }
  },
  // login模块可以有两个路由访问。1，/login访问。2，/checkLogin访问。
  {
    path: "/checkLogin",
    component: login,
    meta: {
      title: "万家资讯-登录"
    }
  },
  {
    name: "robot",
    path: "/robot",
    component: robot,
    meta: {
      title: "机器人页面"
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
    path: "/detail/:art_id",
    component: detail,
    meta: {
      title: "文章详情"
    }
  },
  {
    path: "/personInfo/:user_id",
    component: personInfo,
    meta: {
      title: "个人信息"
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
