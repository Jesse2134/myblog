import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routers from './router/index'
import 'font-awesome/css/font-awesome.min.css'
import store from './vuex/store'
// import common from './components/common/components/'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.config.errorHandler = function(err, vm) {
  console.log(err)
  console.log(vm)
}

const router = new VueRouter({
  hashbang: true,
  history: true,
  routers
})

router.afterEach(() => {
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
  }
  if (to.matched.some(record => record.meta.requireAuth)) {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const token = JSON.parse(sessionStorage.getItem('token'))
    if (token && user && to.path) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

new Vue({
  // el: '#app',
  // template: '<App/>',
  router,
  store,
  // components: {App},
  render: h => h(App)
}).$mount('#app')
