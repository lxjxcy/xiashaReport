import { post } from '../axiosconfig/'
import { get } from '../axiosconfig/'
import util from '../common/js/tool'


		
export default {
	
	getRentMonth(params) {
		
		return get('http://101.37.124.231:8081/screen/query?number=21&year='+util.getYear()+'&group=communityName')//租金收入月度趋势
	},
	getRentCompare(params) {
		return get('http://101.37.124.231:8081/screen/query?number=22&year='+util.getYear()+'&month='+util.getMonth())//租金收入比对
	},
	getRentArea(params) {
		return get('http://101.37.124.231:8081/screen/query?number=24&year='+util.getYear())//凭租面积
	},
	getRentYear(params) {
		return get('http://101.37.124.231:8081/screen/query?number=23&year='+util.getYear()+'&month='+util.getMonth())//年度租金收入
	},
	getCustomerNumber(params) {
		return get('http://101.37.124.231:8081/screen/query?number=25&year='+util.getYear()+'&group=clientType')//驻进客户数量
	},

	getCompanyDetail(params) {
		return  get('http://101.37.124.231:8081/screen/query?number=26&year='+util.getYear()+'&month='+util.getMonth())//驻进企业
	},
		
	getCompanyNumber(){
		return  get('http://101.37.124.231:8081/screen/query?number=27&year='+util.getYear()+'&month='+util.getMonth())//地图企业数量
	},
	
	
	
	
	
	
	
	
	
	
	getCompanynInnovation(params) {
		return get('http://101.37.124.231:8081/screen/company/innovation?year='+util.getYear()+'&month='+util.getMonth())//企业创新
	},
	getCompanynmployeesNumn(params) {
		return get('http://101.37.124.231:8081/screen/company/employeesNum?year='+util.getYear()+'&month='+util.getMonth())//企业人数
	},
	getCompanynFinancing(params) {
		return get('http://101.37.124.231:8081/screen/query?number=5&year='+util.getYear()+'&month='+util.getMonth())//企业融资
	},
	getCompanynManage(params) {
		return get('http://101.37.124.231:8081/screen/company/manage?year='+util.getYear()+'&month='+util.getMonth())//企业经营
	},
	getCompanyTopNume(params) {
		return get('http://101.37.124.231:8081/screen/company/topNum?year='+util.getYear()+'&month='+util.getMonth())//企业进驻数量占比top5
	},
	getopEmployeesNume(params) {
		return get('http://101.37.124.231:8081/screen/company/topEmployeesNum?year='+util.getYear()+'&month='+util.getMonth())//企业员工人数占比top5
	},
	getCompanyElectric(params) {
		return get('http://122.224.207.90:8885/report/company/electric', params)//企业用电量
	},
	getCompanyQualification(params) {
		return get('http://101.37.124.231:8081/screen/company/qualification?year='+util.getYear()+'&month='+util.getMonth())//企业资质
	},
	getNationalProgram(params) {
		return get('http://101.37.124.231:8081/screen/company/nationalProgram?year='+util.getYear()+'&month='+util.getMonth())//国家计划项目
	},
	getCompanyHonor(params) {
		return get('http://101.37.124.231:8081/screen/query?number=9&year='+util.getYear()+'&month='+util.getMonth())//人才计划项目
	},
	
	
	
	
	
	getArea(id) {
		// util.getMonth()
		return get('http://101.37.124.231:8081/screen/query?communityId='+id+'&year='+util.getYear()+'&month='+util.getMonth()+'&number=14' )//出租频率分析
	},
	getReaBuilding(id) {
		return get('http://101.37.124.231:8081/screen/query?communityId='+id+'&year='+util.getYear()+'&month='+util.getMonth()+'&number=11' )//出租概率
	},
	getBuilding(id) {
		return get('http://101.37.124.231:8081/screen/query?communityId='+id+'&year='+util.getYear()+'&number=13&group=buildingName')//租金收入
	},
	getIntention(id) {
		return get('http://101.37.124.231:8081/screen/query?communityId='+id+'&year='+util.getYear()+'&number=17&group=typeName' )//招商需求分析
	},
	getAreaRoom(id) {
		return get('http://101.37.124.231:8081/screen/query?communityId='+id+'&year='+util.getYear()+'&month='+util.getMonth()+'&number=15' )//空置面积占比分析
	},
	getDayRoom(id) {
		return get('http://101.37.124.231:8081/screen/query?communityId='+id+'&year='+util.getYear()+'&month='+util.getMonth()+'&number=16' )//空置天数占比分析
	},
	getPolicyNeed(id) {
		return get('http://101.37.124.231:8081/screen/query?communityId='+id+'&year='+util.getYear()+'&month='+util.getMonth()+'&number=18' )//企业政策需求排行
	},
	getServiceNeed(id) {
		return get('http://101.37.124.231:8081/screen/query?communityId='+id+'&year='+util.getYear()+'&month='+util.getMonth()+'&number=19' )//企业服务需求排行
	},
	
	getcomeNumber(id) {
		return get('http://101.37.124.231:8081/screen/query?communityId='+id+'&year='+util.getYear()+'&number=12&group=clientType')//驻进客户数量
	},
	
	getparkList(id) {
		return get('http://101.37.124.231:8081/screen/query?number=20&&year='+util.getYear()+'&month='+util.getMonth())//园区列表
	},
	
	
	
	
	


	

	
	
}