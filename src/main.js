/* eslint-disable no-undef */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
// 全局配置store
// eslint-disable-next-line no-undef
const store = new Vuex.Store({
  state: {
    token: null,
    cmsStaticDir: '//sunkang.xyz:8080/publiccms/webfile/',
    dynamicNewsId: 123,
    dynamicId: 124,
    technicalExchangeId: 125,
    lifeId: 126
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
Vue.prototype.$store = store// 将store配置成vue的原型
// 加载中
/* var MyComponent = Vue.extend({
  template: '<Col class="demo-spin-col" span="8"> <Spin fix> <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon> <div>Loading</div> </Spin> </Col>'
}) */
Vue.prototype.$myLoding = {
  start: function (id) {
    // 暂时没做好吧，不能后期添加
    // new MyComponent().$mount().$appendTo(id)
    /* var htmlStr = '<Col class="demo-spin-col" span="8">'
    htmlStr += '<Spin fix>'
    htmlStr += '<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>'
    htmlStr += '<div>Loading</div>'
    htmlStr += '</Spin>'
    htmlStr += '</Col>'
    $(id).prepend(htmlStr) */
  },
  stop: function (id) {
    $(id + ' .demo-spin-col').remove()
  }
}

// 全局配置配合index.js解决开发axios跨域，服务器环境可以使用nginx的反向代理
axios.defaults.timeout = 50000// 在超时前，所有请求都会等待 5 秒
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' //  配置请求头
// axios.defaults.baseURL = '/api'// 配置接口地址
// axios.defaults.withCredentials = false
Vue.prototype.$axios = axios// 将axios配置成vue的原型
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  if (store.state.token === null) { // 如果未登录则跳转到登陆界面
    iview.LoadingBar.finish()
    router.push('login')
  }
  console.log(config.data)
  if (config.method === 'post') {
    // config.data.token = store.state.token
  } else if (config.method === 'get') {
    config.params = {
      token: store.state.token
    }
  }
  iview.LoadingBar.start()
  return config
}, function (error) {
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  iview.LoadingBar.finish()
  switch (response.status) {
    case 200 :
      break
    /* case 1005 :
      this.$Message.error('客官还没登录！')
      routers.replace({
        path: 'login',
        query: {redirect: routers.currentRoute.fullPath}
      })
      break
    case 1006 :
      this.$Message.error('客官还没登录！')
      break */
    default :
      this.$Loading.error()
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
// 路由加载条
router.beforeEach((to, from, next) => {
  iview.LoadingBar.start()
  /* if (store.state.token === null && store.state.isLogin === false) {
    axios.get('/server/login?code=sunkangClient&username=sunkang&password=kang')
      .then((response) => {
        store.state.token = response.data.resultData
      })
      .catch(function (error) {
        console.log(error)
      })
  } */
  iview.LoadingBar.start()
  next()
})

router.afterEach((transition) => {
  iview.LoadingBar.finish()
})

// 图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: '../static/images/loading.gif',
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
