<template>
	<div class="industry-analysis" :style="{width:'100%',height:'100%'}">
		<ul style="height:55%">
			<li style="width:30%;" class="comm-padd">
				<numberStatistics></numberStatistics>
			</li>
			<li style="width:40%;" class="comm-padd">
				<provincesMap></provincesMap>
			</li>
			<li style="width:30%;" class="comm-padd">
				<graduateCompany></graduateCompany>
			</li>
		</ul>
		<ul style="height:45%">
			<li style="width:33.1%;" class="comm-padd">
				<AreaStatistics></AreaStatistics>
			</li>
			<li style="width:33.4%;" class="comm-padd">
				<graduateCompanyNumber></graduateCompanyNumber>
			</li>
			<li style="width:33.4%;" class="comm-padd">
				<graduateCompanyBetween></graduateCompanyBetween>
			</li>
		</ul>
	</div>
	
</template>

<script>
	import numberStatistics from "./number_statistics.vue"
	import provincesMap from "./provinces_map.vue"
	import graduateCompany from "./graduate_company.vue"
	import AreaStatistics from "./Area_statistics.vue"
	import graduateCompanyBetween from "./graduate_company_between.vue"
	import graduateCompanyNumber from "./graduate_company_number.vue"
	export default {
		name:"industry_analysis",
		components:{
			numberStatistics,
			graduateCompanyBetween,
			provincesMap,
			graduateCompany,
			AreaStatistics,
			graduateCompanyNumber
		},
		data(){
			return{
				width:window.screen.width,
				height:window.screen.height,
			}
		}
	}
</script>

<style scoped>
	.industry-analysis{
		width:1920px;
		height:1408px;
	}
	ul{
		display: flex;
		justify-content: flex-start;
	}

</style>
