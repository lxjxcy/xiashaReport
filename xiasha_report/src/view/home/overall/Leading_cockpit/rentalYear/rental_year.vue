<template>
	<div class="rental_year">
		<div class="all_price">
				<h2>年度租金收入</h2>
				<p class="p1">￥{{total}}</p>

				<!-- <ul class="echartall">
					<li v-for="item in content">
						<p class="p2">{{item.communityName}}</p>
						<p>{{item.num.toFixed(2)}}万元</p>
					</li>
				</ul> -->
				<vue-seamless-scroll :data="content" :class-option="optionLeft" class="seamless-warp2">
					<ul class="item">
						<li v-for="item in content" >
							<p class="p2">{{item.communityName}}</p>
							<p>{{item.nums}}</p>
						</li>
					</ul>
				</vue-seamless-scroll>
				<div class="time">
					<workpiece ref="workChild"></workpiece>
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
		computed: {
			optionLeft () {
				return {
					direction: 2,
					limitMoveNum: 2
				}
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
					this.$refs.workChild.getpercent(this.percent)
				})
				this.$api.getRentCompare().then(res=>{
					var content=res.data;
					content.forEach((e,i,a)=>{
						a[i]['nums']=(e.num).toFixed(2)+"万元"
						// a['areas'][i]=				
					})
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
	.seamless-warp2 {
					overflow: hidden;
					height: 150px;
					width: 600px;
				
		}
		.seamless-warp2 ul{
			width: 600px;
			margin-top: 60px;
	
			
		}
	.seamless-warp2 .item li{
		float: left;
		margin-right: 10px;
		height:150px;
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
