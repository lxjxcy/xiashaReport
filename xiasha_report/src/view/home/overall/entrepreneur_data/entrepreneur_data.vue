<template>
	<div class="entrepreneur_data" :style="{width:'100%',height:'100%'}">
		<ul style="display: flex;justify-content: flex-start;height:30%">
			<li style="width:30%;" class="comm-padd">
				<numtype ref="numtypeChild"></numtype>
			</li>
			<li style="width:30%;" class="comm-padd">
				<pertype ref="pertypeChild"></pertype>
			</li>
			<li style="width:40%;" class="comm-padd">
				<electric ref="electricChild"></electric>
			</li>		
		</ul>
		<ul style="display: flex;justify-content: flex-start;height:35%">
			<li style="width:40%;" class="comm-padd">
				<businessOperation ref="businessOperationChild"></businessOperation>
			</li>
			
			<li style="width:25%;" class="comm-padd">
				<aptitude ref="aptitudeChild"></aptitude>
			</li>
			<li style="width:35%;" class="comm-padd">
				<financing ref="financingChild"></financing>
			</li>
		</ul>
		<ul style="display: flex;justify-content: flex-start;height:35%">
			<li style="width:22%;" class="comm-padd">
				<innovate ref="innovateChild"></innovate>
			</li>
			<li style="width:25%;" class="comm-padd">
				<employees ref="employeesChild"></employees>
			</li>
			<li style="width:28%;" class="comm-padd">
				<plannedProject ref="plannedProjectChild"></plannedProject>
			</li>	
			<li style="width:25%;" class="comm-padd">
				<plannedPerson ref="plannedPersonChild"></plannedPerson>
			</li>	
		</ul>	
	</div>
</template>

<script>
	import util from "../../../../common/js/tool.js"

	import innovate from "./innovate.vue"//知识产权
	import employees from "./employees.vue"//企业人数
	import financing from "./financing.vue"//企业融资情况
	import plannedProject from "./planned_project.vue"//国家计划
	import plannedPerson from "./planned_person.vue"//国家计划
	import businessOperation  from "./business_operation.vue"//企业经营
	import numtype from "./numtype.vue"//规模分析
	import pertype from "./pertype.vue"
	import aptitude from "./aptitude.vue"
	import electric from "./electric.vue"
	export default {
		name:"entrepreneur_data",
		components:{
			innovate,
			employees,
			financing,
			plannedProject,
			plannedPerson,
			electric,
			businessOperation,
			aptitude,
			numtype,
			pertype	
		},
		data(){
			return{
				width:window.screen.width,
				height:window.screen.height,
				version:this.$store.state.version,
				year:this.$store.state.year,
				month:this.$store.state.month
			}
		},
		mounted() {
			let path = this.$route.matched[1].path
			if(path.indexOf('/entrepreneurData')==0){
				var id=util.parseUrlData(window.location.href)
				if(id){
					var year=id.hasOwnProperty('year')
					if(year){
						this.year=id.year,
						this.$store.state.year=id.year
					}
					var month=id.hasOwnProperty('month')
					if(month){
						this.month=id.month
						this.$store.state.month=id.month	
					}
					var version=id.hasOwnProperty('version')
					if(version){
						this.version=id.version;
						this.$store.state.version=id.version
					}
				}

				this.requestData(this.version,this.year,this.month)
				
			}

		},
		methods:{
			 requestData(version,year,month){			 
				 this.$refs.numtypeChild.getList(version,year,month)
				 this.$refs.pertypeChild.getList(version,year,month)
				 // this.$refs.electricChild.getList(version)
				 this.$refs.businessOperationChild.getList(version,year,month)
				 this.$refs.aptitudeChild.getList(version,year,month)
				 this.$refs.financingChild.getList(version,year,month)
				this.$refs.innovateChild.getList(version,year,month)
				this.$refs.employeesChild.getList(version,year,month)
				this.$refs.plannedPersonChild.getList(version,year,month)
				this.$refs.plannedProjectChild.getList(version,year,month)
			 }
		}
	}
</script>

<style scoped>
/* 	.entrepreneur_data{
		width:1920px;
		height: 1408px;
	
	} */

</style>
