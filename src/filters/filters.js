import Vue from 'vue'
// 导入day.js
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
Vue.filter("formatTime", val => {
    return dayjs().from(dayjs(val))
})