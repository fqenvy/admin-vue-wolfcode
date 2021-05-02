import Vue from 'vue'
import App from './App.vue'
//导入路由和vuex
import router from './router'
import store from './store'

//导入饿了么ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

require('./mock.js')

//导入axios
import axios from './axios'
Vue.prototype.$axios = axios //

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
