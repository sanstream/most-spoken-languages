import Vue from 'vue'
import VueRouter from 'vue-router'
import Intro from './components/views/Intro'
import Overview from './components/views/Overview'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Intro,
    },
    {
      path: '/overview/',
      component: Overview,
    },
  ],
})

export default router
