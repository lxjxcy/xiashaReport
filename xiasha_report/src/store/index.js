import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules/index'
// import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

export default new Vuex.Store({
		modules: modules,
		namespaced: true,
		
	 state: {
		occupancyList:[],
		incomeList:[],
		houseList:[],
		attractList:[],
		vacancyList:[],
		daynumList:[],

	 },
	 mutations:{

		// 存tDeviceCode
		saveOccupancy(state, occupancyList) {
			state.occupancyList = occupancyList;
		},
		saveIncome(state, incomeList) {
			state.incomeList = incomeList;
		},
		saveHouse(state, houseList) {
			state.houseList = houseList;
		},
		saveAttract(state, attractList) {
			state.attractList = attractList;
		},
		saveVacancy(state, vacancyList) {
			state.vacancyList = vacancyList;
		},
		saveDaynum(state, daynumList) {
			state.daynumList = daynumList;
		},
		 
	 },
	 actions:{
		 
		 
	 },
	 getters:{
		 
	 }
})