// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import store from './store'
import App from './App'
import Intro from './components/views/Intro'
import Overview from './components/views/Overview'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/', component: Intro, },
    { path: '/overview', component: Overview, },
  ],
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App, },
  template: '<App/>',
})
