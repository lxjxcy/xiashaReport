import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/view/home/home'
import overall from '@/view/home/overall/overall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
			children:[
				{
					path:'/report',
					name:'overall',
					component:overall
				}
			]
    }
  ]
})
