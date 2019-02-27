<template>
	<div class="entrepreneur_data">
		<div style="display: flex;justify-content: flex-start;">
			<numtype></numtype>
			<pertype></pertype>
			<electric></electric>		
		</div>
		<div style="display: flex;justify-content: flex-start;">
			<businessOperation></businessOperation>
			
			<aptitude></aptitude>	
			<financing></financing>
		</div>
		<div style="display: flex;justify-content: flex-start;">
			<innovate></innovate>
			<employees></employees>
			<plannedProject></plannedProject>	
		</div>
		
		
	</div>
</template>

<script>
	import innovate from "./innovate.vue"//知识产权
	import employees from "./employees.vue"//企业人数
	import financing from "./financing.vue"//企业融资情况
	import plannedProject from "./planned_project.vue"//国家计划
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
			electric,
			businessOperation,
			aptitude,
			numtype,
			pertype
			
			
		}
	}
</script>

<style scoped>
	.entrepreneur_data{
		width:1500px;
		height: 700px;
		/* background: #A2BE35; */
	}

</style>
