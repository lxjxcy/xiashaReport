<template>
	<div class="overall">
		<div >
			<ul class="out-work">			
				<LeadingCockpit></LeadingCockpit>
				<li><entrepreneurData></entrepreneurData></li>
				<li><businessAnalysis></businessAnalysis></li>
			</ul>
		</div>
	</div>
</template>
<script>
	// import 
	import LeadingCockpit  from "./Leading_cockpit/leading_cockpit.vue"

	import rentalYear from "./Leading_cockpit/rentalYear/rental_year.vue"

	import entrepreneurData from "./entrepreneur_data/entrepreneur_data.vue"
	import businessAnalysis from "./business_analysis/business_analysis.vue"

	export default {
		name:"overall",
		components:{
			LeadingCockpit,

			rentalYear,

			LeadingCockpit,
			entrepreneurData,
			businessAnalysis
		},
		

	}

</script>
<style scoped>
/* li{
	margin: 5px;
} */
	.out-work{
		display: flex;
		justify-content:left;	
	}





</style>