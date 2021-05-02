import Vue from 'vue'
import Vuex from 'vuex'
import menus from "./modules/menus";

Vue.use(Vuex)

export default new Vuex.Store({
  // 状态统一管理
  state: {
    token: ''
  },
  //修改状态
  mutations: {

    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token",token)
    },



  },
  actions: {
  },
  modules: {
    menus
  }
})
