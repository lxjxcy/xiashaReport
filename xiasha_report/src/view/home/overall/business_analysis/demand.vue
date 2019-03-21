<template>
	<div class="demand echartall">
		<!-- <div style="height: 221px"> -->
			<table>
				<caption>{{title1}}</caption>
				<tr v-for="(item,index) in list1">
					<td ><span class="indexcolor">{{index+1}}</span></td>
					<td>{{item.name}}</td>
					<td>{{item.num}}</td>
				</tr>
			</table>
		<!-- </div> -->
		
		<table>
			<caption>{{title2}}</caption>
			<tr v-for="(item,index) in list1">
				<td ><span class="indexcolor">{{index+1}}</span></td>
				<td>{{item.name}}</td>
				<td>{{item.num}}</td>
			</tr>
		</table>
		
	</div>
</template>

<script>
	import hackReset from "../../../../mixins/hackReset.js"
	export default {
		name:"demand",
		data(){
			return{
				title1:"企业政策需求排行",
				number1:18,
				number2:19,
				title2:"企业服务需求排行",
				list1:[
				],
				list2:[
				]
			}
		},
		mixins: [hackReset],
		mounted(){
			// this.getlist(1)
		},
		methods:{
			getlist(version,id,year,month,){
				
				
				this.getlist1(version,id,year,month,)
				this.getlist2(version,id,year,month,)
			},
			
			
			getlist1(version,id,year,month,){
				this.$api.getYearMonthIdReport(version,id,year,month,this.number1).then(res=>{
					
					
					if(res.data.length!=0){
						this.list1=res.data;
					}else{
						this.list1=[
							
								{
									name:"财政引导",
									num:0,
								},
								{
									name:"金融扶持",
									num:0,
								},
								{
									name:"人才激励",
									num:0,
								},
								{
									name:"税收优惠",
									num:0,
								},
						]
					}
				})
			},
			getlist2(version,id,year,month,){
				this.$api.getYearMonthIdReport(version,id,year,month,this.number2).then(res=>{
					
					if(res.data.length!=0){
						this.list2=res.data
					}else{
						this.list2=[
					{
						name:"金融服务",
						num:0,
					},
					{
						name:"项目申报",
						num:0,
					},
					{
						name:"人力资源",
						num:0,
					},
					{
						name:"法律服务",
						num:0,
					},
				]
					}
				})
			},
			
		}
		
	}
</script>

<style scoped>
.demand{
	width:100%;
	height:100%;
}
table{
	width:100%;
	height:42%;
	overflow: hidden;
	
}
/* table{
	width:240px;
} */
table tr td{
	width:20%;
	/* line-height: 5%; */
	text-align: center;
	/* line-height: 30px; */
	font-size:0.14rem;
	color:#00fff9;
	/* height:30px; */
}
table caption{
	width:100%;
	text-align: left;
	/* line-height: 60px; */
	font-size: 0.16rem;
	padding:0.1rem 0.05rem;
	font-weight: 500;
	/* height:10% */

}


</style>
