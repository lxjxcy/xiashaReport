import { post } from '../axiosconfig/'
import { get } from '../axiosconfig/'
import util from '../common/js/tool'
var url="http://101.37.124.231:8081"

		
export default {
	//租金收入月度趋势21
	getRentMonth(version,year,number) {		
		return get(url+'/screen/query?number='+number+'&year='+year+'&group=communityName'+'&version='+version)
	},
	//驾驶舱导航-租金收入比对22,年度租金收入23,//驻进企业26,//地图企业数量27
	
	//企业数据-企业融资5，人才计划项目9
	//经营分析-//园区列表20
	getYearMonthReport(version,year,month,number) {
		return get(url+'/screen/query?number='+number+'&year='+year+'&month='+month+'&version='+version)
	},
	//凭租面积24,
	getYearReport(version,year,number) {
		return get(url+'/screen/query?number='+number+'&year='+year+'&version='+version)
	},
	//驻进客户数量25
	getCustomerNumber(version,year,number) {
		return get(url+'/screen/query?number='+number+'&year='+year+'&group=clientType'+'&version='+version)
	},

	
	
	
	
	
	
	
	
	
	//企业数据
	
	//知识产权
	getCompanynInnovation(version,year,month) {
		return get(url+'/screen/company/innovation?year='+year+'&month='+month+'&version='+version)
	},
	//企业人数
	getCompanynmployeesNumn(version,year,month) {
		return get(url+'/screen/company/employeesNum?year='+year+'&month='+month+'&version='+version)
	},
	//企业经营
	getCompanynManage(version,year,month) {
		return get(url+'/screen/company/manage?year='+year+'&month='+month+'&version='+version)
	},
	//企业进驻数量占比top5
	getCompanyTopNume(version,year,month) {
		return get(url+'/screen/company/topNum?year='+year+'&month='+month+'&version='+version)
	},
	//企业员工人数占比top5
	getopEmployeesNume(version,year,month) {
		return get(url+'/screen/company/topEmployeesNum?year='+year+'&month='+month+'&version='+version)
	},
	//企业用电量
	getCompanyElectric(version,year,month) {
		return get('http://101.71.143.135:8888/report/company/electric', params)
	},
	//企业资质
	getCompanyQualification(version,year,month) {
		return get(url+'/screen/company/qualification?year='+year+'&month='+month+'&version='+version)
	},
	//国家计划项目
	getNationalProgram(version,year,month) {
		return get(url+'/screen/company/nationalProgram?year='+year+'&month='+month+'&version='+version)
	},

	
	
	
	
	//经营分析
	
	//出租频率分析14，//出租概率11，//空置面积占比分析15，//空置天数占比分析16，//企业政策需求排行18，//企业服务需求排行19
	getYearMonthIdReport(version,id,year,month,number) {
		return get(url+'/screen/query?communityId='+id+'&year='+year+'&month='+month+'&number='+number+'&version='+version )
	},
	//租金收入13
	getBuilding(version,id,year) {
		return get(url+'/screen/query?communityId='+id+'&year='+year+'&number=13&group=buildingName&version='+version)
	},
	//招商需求分析17
	getIntention(version,id,year) {
		return get(url+'/screen/query?communityId='+id+'&year='+year+'&number=17&group=typeName&version='+version )
	},
	//驻进客户数量12
	getcomeNumber(version,id,year) {
		return get(url+'/screen/query?communityId='+id+'&year='+year+'&number=12&group=clientType&version='+version)
	},

	
	
	
	
	


	

	
	
}