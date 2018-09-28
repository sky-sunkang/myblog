/* eslint-disable no-undef */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
router.beforeEach((to, from, next) => {
  iview.LoadingBar.start()
  next()
})
router.afterEach(route => {
  iview.LoadingBar.finish()
})
// 图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: '../static/images/loading.gif',
  attempt: 1
})

// 全局配置配合index.js解决开发axios跨域，服务器环境可以使用nginx的反向代理
axios.defaults.timeout = 5000// 在超时前，所有请求都会等待 5 秒
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' //  配置请求头
axios.defaults.baseURL = '/api'// 配置接口地址
axios.defaults.withCredentials = false
Vue.prototype.$axios = axios// 将axios配置成vue的原型

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
// 全局配置store
// eslint-disable-next-line no-undef
const store = new Vuex.Store({
  state: {
    cmsStaticDir: '//sunkang.xyz:8080/publiccms/webfile/',
    dynamicNewsId: 123,
    dynamicId: 124,
    technicalExchangeId: 125
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
Vue.prototype.$store = store// 将store配置成vue的原型
