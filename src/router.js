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
      meta: {
        title: 'The most spoken languages arround the world',
      },
    },
    {
      path: '/overview/',
      component: Overview,
      meta: {
        title: 'The most spoken languages arround the world',
      },
    },
  ],
})

export default router
