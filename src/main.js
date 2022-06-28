import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'
// 引入icon
import '@/style/icon.less'
// 引入vant
import Vant from 'vant'
// 定制主题
import 'vant/lib/index.less'
// import 'vant/lib/index.css'
// rem适配
import 'amfe-flexible'
import '@/style/base.less'

import MyIcon from '@/components/MyIcon.vue'
// 全局注册icon
Vue.component('MyIcon', MyIcon)

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
