import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'
// 引入icon
import '@/style/icon.less'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// rem适配
import 'amfe-flexible'
Vue.use(Vant)
Vue.config.productionTip = false

const app = 1
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
