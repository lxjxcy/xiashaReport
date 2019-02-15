<template>
	<div class="overall">
		<div >
			<ul class="out-work">			
				<!-- <li class="l"><parent></parent></li> -->
				<li><rentalMonth></rentalMonth></li>
				<li><rentalYear></rentalYear></li>
				<li><presence></presence></li>
				<li><entrepreneurData></entrepreneurData></li>
				<li><businessAnalysis></businessAnalysis></li>
			</ul>
		</div>
	</div>
	
</template>

<script>
	import rentalMonth from "./Leading_cockpit/rentalMonth/rentalMonth.vue"
	import rentalYear from "./Leading_cockpit/rentalYear/rental_year.vue"
	import presence from "./Leading_cockpit/presence/presence.vue"
	import entrepreneurData from "./entrepreneur_data/entrepreneur_data.vue"
	import businessAnalysis from "./business_analysis/business_analysis.vue"
	import parent from "./parent.vue"
	export default {
		name:"overall",
		components:{
			parent,
			rentalMonth,
			rentalYear,
			presence,
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