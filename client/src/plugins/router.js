import Vue from 'vue'
import Router from 'vue-router'
import { DetailsView, LayoutView } from '@/views'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'LayoutsView',
      component: LayoutView
    },
    {
      path: '/contents/:id',
      name: 'DetailsView',
      component: DetailsView,
      props: true
    }
  ]
})
