import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods'
// import Header from '@/components/Header'
import Rating from '@/components/Rating'
import Seller from '@/components/Seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'goods',
      component: Goods
    },{
      path: '/goods',
      component: Goods
    },{
      path: '/rating',
      name:'rating',
      component: Rating
    },{
      path: '/seller',
      name:'seller',
      component: Seller
    }
  ]
})
