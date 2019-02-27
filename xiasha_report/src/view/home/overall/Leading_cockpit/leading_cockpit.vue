<template>
	<div class="leading_cockpit">
		<ul class="leadcont">
			<li style="width:450px">
				<div><rentalPrice></rentalPrice></div>
				<div><priceContrast></priceContrast></div>
				<div><rentalArea></rentalArea></div>				
			</li>
			<li style="width:600px">
				<div><rentalYear></rentalYear></div>							
			</li>
			<li style="width:450px">
				<div><customers></customers></div>
				<div><company></company></div>
				
			</li>
		</ul>		
	</div>
</template>

<script>
	import rentalArea from "./rental_area.vue"
	import rentalPrice from "./rental_price.vue"
	import priceContrast from "./price_contrast.vue"
	import rentalYear from "./rentalYear/rental_year.vue"
	import customers from "./customers.vue"
	import company from "./company.vue"
	
	
	export default {
		name:"leading_cockpit",
		components:{
			rentalArea,
			rentalPrice,
			priceContrast,
			rentalYear,
			customers,
			company
			
		}
	}
</script>

<style scoped>
	
		.leading_cockpit{
			width:1500px;
			/* background: #999999; */
		}
	
	.leadcont{
		display: flex;
		justify-content: flex-start;
	}

</style>
