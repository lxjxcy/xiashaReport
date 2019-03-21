import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/view/home/home'
import overall from '@/view/home/overall/overall'
import LeadingCockpit  from "@/view/home/overall/Leading_cockpit/leading_cockpit.vue"
import entrepreneurData from "@/view/home/overall/entrepreneur_data/entrepreneur_data.vue"
import businessAnalysis from "@/view/home/overall/business_analysis/business_analysis.vue"
import industryAnalysis from "@/view/home/overall/industry_analysis/industry_analysis"

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
				},
				{
					path:'/LeadingCockpit',
					name:'LeadingCockpit',
					component:LeadingCockpit
				},
				{
					path:'/entrepreneurData',
					name:'entrepreneurData',
					component:entrepreneurData
				},
				{
					path:'/businessAnalysis',
					name:'businessAnalysis',
					component:businessAnalysis
				},
				{
					path:'/industryAnalysis',
					name:'industryAnalysis',
					component:industryAnalysis
				},
			]
    }
  ]
})
