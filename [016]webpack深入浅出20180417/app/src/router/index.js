import Vue from 'vue'
import Router from 'vue-router'
// demo
import Demo from '@/views/demo/demo'
import BScroll from '@/views/demo/better-scroll'
import BScroll1 from '@/views/demo/better-scroll1'
import DemoSlide from '@/views/demo/demo-slide'
// 主要页面
import Index from '@/views/index/index'
import HomeIndex from '@/views/index/home-index'
import HomeClassify from '@/views/index/classify'

import Category from '@/views/category/category'
import ShopCar from '@/views/shop-car/shop-car'
import Mine from '@/views/mine/mine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/index"
    },
    {
      path:"/index",
      component:Index,
      children:[
        {
          path:"",
          name:'index',
          component:HomeIndex
        },
        {
          path:":id",
          name:"index-classify",
          component:HomeClassify
        }
      ]
    },
    {
      path:"/category",
      name:"category",
      component:Category
    },
    {
      path:"/shopCar",
      name:"shopCar",
      component:ShopCar
    },
    {
      path:"/mine",
      name:"mine",
      component:Mine
    },
    {
      path:"/demo",
      component:Demo,
      children:[
        {
          path:'bscroll',
          component:BScroll
        },
        {
          path:"bscroll1",
          component:BScroll1
        },
        {
          path:"slide",
          component:DemoSlide
        }
      ],
    }
  ]
})
