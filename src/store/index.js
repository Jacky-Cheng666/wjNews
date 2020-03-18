import Vue from 'vue'
import Vuex from 'vuex'
import { getToken } from '@/utils/token.js'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // token: getToken() ? getToken().token : '',
    token: getToken("wjtoken") && getToken("wjtoken").token, //短语与运算,第一次赋值为null。
    // refresh_token: getToken() ? getToken().refresh_token : ''
    refresh_token: getToken("wjtoken") && getToken("wjtoken").refresh_token
  },
  mutations: {
    changeToken(state, token) {
      state.token = token;
    },
    changeRefToken(state, token) {
      state.refresh_token = token;
    }
  },
  actions: {
  },
  modules: {
  }
})
