<template>
	<!-- <div class=""> -->
		<ul class="leadcont leading_cockpit" :style="{width:'100%',height:'100%'}">
			<li style="width:30%;height:100%" >
				<div style="height:33.3%" class='comm-padd'>
					<rentalPrice ref="rentalPriceChild"></rentalPrice>
				</div>
				<div  style="height:33.3%;" class='comm-padd'>
					<priceContrast ref="priceContrastChild"></priceContrast>
				</div>
				<div style="height:33.3%;" class='comm-padd'>
					<rentalArea ref="rentalAreaChild"></rentalArea>
				</div>				
			</li>
			<li style="width:40%;height:100%">
				<div style="height:30%;" class='comm-padd'>
					<rentalYear ref="rentalYearChild"></rentalYear>
				</div>
				<div style="height:70%;" class='comm-padd'>
					<xiashaMap ref="xiashaMapChild"></xiashaMap>
				</div>				
			</li>
			<li style="width:30%; height:100%">
				<div style="height:50%;" class='comm-padd'>
					<customers ref="customersChild"></customers>
				</div>
				<div style="height:50%;" class='comm-padd'>
					<company ref="companyChild"></company>
				</div>
			</li>
		</ul>		
	<!-- </div> -->
</template>

<script>
	import util from "../../../../common/js/tool.js"
	import rentalArea from "./rental_area.vue"
	import rentalPrice from "./rental_price.vue"
	import priceContrast from "./price_contrast.vue"
	import rentalYear from "./rentalYear/rental_year.vue"
	import customers from "./customers.vue"
	import company from "./company.vue"
	import xiashaMap from "./rentalYear/xiashaMap.vue"
	
	
	export default {
		name:"leading_cockpit",
		components:{
			rentalArea,
			rentalPrice,
			priceContrast,
			rentalYear,
			customers,
			xiashaMap,
			company
			
		},

		data(){
			return {
				width:window.screen.width,
				height:window.screen.height,
				init:'',
				version:this.$store.state.version,
				year:this.$store.state.year,
				month:this.$store.state.month,
			}
		},
		mounted() {
			let path = this.$route.matched[1].path
			 if(path.indexOf('/LeadingCockpit')==0){
				
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
				this.$refs.rentalPriceChild.getList(version,year)
				this.$refs.priceContrastChild.getList(version,year,month)
				this.$refs.rentalAreaChild.getList(version,year)
				this.$refs.rentalYearChild.getList(version,year,month)
				this.$refs.xiashaMapChild.getList(version,year,month)				
				this.$refs.customersChild.getList(version,year)
				this.$refs.companyChild.getList(version,year,month)				
			}
		}
	}
</script>

<style scoped>
	
/* 		.leading_cockpit{
			width:1920px;
			height:1408px
		
		} */
	
	.leadcont{
		display: flex;
		justify-content: flex-start;
	}

</style>
