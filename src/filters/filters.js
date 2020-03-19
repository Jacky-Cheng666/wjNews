import Vue from 'vue'
import dayjs from "dayjs";
Vue.filter("formatTime", (val) => {
    return dayjs().from(dayjs(val), true) + "前";
})