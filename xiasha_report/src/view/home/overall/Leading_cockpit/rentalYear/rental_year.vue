<template>
		<div class="all_price ">
			<h2>年度租金收入</h2>
			<p class="p1">￥{{total}}</p>
			
			<div class="time" style="height:50%;width:30%">
				<workpiece ref="workChild"></workpiece>
			</div>
			<div class="scrollProject">
				<vue-seamless-scroll :data="content" :class-option="optionLeft" class="seamless-warp2">
					<ul class="item">
						<li v-for="(item,index) in content" @click="getId(item)">
							<p class="p2">{{item.communityName}}</p>
							<p>{{item.nums}}</p>
						</li>
					</ul>
				</vue-seamless-scroll>
			</div>
			
		</div>
</template>
<script>
	import workpiece from "./workpiece.vue"
	import xiashaMap from "./xiashaMap.vue"
	import priceContrast from "../price_contrast.vue"
	export default {
		name:"rental_year",
		components:{
			xiashaMap,
			workpiece,
			priceContrast
		},
		data(){
			return{   
				number:23,
				numberB:22,
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
			// this.getList()
		},
		methods: {
			
			getList(version,year,month) {
				this.$api.getYearMonthReport(version,year,month,this.number).then(res=>{
					if(res.data.length==0){
						return
					}
					this.total=(res.data[0].total).toFixed(2)+"万元";
					// this.content=res.data.content;
					this.percent=res.data[0].percent
					this.$refs.workChild.getpercent(this.percent)
				})
				this.$api.getYearMonthReport(version,year,month,this.numberB).then(res=>{
					if(res.data.length==0){
						return
					}
					var content=res.data;
					content.forEach((e,i,a)=>{
						a[i]['nums']=(e.num).toFixed(2)+"万元"
						// a['areas'][i]=				
					})
					this.content=res.data
				})
			},
			getId(item){
				var list=[];
				
				list.push({
					communityId:item.communityId,
					communityName:item.communityName
				})
				let lists = JSON.stringify(list);
				this.$router.push({
					path: '/businessAnalysis',
					query: {
						communityList: lists
					}
				})
			},
		},
	}
</script>

<style scoped>

	ul .item {
		min-width: 5.8rem;
		/* display: inline; */
	}
	p{
		font-size: 12px;
	}
	li {
		float: left;
		margin-right: 3%;
	}
h2{
	line-height: 0.5rem;
	font-size: 0.2rem;
	font-weight: 400;
	padding:0 0.1rem;
}


	
	
	.all_price{
		/* padding: 2%; */
		position: relative;
		color:#fff;
		width:100%;
		height: 100%;
		/* padding-left: 30px; */
		
	}
	
	.p1{
		line-height: 50%;
		padding: 5% 0;
		color: #fff;
		font-weight: 400;
		text-align: center;
	}
	

/* 	ul{
		display: flex;
		margin-top: 10%;
	
		padding:10% 0;
		justify-content: space-around;
	} */
	li p{
		text-align: center;
		font-size: 0.16rem;
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
		top:0%;
		right:0%;
	}
li:hover{
		color:#FFB400;
		cursor: pointer;
	}
</style>
