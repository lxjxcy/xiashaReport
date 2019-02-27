<template>
	<div class="rental_year">
		<div class="all_price">
				<h2>年度租金收入</h2>
				<p class="p1">￥{{total}}</p>
				<ul class="echartall">
					<li v-for="item in content">
						<p class="p2">{{item.communityName}}</p>
						<p>{{item.num.toFixed(2)}}万元</p>
					</li>
				</ul>
				<div class="time">
					<workpiece :percent="percent"></workpiece>
				</div>
				<div>
					<xiashaMap></xiashaMap>
					<!-- <chinaMap ></chinaMap> -->
				</div>
					
			
		</div>
		
	</div>
	
</template>

<script>
	import workpiece from "./workpiece.vue"
	import chinaMap from "./chinaMap.vue"
	import xiashaMap from "./xiashaMap.vue"
	export default {
		name:"rental_year",
		components:{
			chinaMap,
			xiashaMap,
			workpiece
		},
		data(){
			return{
				total:0,
				content:[],
				percent:"",
			}
		},
		mounted(){
			this.getlist()
		},
		methods: {
			getlist() {
				this.$api.getRentYear().then(res=>{
					this.total=(res.data[0].total).toFixed(2)+"万元";
					// this.content=res.data.content;
					this.percent=res.data[0].percent
				})
				this.$api.getRentCompare().then(res=>{
					this.content=res.data
					
				})
			}
		},
	}
</script>

<style scoped>
	.rental_year{
		/* border-right: 2px solid #fff; */
		width:600px;
		height:200px;
		
	}
	
	
	.all_price{
		/* padding: 2%; */
		position: relative;
		color:#fff;
	}
	.p1{
		line-height: 70px;
		font-size: 40px;
		
		color: #fff;
		font-weight: 400;
		text-align: center;
	}
	ul{
		display: flex;
		margin-top: 60px;
		padding:15px 0;
		justify-content: space-around;
	}
	li p{
		text-align: center;
		font-size: 18px;
	}
	li .p2{
		color: aqua;
		font-style:italic
	}
	li .p2:hover{
		font-style:italic
	}
	.time{
		position: absolute;
		top:-15px;
		right:13px;
	}

</style>
